# Architecture Review by Codex - 2026/09/01

## 総合評価

このリポジトリは、**React の学習用サンプルとしてよく整理されており、小規模な認証付き SPA の土台としても十分に実用的**です。

特に、Feature 単位のコロケーション、宣言的なルート設定、認証 Guard、API 共通クライアント、並行リクエストを考慮したローディング管理、TypeScript の strict mode、Vitest / Testing Library、Storybook、ESLint / Prettier / Husky、sitemap・静的 HTML・メタ情報生成まで用意されている点は、一般的な学習用リポジトリより一段上です。

一方、現時点では「画面・共通 UI・技術的な共通処理を整理した構成」であり、**複雑な業務ドメインを複数チームで長期間開発するための境界設計**までは確立されていません。

| 規模   | 現状の実用性 | 判断                                                                   |
| ------ | ------------ | ---------------------------------------------------------------------- |
| 小規模 | 高い         | ほぼ現状のまま使用可能                                                 |
| 中規模 | 中〜高       | API、認証、状態管理、Feature 境界を整理すれば十分対応可能              |
| 大規模 | 低〜中       | 現状をそのまま拡張するのは難しく、ドメイン境界と依存方向の再設計が必要 |

端的には、次の範囲に適しています。

- 1〜5 人程度
- 10〜30 画面程度
- 認証付き SPA
- CRUD やフォーム中心
- 比較的単純な権限モデル
- 単一フロントエンドチーム

一方、数十人・複数チーム、50〜100 画面以上、複数の業務ドメイン、複雑な認可、大量のサーバーキャッシュやリアルタイム更新、高度な監査・障害解析・可観測性、SSR が主要要件になる場合は、現状のままでは厳しくなります。

---

## 1. 現在のアーキテクチャ

主な技術構成は次のとおりです。

- React 19 / TypeScript / Vite
- React Router
- Redux Toolkit / React Redux
- AWS Amplify / Cognito
- Axios
- React Hook Form
- styled-components
- Storybook
- Vitest / Testing Library
- ESLint / Prettier / Husky
- 独自の sitemap / 静的 HTML 生成処理

ソースコードは、大まかに次の領域へ分かれています。

```text
src/
├── components/   # 共通 UI・レイアウト
├── features/     # 画面・機能単位の実装
├── lib/          # 型、スタイルなど
├── router/       # ルート設定、認証 Guard
├── utils/        # API、認証、Store、GA、Provider
├── App.tsx
└── main.tsx
```

エントリーポイントと `App.tsx` は簡潔で、アプリ共通 Provider、Router、Global Style、Global Loading、GA 初期化といったアプリケーション全体の構成を把握しやすくなっています。

---

## 2. アーキテクチャ的に良い点

### 2.1 Feature 単位のコロケーション

`src/features` 以下が画面・機能単位に整理され、それぞれに次のようなファイルを置く方針になっています。

```text
page.tsx
component.tsx
type.ts
util.ts
```

技術単位ですべての Hook、型、API、コンポーネントを巨大な共通フォルダへ集める構成より、変更対象を追いやすい方式です。

- 画面に関連するコードを探しやすい
- 機能を削除するときに対象範囲が明確
- ページ間で意図せず依存しにくい
- 新規参加者が変更場所を理解しやすい

さらに ESLint で、`features` 以下を原則 Router 以外から直接 import させないルールを用意している点も評価できます。命名規約だけでなく、依存ルールをツールで守ろうとしています。

#### 改善余地

現在の一部の `page.tsx` には、フォーム構築、入力検証、認証処理、Redux dispatch、エラー状態、JSX、スタイルが同居しています。小規模では問題ありませんが、中規模化する場合は次のように分離できます。

```text
features/auth/sign-in/
├── ui/
│   └── SignInForm.tsx
├── model/
│   ├── useSignIn.ts
│   └── schema.ts
├── api/
│   └── signIn.ts
├── page.tsx
└── index.ts
```

ただし、現状の規模で細分化しすぎるとファイル間移動が増えます。「ページが 200〜300 行を超えた」「同じ処理を複数ページが使う」「単体テストしにくくなった」時点で分割する程度が妥当です。また、内容がない `component.tsx` や `util.ts` は機械的に作らず、必要になった時点で追加した方がノイズを減らせます。

### 2.2 アプリケーションルートが簡潔

