# Architecture Review (react-cognito-vite)

## 概要

このリポジトリは **Vite + React + TypeScript + styled-components + react-hook-form + Redux Toolkit + Amazon Cognito** を組み合わせた、学習/サンプル用途に適した構成です。

全体として「UIコンポーネントの再利用」「フォーム実装の標準化」「認証の導入」がすでに行われており、小〜中規模アプリのベースとしては十分に実用的です。

一方で、アーキテクチャ面では以下の余地があります。

- ドメイン境界（認証・API・UI・状態管理）の分離が弱く、将来の機能追加で結合度が上がりやすい
- ルーティング定義とナビゲーション定義が重複しており、画面追加時の変更コストが増えやすい
- API の成功型/失敗型の扱いが曖昧で、呼び出し側の型安全性が下がりやすい
- グローバルローディング制御の責務が分散しており、非同期処理が増えると整合性維持が難しい

---

## 良い点（Architectural Strengths）

### 1) エントリポイントがシンプルで責務分離が明快

`main.tsx` で `StoreProvider` と `AuthProvider` をルートに集約し、`App.tsx` では Router と GlobalStyle に責務を絞っています。
依存関係の流れが読みやすく、初学者にも理解しやすい構成です。

### 2) UI部品の再利用性が高い

`components/form` 配下で Input / Select / CheckBox などを揃え、ページ側では `react-hook-form` の `register` を渡すだけで使える設計になっています。
フォーム構築の標準化に成功しており、画面ごとの差分を減らせます。

### 3) 型定義を `lib/types` に集約

`_apiType.ts`, `_authType.ts`, `_componentsType.ts`, `_pagesType.ts`, `_storeType.ts` と関心別に分けられており、参照・拡張しやすいです。

### 4) 開発品質を担保するLint/Format/CIの導線がある

`checker`（Prettier check + ESLint + TypeScript noEmit）が package scripts に用意されており、品質担保の仕組みを最初から備えています。

---

## 改善余地（Architectural Risks / Opportunities）

### 1) ルーティングとメニュー定義の重複

`router/index.tsx` の Route 定義と `components/layouts/header.tsx` のメニュー項目が別管理です。
新ページ追加時に複数箇所修正が必要で、Route と UI の不整合が起こりやすくなります。

**改善案**

- `src/router/routes.ts` などに `path / label / auth要件 / ナビ表示` を単一定義
- Router生成とHeaderメニュー生成を同じ定義から行う

### 2) 認証ヘルパーがストアと直接結合

`utils/authHelper/index.ts` で `store.dispatch` を直接呼び出しており、認証ロジックが UI 表示制御（loadingFlag）に強く依存しています。
結果として再利用・単体テストがしにくくなります。

**改善案**

- 認証SDK呼び出しを `services/auth` へ分離
- ローディング表示を `withLoading` / `useAsyncAction` など共通化層で吸収
- もしくは Redux Toolkit の async thunk / RTK Query へ移行

### 3) APIレスポンス型が Union で曖昧

`apiHelper.execute` は `AxiosResponse<T> | TypeApiError` を返すため、呼び出し側で型ガードを徹底しないと安全に扱えません。

**改善案**

- `Result<T, E>` 形式（`{ ok: true, data } | { ok: false, error }`）に統一
- 例外を throw し、呼び出し側で try/catch を標準化（方針次第）
- APIクライアントを `api/client.ts` + `api/endpoints/*.ts` に分割

### 4) グローバルローディングの加算/減算管理が手動

各処理で `loadingFlagUp` / `loadingFlagDown` を手動呼び出ししており、分岐・early return の増加で戻し漏れリスクが上がります。

**改善案**

- `withLoading(asyncFn)` ヘルパーで開始/終了を必ず対にする
- あるいは `createAsyncThunk` の pending/fulfilled/rejected で一元化

### 5) Props型が広すぎる箇所がある

`TypeHeader` / `TypeLayout` の `type: string`、`errors?: object` などは範囲が広く、将来の変更時に壊れ方がコンパイルで見えにくくなります。

**改善案**

- `type: "auth" | "example"` のような union literal を導入
- react-hook-form の `FieldErrors<T>` など具体型を利用

### 6) 画面が「サンプル構成」から「業務構成」へ移る際の層分けが不足

現状は `pages` から `utils` や `store` への直接依存が多く、将来的なビジネスロジック再利用（例: 他UIチャネル）を考えると層分けを先に進めたい状態です。

**改善案（例）**

- `features/<domain>` 単位へ再編（`ui / model / api`）
- もしくは `app / pages / widgets / features / entities / shared`（FSD）採用

---

## 規模別の実用性（どこまで使えるか）

### 小規模（1〜3人、画面 5〜15、期間 1〜3か月）

**実用性: 非常に高い**

- 現状構成のままで十分運用可能
- 学習コストが低く、開発速度を優先できる
- ルーティング定義の重複だけ早めに解消すると保守性が上がる

### 中規模（4〜10人、画面 20〜60、期間 6〜18か月）

**実用性: 条件付きで高い**

- 現状でも開始可能だが、途中で「機能追加時の修正箇所増加」が顕在化しやすい
- 最低限、以下を実施すると安定する
  1. route/nav の単一定義化
  2. API結果型の統一（Result型 or 例外方針）
  3. 非同期ローディング制御の共通化

### 大規模（10人以上、画面 80+、複数チーム・長期運用）

**実用性: そのままでは不足**

- 責務境界が曖昧なままだと、変更競合とレビュー負荷が増大
- 以下が実質必須
  - ドメインごとの明確なレイヤ分離（API / Model / UI）
  - エラーハンドリング規約・ログ規約の統一
  - テスト戦略（unit/integration/e2e）と依存方向ルールの明文化

---

## 優先度付きロードマップ（現実的な順序）

1. **ルート定義とヘッダーメニュー定義の単一化**（低コスト・効果大）
2. **API戻り値を Result 型などで統一**（型安全性向上）
3. **ローディング制御を共通化**（バグ予防）
4. **auth / api / store の依存方向整理**（テスト容易性向上）
5. **features 単位のディレクトリ再編**（中長期）

## 総合評価

- **現状評価**: 学習〜小規模開発としては十分良い
- **中長期拡張性**: 現状のままだと機能追加時に重複修正・責務混在が増える可能性あり
- **結論**: 今すぐ全面リライトは不要。まずは route/nav 統一、API/非同期処理の型・責務整理を先行するのが費用対効果が高いです。
