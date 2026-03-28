# アーキテクチャ評価レポート（2026-03-23）

## 概要

本リポジトリは **React + TypeScript + Vite** を基盤に、
- UIコンポーネント（`src/components`）
- 画面（`src/pages`）
- ルーティング（`src/router`）
- 認証/通信ヘルパー（`src/utils`）
- デザインシステムに近いスタイル定義（`src/lib/style`）

を分離しており、学習用途/プロトタイプ用途として理解しやすい構造です。

一方で、責務分離・型安全・状態管理・セキュリティの観点で、実運用向けに改善余地が多くあります。

---

## 良い点（アーキテクチャ的強み）

1. **レイヤーの入口が分かりやすい**
   - `main.tsx -> App.tsx -> router` の起動フローが明快。
   - 初見でも画面遷移の起点を追いやすい。

2. **UIコンポーネントとページの分離**
   - `components` と `pages` が分かれており、再利用部品と画面実装の境界がある。
   - form系コンポーネントが共通化されているため、見た目と入力体験の統一に寄与。

3. **TypeScript + react-hook-form の採用**
   - フォーム入力管理はライブラリに乗っており、バリデーション拡張しやすい。
   - 主要な型を `src/lib/types` に寄せている点は整理の土台として有効。

4. **Storybookが同梱されている**
   - コンポーネント単体検証の文化を入れやすい構成。
   - 将来のデザインシステム化に発展しやすい。

5. **CDKを同一リポジトリに配置**
   - フロントエンドと Cognito インフラ構築手順が近接しており、セットアップ導線として有用。

---

## 悪い点 / 改善余地（重要）

1. **ビジネスロジックがUI層と密結合**
   - `utils/authHelper` と `apiHelper` が Redux store を直接 import/dispatch しており、
     ドメインロジックがグローバル状態に強く依存。
   - 再利用性・テスト容易性・置換容易性（例: Zustand / React Query）を下げる構造。

2. **Redux設計が最小構成のまま固定化**
   - `legacy_createStore` と string action type を使用。
   - reducer/action/state型が疎結合で、typo耐性が低い（`Flug` など）。
   - 非同期制御が middleware ではなく helper 側の手動 dispatch に分散。

3. **ルーティングと認証ガードが画面遷移に埋め込み**
   - `GetSignInFlag()` を router/header 内で都度評価。
   - 認証状態を state として一元管理していないため、更新タイミングの不整合や描画チラつきの余地がある。
   - ProtectedRoute/PublicRoute という責務分離が未導入。

4. **型安全が不十分な箇所が散見**
   - `object` / `Array<object>` の使用、`errors?: object` などが多く、
     実質的に構造的型検査の恩恵を失っている箇所がある。
   - APIレスポンス型が未定義で、`any` 由来のガードをページ側で実装。

5. **アクセシビリティとセマンティクスの課題**
   - `<a>` をボタン用途で使用している箇所、custom select/dropdown のキーボード操作未整備。
   - `form` 要素を使っていても submit イベントを活かさず click ベース送信。
   - 実運用時は a11y 不具合の温床になりうる。

6. **外部通信の設計が簡易すぎる**
   - `fetch` の `params` を config に置いているが標準 fetch では未使用。
   - HTTP status 失敗時ハンドリング（4xx/5xx）やタイムアウト、再試行、認証ヘッダー付与などが不足。
   - `http://` エンドポイント直書きは本番運用上のリスク。

7. **命名・一貫性・保守性の課題**
   - `loadingFlug` など typo が複数箇所に残存。
   - `signOut` / `signout` / `signOut` のパス表記ゆれ。
   - 大量の相対 import で深い階層移動が発生し、リファクタリングコストが上がる。

---

## 優先度つき改善ロードマップ

### P0（最優先: 安全性/保守性）

1. **状態管理の近代化**
   - Redux Toolkit（`configureStore`, `createSlice`）へ移行。
   - `loadingFlag` を boolean ではなく request counter か request key map として型定義。

2. **認証コンテキストの導入**
   - `AuthProvider` + `useAuth()` を作成し、`Router` は `ProtectedRoute/PublicRoute` に責務分離。
   - `GetSignInFlag()` の直接呼び出しをUI層から除去。

3. **APIクライアント層の新設**
   - `src/services/httpClient.ts` を作成し、
     - baseURL
     - 共通ヘッダー
     - statusチェック
     - typed response
     - 共通エラー型
     を集中管理。

### P1（高優先: 開発体験/品質）

4. **型定義の見直し**
   - `object` を廃止し、フォーム値・エラー・APIレスポンスを明示的 interface/type に置換。
   - `TypeStore` は `RootState` / `AppDispatch` を公開する形式へ。

5. **import path alias 導入**
   - `@/components/...` のような alias を `tsconfig` / `vite` に定義。
   - 深い相対パスの可読性課題を解消。

6. **ルーティング定数化**
   - path を `src/router/paths.ts` へ集約し、表記ゆれを根絶。

### P2（中優先: UX/運用）

7. **a11y改善**
   - Custom Select / Dropdown に keyboard navigation, ARIA 属性を付与。
   - click送信を `form onSubmit` + `button type="submit"` に統一。

8. **テスト戦略の明文化**
   - `Vitest + Testing Library` で
     - component test
     - router guard test
     - auth helper(mock) test
     を段階導入。

9. **環境変数バリデーション**
   - 起動時に Cognito 関連 env の存在を検証し、未設定なら明示エラー。

---

## 総評

- 現状は「学習・検証用途としては十分に整理されている」一方、
  実運用を意識すると **状態管理・責務分離・型安全・a11y** が主要ボトルネックです。
- ただしフォルダ構造の土台は悪くないため、P0/P1の順で改善すれば
  大規模化にも耐える構成へ移行しやすいです。