`App.tsx` は次の責務に集中しています。

- アプリ共通 Provider
- Browser Router
- Global Style
- Global Loading
- Router
- GA 初期化

ページ固有ロジックが入り込んでおらず、アプリ全体の構成を短時間で把握できます。Redux Provider と Auth Provider を `AppRootProvider` にまとめ、Provider の深いネストをルートから隠している点も良い設計です。

#### 改善余地

`AppRootProvider` は単なる utility ではなく、アプリケーション構成そのものです。将来的には次のような名前と配置の方が責務を明確に表せます。

```text
src/app/providers/AppProviders.tsx
src/app/router/
src/app/store/
```

### 2.3 宣言的なルート設定

ルート設定には以下が一箇所に集約されています。

- パス
- ページコンポーネント
- アクセス種別
- title / description
- noindex
- OGP 関連情報

各ページを `lazy()` で読み込むため、ページ単位のコード分割も自然に適用されています。

- ルート追加場所が明確
- 認証要否を宣言的に指定できる
- メタ情報とページを同期しやすい
- sitemap / 静的 HTML 生成へ再利用できる
- Route JSX の重複を減らせる

#### 改善余地

単一の `routeConfig.tsx` は 20〜30 画面程度までは扱いやすい一方、画面数が増えると変更競合が集中します。中規模以上では、Feature 単位で分割して最後に合成する方が安全です。

```text
features/auth/routes.ts
features/orders/routes.ts
features/users/routes.ts
features/admin/routes.ts
app/router/routes.ts
```

現在の `auth | guest | public` というアクセスモデルは一般ユーザー向けの小規模アプリには十分です。管理画面や法人向けアプリでは、ロールや権限まで表現するモデルが必要になります。

```ts
type RouteAccess =
  | { kind: "public" }
  | { kind: "guestOnly" }
  | { kind: "authenticated" }
  | { kind: "roles"; roles: UserRole[] }
  | { kind: "permissions"; permissions: Permission[] };
```

ただし、フロントエンドの Guard はセキュリティ境界ではありません。実際の認可は必ず API 側でも行う必要があります。

### 2.4 認証 Guard の分離

`AuthGuard` と `GuestGuard` が独立しており、各ページが認証判定を直接実装する必要がありません。認証確認中、認証済み、未認証、guest-only、auth-only の分岐が Router 層に集約されています。

#### 改善余地

今後は次の要件を共通化するとよいでしょう。

- 認証チェック中の専用画面
- 認証基盤障害と未認証の区別
- ログイン後に元の URL へ復帰
- セッション期限切れメッセージ
- MFA やパスワード変更要求
- ロール・権限エラー用の 403 ページ

### 2.5 認証ライブラリをページから隔離している

`AuthProvider` が Amplify の `getCurrentUser()` を使用し、画面は `useAuth()` 経由で状態を参照できます。sign-in / sign-up / verification / sign-out も helper にまとめられており、各ページが Amplify API の詳細へ過度に依存するのを抑えています。

#### 改善余地

現在の認証確認は `getCurrentUser()` の例外をすべて未認証として扱います。そのため、次の状態を区別できません。

- 本当に未認証
- Cognito 設定不備
- 一時的な認証基盤障害
- ネットワークエラー
- ライブラリ側の想定外障害

中規模以上では、boolean ではなく状態を明示的に表現すると安全です。

```ts
type AuthState =
  | { status: "checking" }
  | { status: "anonymous" }
  | { status: "authenticated"; user: User }
  | { status: "error"; error: AuthError };
```

別タブでのサインアウト、トークン更新、セッション失効などを扱う場合は、Amplify Hub やストレージイベントとの同期も検討対象になります。

### 2.6 API クライアントの共通化

HTTP 呼び出しは共通 `request()` に集約され、次を統一処理しています。

- base URL
- Authorization header
- Cognito セッション取得
- request body / query parameter
- Axios エラーの正規化
- グローバルローディング

成功と失敗を discriminated union で表現しており、TypeScript で安全に絞り込める点も良い設計です。業務上想定される HTTP エラーを値として返し、Axios 以外の想定外エラーは再送出する意図も明確です。

#### 改善余地: Redux への直接依存

API クライアントがグローバル Store を直接 import し、loading action を dispatch しています。

この構成では次の問題が生じます。

