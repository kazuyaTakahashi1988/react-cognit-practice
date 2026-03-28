# Architecture Review (react-cognito-vite)

## 概要

このリポジトリは **Vite + React + TypeScript + styled-components + react-hook-form + Redux Toolkit + Amazon Cognito** を組み合わせた、
学習/サンプル用途に適した構成になっています。

全体として「UIコンポーネントの再利用」「フォーム実装の標準化」「認証の導入」がすでに行われており、
小〜中規模アプリのベースとしては十分に実用的です。

一方で、アーキテクチャ面では以下の余地があります。

- ドメイン境界（認証・API・UI・状態管理）の分離が弱く、将来の機能追加で結合度が上がりやすい
- ルーティング定義とナビゲーション定義が重複しており、画面追加時の変更コストが増えやすい
- API エラー型と成功型の扱いが曖昧で、呼び出し側の型安全性が下がりやすい
- グローバルローディング制御の責務が分散しており、非同期処理が増えると整合性維持が難しい

## 良い点（Architectural Strengths）

### 1) エントリポイントがシンプルで責務分離が明快

`main.tsx` で `Provider`（Redux）と `AuthProvider` をルートに集約し、`App.tsx` では Router と GlobalStyle に責務を絞っています。
この構成は依存関係の流れが読みやすく、初学者にも理解しやすいです。

### 2) UI部品の再利用性が高い

`components/form` 配下で Input / Select / CheckBox などを揃え、
ページでは react-hook-form の `register` を渡すだけで使える設計になっています。
フォーム構築を部品化できており、画面ごとの実装差分を最小化できます。

### 3) 型定義を `lib/types` に集約

`_apiType.ts`, `_authType.ts`, `_componentsType.ts`, `_pagesType.ts`, `_storeType.ts` と関心別に分けられており、
参照しやすく拡張しやすいです。

### 4) 開発品質を担保するLint/Format/CIの導線がある

ESLint ルールは import 順序・複雑度・型importを含め比較的厳格で、
GitHub Actions でも checker が実行されるため、品質の下振れを抑えやすいです。

## 改善余地（Architectural Risks / Opportunities）

### 1) ルーティングとメニュー定義の重複

`router/index.tsx` の Route 定義と `components/layout/header.tsx` のメニュー項目が別管理です。
新しいページ追加時に複数箇所修正が必要で、ルートとUIの不整合が起こりやすいです。

**改善案**

- `src/router/routes.ts` などに「path / label / auth要件 / ナビ表示」を単一定義
- Router生成とHeaderメニュー生成を同じ定義から行う

### 2) 認証ヘルパーがストアと直接結合

`utils/authHelper/index.ts` で `store.dispatch` を直接呼び出しており、
認証ロジックが UI 表示制御（loadingFlag）に強く依存しています。
このため再利用やテストダブル差し替えが難しくなります。

**改善案**

- 認証SDK呼び出しは `services/auth` へ分離
- ローディング表示は `useAsyncAction` のような共通フックで吸収
- もしくは Redux Toolkit の async thunk / RTK Query へ移行

### 3) APIレスポンス型が Union で曖昧

`apiHelper.execute` は `AxiosResponse<T> | TypeApiError` を返しており、
呼び出し側で型ガードを徹底しないと安全に扱えません。
現状のページ側では成功/失敗分岐の標準パターンがありません。

**改善案**

- `Result<T, E>` 形式（例: `{ ok: true, data } | { ok: false, error }`）に統一
- 例外を throw して呼び出し側で try/catch を徹底（プロジェクト方針次第）
- APIクライアント層を `api/client.ts` と `api/endpoints/*.ts` で分離

### 4) グローバルローディングの加算/減算管理が手動

現在は各処理で `loadingFlagUp` / `loadingFlagDown` を手動呼び出ししています。
分岐や early return が増えると不整合（カウント戻し漏れ）の温床になりやすいです。

**改善案**

- `withLoading(asyncFn)` ヘルパーで開始/終了を必ず対にする
- あるいは `createAsyncThunk` の pending/fulfilled/rejected で一元化

### 5) 型の境界が一部で漏れている

`TypeLayout` / `TypeHeader` の `type: string` は許容範囲が広すぎます。
`"auth" | "example"` のような union literal にすることで、分岐抜けをコンパイル時に検出できます。

また、`errors?: object` など抽象度が高い型もあり、将来的に安全性を下げます。

**改善案**

- コンポーネントの public props はできるだけ厳密な union / generic を採用
- react-hook-form の `FieldErrors<T>` を直接使う

### 6) 画面が「サンプル構成」から「業務構成」へ移る際の層分けが不足

現状は `pages` から `utils` や `store` への直接依存が多く、
将来的にビジネスロジックの再利用（例: Web以外UI）を考えると層分けを先に進めたいです。

**改善案（例）**

- `features/<domain>` 単位へ再編
  - `features/auth/ui`
  - `features/auth/model`
  - `features/auth/api`
- もしくは `app / processes / pages / widgets / features / entities / shared`（FSD）採用

## 優先度付きロードマップ（現実的な順序）

1. **ルート定義とヘッダーメニュー定義の単一化**（低コスト・効果大）
2. **API戻り値を Result 型に統一**（型安全性向上）
3. **ローディング制御を共通化**（バグ予防）
4. **auth / api / store の依存方向整理**（テスト容易性向上）
5. **features 単位のディレクトリ再編**（中長期）

## 総合評価

- **現状評価**: 学習〜小規模開発としては十分良い
- **中長期拡張性**: 現状のままだと機能追加時に重複修正・責務混在が増える可能性あり
- **結論**: 「今すぐ全面リライト」は不要。ただし、ルーティング定義統一とAPI/非同期処理の型・責務整理を先行すると、
  将来の開発速度と品質が大きく改善します。