- Redux がない環境で再利用しにくい
- API 単体テストにもグローバル Store が必要
- バックグラウンド更新にも全画面ローディングが出る
- ボタン単位のローディングへ発展しにくい
- API 層と UI 状態管理層が密結合する

改善案は次のとおりです。

1. 呼び出し側で loading を管理する
2. API client に callback / event を注入する
3. Axios interceptor を薄い infrastructure 層に置く
4. TanStack Query / RTK Query へサーバー状態を移す
5. 全画面 loading と局所 loading を分離する

#### 改善余地: 通信機能

中規模以上では、次も必要になります。

- `AbortSignal` によるキャンセル
- timeout の統一
- 冪等リクエストの retry
- stale data のキャッシュ
- 重複リクエスト排除
- 401 時の再認証方針
- schema validation
- correlation ID
- API ログ・トレース

また、明示的な token がない場合は公開 API でも認証セッションを確認します。`auth: "required" | "optional" | "none"` のような指定を持たせると意図が明確になります。

### 2.7 並行リクエストを考慮したローディング管理

loading を boolean ではなく count で管理している点は実務的です。

```text
リクエスト A 開始: 0 → 1
リクエスト B 開始: 1 → 2
リクエスト A 終了: 2 → 1
リクエスト B 終了: 1 → 0
```

Reducer は 0 未満にならないよう保護され、並行リクエストが順番に完了するケースもテストされています。

#### 改善余地

カウンター方式でも、すべての通信が全画面 loading を表示する、ポーリングで画面を操作できなくなる、どの処理が loading 中か分からない、といった問題は残ります。中規模化する場合はキー付きの状態にするか、TanStack Query / RTK Query の query・mutation state を使う方が自然です。

### 2.8 Redux Store の基本構成が素直

Reducer を slice 単位で集約し、`RootState` と `AppDispatch` を Store から導出しているため、型を手作業で同期する必要がありません。Redux Toolkit の基本構成として適切です。

#### 改善余地

今後は次の使い分けを明確にする必要があります。

- React local state
- Redux のクライアント状態
- URL state
- サーバーキャッシュ
- 永続化対象

API から取得したデータを通常の Redux slice に大量保存し始めると、キャッシュ無効化が複雑になります。サーバー状態には RTK Query または TanStack Query が適しています。

### 2.9 品質ゲートが充実している

format、lint、TypeScript check、test、production build、Storybook build、sitemap / 静的 HTML 生成のコマンドが揃っています。Husky の pre-commit でも checker と test が実行されます。

TypeScript の strict mode、未使用変数、React Hooks、アクセシビリティ、import 順序、認知的複雑度、循環的複雑度、ネスト上限、危険な型アサーション、Feature import 制限など、静的解析も充実しています。

#### 改善余地

規模が拡大すると pre-commit で全 lint・全テストを実行する時間が長くなるため、次のように分けると開発体験を維持できます。

- pre-commit: staged files の format / lint
- pre-push: 関連テスト
- CI: 全テスト、全ビルド

### 2.10 主要な横断処理をテストしている

API client では、認証ヘッダー、パラメータ、Axios エラー変換、Axios 以外の例外、401、認証セッション取得失敗、並行リクエストが検証されています。認証 Provider、Router Guard、Redux slice、Page Meta、各サンプル・認証・エラーページにもテストがあります。

#### 改善余地

ページテストは代表的なシナリオが中心です。今後は次を追加するとよいでしょう。

- 複数の失敗パターン
- MSW を使った HTTP レベルの統合テスト
- E2E
- production build の smoke test
- 実ブラウザ上の認証リダイレクト
- キーボード操作・フォーカス制御
- Visual Regression
- Error Boundary

### 2.11 SEO・静的配信への配慮

ルートごとに title、description、OGP、canonical、robots、JSON-LD を生成する仕組みがあり、SPA で不足しやすい検索・SNS向け情報を補っています。ルート設定を TypeScript AST で解析しているため、単純な正規表現でソースコードを読む方式より安全です。

#### 改善余地

現在のプリレンダリングは React ページそのものをレンダリングするのではなく、title と description を含む簡易 markup を root に挿入する方式です。したがって、本格的な SSR / SSG ではありません。

- ページ本文が静的 HTML に出ない
- React の実画面とプリレンダー内容が異なる
- 動的データの SEO に弱い
- markup の二重管理が発生する
- React 側は `hydrateRoot` ではなく通常の `createRoot`

SEO が主要要件なら、React Router の framework mode、Next.js、Remix 系、または正式な SSG / SSR 構成を検討した方がよいでしょう。

また、AST 抽出はルート object が静的リテラルであることを前提としています。ルート定義を関数、spread、定数参照へ変更すると抽出できないため、この制約をドキュメント化しておく必要があります。

---

## 3. 横断的な改善ポイント

### 3.1 `utils` が大きな「その他フォルダ」になっている

現在の `utils` には API、認証、Redux、Provider、Analytics があります。これらは補助関数ではなく、アプリケーションの主要サブシステムです。

`utils` という名前では依存方向や責務が分かりにくく、規模が増えると何でも入る場所になりやすいため、将来的には次のような分類が候補になります。

```text
src/
├── app/
│   ├── providers/
│   ├── router/
│   └── store/
├── infrastructure/
│   ├── api/
│   ├── auth/
│   └── analytics/
├── shared/
│   ├── ui/
│   ├── styles/
│   ├── hooks/
│   └── types/
├── features/
└── domains/
```

一括移行は大量の import 変更を発生させます。まずは**新しい主要サブシステムを `utils` に追加しない**ところから始めるのが現実的です。

### 3.2 ドメイン層が存在しない

現状はおおむね次の構造です。

```text
Page
  ↓
helper / API / Redux
  ↓
外部ライブラリ
```

サンプルや単純な CRUD では十分ですが、業務ロジックが増えると次が問題になります。

- 業務ルールがページに散らばる
- API response の形が UI へ漏れる
- 同じルールを複数画面で再実装する
- React なしでは業務ロジックをテストできない
- Amplify や Axios の型がアプリ全体へ伝播する

中〜大規模では、複雑な業務領域に限って次の境界を導入すると有効です。

```text
UI / Feature
    ↓
Application use case
    ↓
Domain model
    ↓
Repository interface
    ↓
Infrastructure implementation
```

小規模プロジェクトに完全な Clean Architecture を導入するのは過剰です。注文、契約、請求、権限など、明確な業務ルールを持つ機能に限定するのがよいでしょう。

### 3.3 エラーハンドリング戦略

現状はページ内の `.catch()` と 404 / 500 ページが中心です。中規模以上では次が必要になります。

- React Error Boundary
- chunk load failure の復旧
- 401 / 403 / 404 / 409 / 422 / 429 / 5xx の統一方針
- ユーザー向けメッセージと開発者向けログの分離
- request ID の表示
- Sentry 等への例外通知
- retry 可能・不可能の区別

少なくとも、API error normalization、Feature-level error mapping、Application-level unexpected error boundary の 3 層を定義するとよいでしょう。

### 3.4 可観測性

GA はアクセス解析には有効ですが、運用上は次も必要です。

- JavaScript 例外
- API failure rate / latency
- route transition failure
- authentication failure
- release version
- source map
- correlation / trace ID
- Web Vitals

小規模な社内ツールでは不要な場合もありますが、顧客向けサービスや大規模運用では重要です。

### 3.5 アクセシビリティ

jsx-a11y や Storybook は導入されていますが、静的 lint だけでは次を保証できません。

- モーダルのフォーカストラップ
- Escape key
- フォーカス復帰
- スクリーンリーダーの読み上げ
- 色コントラスト
- 動的エラー通知
- キーボードのみでの操作

中規模以上では Storybook addon-a11y、axe、Playwright などによる検査が有効です。

---

## 4. 規模別の実用性

### 4.1 小規模プロジェクト

#### 想定

- 1〜5 人
- 5〜30 画面
- 単一プロダクト
- 単純な Cognito 認証
- CRUD、フォーム、管理画面
- API 数十本程度

#### 評価: 十分実用的

現状の構成で大きな問題はありません。Feature 単位の配置、共通 UI、宣言的 Router、認証 Context、API client、TypeScript strict、テスト、Storybook、品質コマンド、静的ビルドが小規模開発を十分に支えます。

この規模では、Clean Architecture や高度な DI を追加するより、現状の単純さを維持した方が生産性は高いです。

#### 優先改善

1. Error Boundary
2. API timeout / cancellation
3. 認証エラーと未認証の区別
4. 空の `component.tsx` / `util.ts` を機械的に作らない
5. `utils` に新しい主要責務を追加しない

### 4.2 中規模プロジェクト

#### 想定

- 5〜15 人
- 30〜100 画面
- 複数 Feature
- API 100 本前後
- 複数ロール
- 長期運用

#### 評価: 改善すれば実用的

現状を土台として利用できますが、以下は早めに見直すべきです。

1. `app / shared / infrastructure / features` への整理
2. `routeConfig` の Feature 単位分割
3. API と Redux の直接依存解消
4. サーバー状態管理の導入
5. Error Boundary と統一エラー戦略
6. ロール・権限モデル
7. API schema validation または OpenAPI code generation
8. MSW / E2E
9. 可観測性
10. Feature ごとの public API

Feature 間 import を禁止するだけでなく、それぞれの Feature が何を公開するかを `index.ts` で明示すると管理しやすくなります。

### 4.3 大規模プロジェクト

#### 想定

- 15〜50 人以上
- 100 画面以上
- 複数チーム
- 複数業務ドメイン
- 高度な権限管理
- 長期継続開発
- 高い可用性・監査要件

#### 評価: 現状の延長では厳しい

問題は React、Vite、Redux といった個別技術ではなく、次の設計要素が不足していることです。

- 業務ドメイン境界
- Feature ownership
- 公開 API と内部実装の区別
- 依存方向
- infrastructure 抽象
- schema contract
- エラー分類
- 認可モデル
- 可観測性
- テストピラミッド
- リリース・ロールバック戦略

大規模化する場合、例えば次の構成が候補です。

```text
src/
├── app/
│   ├── bootstrap/
│   ├── providers/
│   ├── router/
│   └── error-boundary/
├── domains/
│   ├── account/
│   ├── organization/
│   ├── order/
│   └── billing/
├── features/
│   ├── sign-in/
│   ├── create-order/
│   └── cancel-order/
├── infrastructure/
│   ├── api/
│   ├── auth/
│   ├── storage/
│   └── observability/
└── shared/
    ├── ui/
    ├── hooks/
    ├── validation/
    └── types/
```

場合によっては monorepo 化し、アプリ、UI、API client、domain、lint 設定、test utilities を物理的に分けることも検討できます。

ただし、将来大規模になるかもしれないという理由だけで今すぐ導入するのは推奨しません。現在の実際のチーム規模と業務複雑度に合わせるべきです。

---

## 5. 改善の優先順位

### 優先度 A: 現在から着手してよいもの

1. `utils` へ主要責務を追加しない
2. Error Boundary を追加する
3. 認証エラーと未認証を区別する
4. API に timeout / `AbortSignal` を追加する
5. 全画面 loading と局所 loading を分ける
6. API エラーのユーザー表示方針を統一する
7. 空のテンプレートファイルを必要になるまで作らない

### 優先度 B: 中規模化するとき

1. `app / shared / infrastructure / domains` を導入する
2. Router を Feature 単位に分割する
3. TanStack Query または RTK Query を導入する
4. OpenAPI から API 型を生成する
5. runtime validation を導入する
6. MSW と E2E を追加する
7. ロール・権限モデルを追加する
8. Sentry 等の可観測性を追加する

### 優先度 C: 大規模化が確定したとき

1. ドメイン境界とチーム ownership を一致させる
2. Feature の public API を強制する
3. dependency-cruiser 等で依存方向を検証する
4. monorepo 化を検討する
5. デザインシステムを独立 package 化する
6. API contract test を導入する
7. リリース単位・障害分離単位を再設計する

---

## 最終結論

このコードベースの最大の長所は、**小規模なうちから品質基盤、認証、ルーティング、API、テスト、Storybook、SEO を一通り意識していること**です。

最大の課題は、**`utils` に主要サブシステムが集まり、ページ・API・Redux・外部ライブラリ間の依存が今後強くなりやすいこと**です。

- **小規模:** 現状のままで十分実用的
- **中規模:** 現状を良い出発点として利用可能。ただし責務・依存・サーバー状態管理を整理する必要がある
- **大規模:** 技術スタックは流用可能だが、アーキテクチャ境界は再設計が必要

過剰設計を避ける意味でも、現在すぐに全面改修する必要はありません。まずは **Error Boundary、API / Redux 結合の緩和、認証状態の精密化、`utils` の拡大防止**から進めるのが、費用対効果の高い改善順序です。
