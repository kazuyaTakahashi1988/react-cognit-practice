# Architecture Review by Codex - 2026/7/31

## 結論

現時点の評価は次のとおりです。

| 規模   | 実用性 | 評価                                                            |
| ------ | ------ | --------------------------------------------------------------- |
| 小規模 | 高い   | そのまま実用可能。業務利用前に境界テストと設定検証を推奨        |
| 中規模 | 中〜高 | テストと PR CI は整備済み。通信・状態管理の分離を補えば実用可能 |
| 大規模 | 低〜中 | 現状の延長では厳しく、ドメイン境界と依存方向の再設計が必要      |

一言でまとめると、**学習用サンプルの域はある程度超えており、小規模な業務 SPA の土台として十分使えます。フロントエンドのページテストと PR 品質ゲートも導入済みのため、中規模の入口にも到達しています。一方、大規模開発では「共通層への集中」「重要な境界のテスト不足」「状態管理と通信層の密結合」がボトルネックになります。**

以前のレビュー後に、ルート定義のデータ化・遅延ロード・Guard 分離・API クライアントと API モジュールの分離・Redux slice 分割が導入されています。そのため、現在の構成は以前より明確に中規模寄りへ改善されています。

---

## 1. 現在のアーキテクチャ

主要な技術構成は以下です。

- React 19 / TypeScript / Vite
- React Router
- Redux Toolkit / React Redux
- AWS Amplify / Cognito
- Axios
- React Hook Form
- styled-components
- Storybook
- AWS CDK / Cognito 構成は別ブランチで管理
- ESLint / Prettier / Husky
- 静的プリレンダリング / サイトマップ生成

ソースコードは概ね次の責務に分けられています。

```text
src/
├── components/   # 再利用 UI・レイアウト
├── features/     # 画面・ユースケース単位
├── lib/          # 型・スタイルなど静的な共通要素
├── router/       # ルート定義・Guard
├── utils/        # API、認証、Redux、GA など
├── App.tsx
└── main.tsx
```

README にも `components`、`features`、`lib`、`router`、`utils` という大分類は明文化されています。一方、feature 内の hook、API、UI の分割基準や共通化の判断基準は、中規模化の際に追記する余地があります。

---

## 2. アーキテクチャ的に良い点

### 2.1 `features` を中心に画面をコロケーションしている

画面固有の実装を、例えば次のようにまとめています。

```text
features/auth/signIn/
├── page.tsx
├── component.tsx
├── type.ts
└── util.ts
```

この方式は、ページ数が増えたときに関連ファイルを追いやすく、認証画面の型や処理が共通フォルダへ無秩序に散らばる問題を抑えられます。共有 UI は `components`、画面固有の実装は `features` という境界も理解しやすいです。

- 小規模: 非常に適切
- 中規模: 十分適切
- 大規模: `domains/auth`、`application/auth` など、さらに明確なドメイン境界が必要になる可能性がある

### 2.2 App ルートがシンプルで見通しがよい

`App.tsx` は、アプリ全体の Provider、BrowserRouter、GlobalStyle、GlobalLoading、Router、GA 初期化に集中しています。横断的関心事がアプリルートに集約され、ページ固有のロジックが混ざっていません。

さらに `AppRootProvider` が Redux と認証の Provider をまとめているため、Provider が増えても `App.tsx` が深いネストで埋まりにくい構成です。

今後 Provider 間の依存が増える場合は、Provider の順序が必要な理由をコメントまたはテストで明示すると安全です。

### 2.3 ルートが設定データとして分離されている

URL、アクセス種別、ページコンポーネントが `routeConfig` にまとまっています。全ページが `lazy()` で読み込まれ、Router 側は設定を map して Guard 適用を共通化しています。

利点は次のとおりです。

- ページ単位でコード分割される
- ルート追加の作業場所が明確になる
- 認証要否を `access` で宣言できる
- Route JSX の重複を抑えられる
- 将来 title、breadcrumb、role などのメタデータを追加しやすい

現在のページ数だけでなく、20〜30 ページ程度まで十分扱いやすい構成です。

### 2.4 認証 Guard が分離されている

`AuthGuard` と `GuestGuard` が分かれており、未認証ユーザーと認証済みユーザーの遷移制御が個々のページへ埋め込まれていません。認証状態の確認中も共通表示されます。

現在の `public / guest / auth` の三分類は現状の要件には十分です。ただし、管理画面や複数権限が必要になると role や permission を表せるモデルへ拡張する必要があります。

```ts
type RouteAccess =
  | { kind: "public" }
  | { kind: "guestOnly" }
  | { kind: "authenticated" }
  | { kind: "role"; roles: UserRole[] }
  | { kind: "permission"; permissions: Permission[] };
```

必要になる前の導入は過剰設計なので、現在の三分類を維持する判断は妥当です。

### 2.5 認証ライブラリの詳細をラップしている

認証ページが Amplify API を直接呼ぶのではなく、`signInHelper`、`signUpHelper`、`verifyHelper`、`signOutHelper` を通しています。Amplify から返る値も最低限の型ガードで検証しています。

認証状態は Context に隔離され、画面側は `useAuth()` を利用します。Provider 外で利用された場合には明示的なエラーを投げ、AuthProvider は認証確認中と認証済み状態を分けています。

これにより、次の利点があります。

- Cognito の実装詳細が画面全体へ漏れにくい
- 認証状態確認中の画面のちらつきを Guard で防げる
- 将来、モック認証や別プロバイダーへ置き換えやすい
- トークンを独自に Web Storage へ保存していない

### 2.6 API クライアントとエンドポイントが分離されている

HTTP 共通処理は `client.ts`、個別 API 関数は `modules` に分かれています。API クライアントは base URL、Cognito セッションからのアクセストークン取得、Authorization ヘッダー、Axios 呼び出し、エラー正規化、グローバルローディングを一箇所で処理します。

個別 API は薄い関数として定義され、barrel ファイルから公開されているため、呼び出し側が内部配置を知る必要もありません。この構成は小〜中規模で扱いやすいです。

### 2.7 API 結果が判別可能な型になっている

成功と失敗を例外だけに頼らず、`ok` で判定できる設計です。

この方式には次の利点があります。

- API の 4xx / 5xx を想定内の結果として扱える
- TypeScript の narrowing を利用できる
- 画面のエラー処理が明示的になる
- どの例外を catch すべきかが曖昧になりにくい

Axios 以外の例外は再 throw するため、「通信エラーは結果、想定外エラーは例外」と区別する意図も読み取れます。

### 2.8 グローバルローディングがカウンター方式

ローディング状態を boolean ではなくカウンターで持ち、リクエスト開始で `+1`、終了で `-1`、0 未満にはしない実装です。

並行リクエスト時に、片方が終了しただけでローディングが消える問題を避けられます。小さな実装ですが、実務的に重要です。

### 2.9 Redux が slice 単位に分割されている

Store は機能ごとの Reducer を集約する比較的薄い実装です。`AppDispatch` と `RootState` も Store から導出され、型を手動同期する必要がありません。Redux Toolkit の基本的な使い方として適切です。

### 2.10 UI コンポーネントの API が React 標準属性と親和的

Input は `React.InputHTMLAttributes<HTMLInputElement>` を継承し、`forwardRef` に対応しています。そのため React Hook Form の `register()` から返る ref やイベント属性を渡しやすく、独自 UI がフォームライブラリへ過度に密結合していません。

### 2.11 静的解析の品質ゲートが強い

`checker` は Prettier、ESLint、TypeScript をまとめて実行します。ESLint には次のようなルールがあります。

- React Hooks
- jsx-a11y
- TypeScript
- import 整合性と順序
- SonarJS
- cognitive complexity
- cyclomatic complexity
- ネスト上限
- unsafe assertion 禁止
- type-only import
- feature 依存制限

特に `features` を router 以外から import できないよう制限している点は、依存方向を人間の注意だけでなくツールで守ろうとしており評価できます。

### 2.12 Storybook が UI カタログとして機能する

フォーム部品、ボタン、モーダル、アコーディオン、ドロップダウンなどの Story があり、グローバルスタイルも Storybook へ適用されています。小規模では便利であり、中規模以上ではデザイン仕様と UI 回帰確認の基盤になります。

---

## 3. 悪い点・改善できる余地

### 3.1 自動テストは導入済みだが、重要な境界のテストが不足している

Vitest、Testing Library、user-event、jest-dom、jsdom が導入され、`test` / `test:watch` スクリプトも定義されています。認証、エラー、Example の各ページには、表示と利用者操作を確認するテストがあります。認証テストではサインイン、サインアップ、検証コード、サインアウトと helper 呼び出しまで検証しており、「自動テストが存在しない」状態ではありません。

一方、現在のテストはページの代表的な正常系が中心です。アーキテクチャ上の重要な境界である次の振る舞いは、引き続き拡充が必要です。

#### 単体・統合テスト

- API エラー正規化、Authorization header、loading の後始末
- AuthProvider の初期化、失敗、連続 refresh
- AuthGuard / GuestGuard のリダイレクト
- Redux loading count の並行リクエスト
- フォームの異常系とバリデーション
- メタタグ、canonical、構造化データの更新
- sitemap / prerender の生成結果

#### コンポーネント・アクセシビリティテスト

- Input と React Hook Form の接続
- モーダルのフォーカス制御
- ドロップダウンのキーボード操作
- 認証中・認証済み・未認証表示

#### E2E

- サインアップから検証、サインイン、サインアウトまで
- 認証必須ページ
- セッション失効や API 失敗時の表示
- 静的配信環境での直リンクと 404

小規模アプリの回帰防止基盤としては実用的な水準へ改善されています。中規模化に向けては、ページ数に比例してテストを増やすよりも、API、認証、Router、ビルド成果物という変更影響の大きい境界を優先して保証するのが効果的です。

### 3.2 API 層が Redux Store へ直接依存している

`client.ts` が `store` と loading action を直接 import し、API リクエストの中で dispatch しています。

```text
API infrastructure
    ↓
Redux application state
    ↓
UI loading
```

API クライアントが UI 都合を知る構成で、次の問題があります。

- API クライアントを React 外で再利用しづらい
- 単体テストでグローバル Store が必要になる
- Redux を交換しづらい
- バックグラウンド更新まで GlobalLoading が表示される可能性がある
- ボタン、画面、部分単位の loading へ発展させにくい
- リクエストキャンセルやキャッシュとの統合が難しい

中規模なら API クライアントを純化し、loading は呼び出し側の hook や mutation が持つ形を推奨します。

```ts
const { mutate, isPending } = useCreateArticle();
```

TanStack Query などを導入すれば、server state の cache、retry、invalidation、deduplication、stale time、query / mutation status を委譲できます。Redux はクライアント状態、Query ライブラリはサーバー状態という分離が適しています。

### 3.3 認証処理でも Redux Store を直接操作している

サインインページは認証処理の前後で直接 Store へ dispatch しています。この方式では各認証ページに loading 開始、Promise 処理、エラー変換、loading 終了、auth state refresh が重複しやすくなります。

`useSignIn()` のような application hook へまとめ、ページは表示とイベント接続だけにするのが望ましいです。

```ts
const { signIn, isPending, error } = useSignIn();
const onSubmit = form.handleSubmit(signIn);
```

中規模化に向けて効果の大きい改善です。

### 3.4 `page.tsx` の責務が多い

サインインページはメタ情報、フォーム初期化、バリデーション、認証ユースケース、Redux loading、エラー変換、JSX、styled-components を一つのファイルで担当しています。フォーム例ではさらに多数のフィールドと送信処理も同居します。

一方、同じ feature 内の `component.tsx` と `util.ts` は空であり、構造上は分割先があっても実装上は分割されていません。

全ページを機械的に分割する必要はありません。複雑なページだけ段階的に次のように分けるとよいです。

```text
signIn/
├── page.tsx             # Layout と画面組み立て
├── SignInForm.tsx       # UI
├── useSignInForm.ts     # フォーム・submit
├── schema.ts            # validation
├── types.ts
└── constants.ts
```

`component.tsx` のような抽象的な名前より、`SignInForm.tsx` のように責務が分かる名前を推奨します。

### 3.5 `utils` が「何でも置き場」になり始めている

現在 `utils` には API、認証、Redux Store、App Provider、GA が入っています。これらは単純な utility 関数ではなく、アプリケーションの主要サブシステムです。

`utils` という名前は依存方向や責務を表さないため、規模が増えると何でも追加される傾向があります。

中規模なら、例えば次の方が境界を明確にできます。

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
├── components/
├── features/
└── shared/
```

ただし、現在の規模で全面移行すると差分の割に価値が少ない可能性があります。次に機能を追加するときから新しい責務を `utils` に増やさない方針が現実的です。

### 3.6 feature の境界が画面境界であり、業務境界ではない

現在の feature は `auth/signIn`、`auth/signUp`、`auth/signOut`、`auth/verification` のようなページ単位です。小規模では分かりやすい一方、業務が複雑になると認証エラー変換、email validation、password policy、Cognito nextStep の解釈、verification 状態などが重複しやすくなります。

中〜大規模では、共通の認証ルールを domain 側、画面ユースケースを feature 側に置く構造が候補になります。

```text
domains/auth/
├── model/
├── api/
└── types/

features/auth/
├── sign-in/
├── sign-up/
└── verify/
```

ただし、認証関連の重複が実際に増え始めた時点で導入すべきであり、現時点で直ちに必要な変更ではありません。

### 3.7 API 型がまだ弱い

サンプル API は GET のレスポンス型が未指定で、POST もリクエストだけがジェネリックです。そのため、呼び出し側でドメイン固有の型安全性を十分得られません。

```ts
export const getArticles = () =>
  request<ArticleResponse[], never>("GET", "/articles");

export const createArticle = (requestData: CreateArticleRequest) =>
  request<ArticleResponse, CreateArticleRequest>("POST", "/articles", {
    requestData,
  });
```

中規模以降では OpenAPI から型とクライアントを生成し、API 仕様と実装の不一致や DTO の手書きを減らすことが望ましいです。

### 3.8 エラー処理が画面ごとに不統一になりやすい

API クライアントは Axios エラーを正規化していますが、認証エラーは画面側で `Error.message` をそのまま表示しています。このままでは次の問題が起こり得ます。

- Cognito や Axios の内部メッセージが利用者へ露出する
- 日本語化が困難になる
- 同じエラーコードでも画面ごとに文言が異なる
- ログへ送るエラーと表示エラーが混ざる
- 401、403、404、409、422、500 の扱いが統一されない

インフラ層で共通の `AppError` に変換し、UI 層で表示文言へ変換する方法を推奨します。

```ts
type AppError =
  | { kind: "validation"; fields: FieldErrors }
  | { kind: "unauthorized" }
  | { kind: "forbidden" }
  | { kind: "conflict"; code: string }
  | { kind: "network" }
  | { kind: "unexpected"; cause: unknown };
```

### 3.9 認証状態の更新契機が限定的

AuthProvider はマウント時に `getCurrentUser()` を呼び、画面が明示的に `refreshAuthState()` を呼ぶ方式です。小規模では問題ありませんが、別タブでのサインアウト、セッション失効、Amplify Hub の認証イベント、API の 401、パスワード変更、MFA などへの追従が弱くなります。

中規模なら Amplify Hub の auth event を AuthProvider で購読し、認証状態を同期する方法を検討できます。また、boolean の組み合わせではなく状態機械で表すと拡張しやすくなります。

```ts
type AuthState =
  | { status: "checking" }
  | { status: "anonymous" }
  | { status: "authenticated"; user: AuthUser }
  | { status: "error"; error: AppError };
```

### 3.10 認証設定の検証がない

Amplify 設定では、環境変数がない場合に空文字を設定しています。その場合、アプリ起動時ではなく認証操作時に分かりにくいエラーになる可能性があります。

起動時に環境変数を検証し、設定不足を fail fast で発見できるようにすることを推奨します。

### 3.11 SEO は改善されているが、本質的には SPA

現在のルーティングはクライアントサイドルーティングです。ビルドスクリプトには sitemap と prerender があり、静的サイトとしての SEO を補う良い工夫です。

ただし、動的コンテンツが大量、数千〜数万ページ、ユーザーごとにメタ情報が異なる、ISR / SSR / サーバー側認証が必要、といった要件では限界があります。その場合は SPA 構成を延長するだけでなく、Next.js、Remix、React Router framework mode などを比較した方がよいです。

### 3.12 PR 品質ゲートは整備済みだが、運用品質の検査は拡張余地がある

Workflow は `push` と `pull_request` の両方を契機とし、Checkout / Setup Node v4 と Node 24 を使用しています。PR では次の独立ジョブが実行されます。

- Prettier / ESLint / TypeScript
- Vitest
- アプリビルド、sitemap、prerender
- Storybook build

したがって、基本的な PR 品質ゲートはすでに存在します。ジョブを分割しているため失敗箇所が分かりやすく、並列化しやすい点も良い設計です。

今後、中〜大規模の運用品質へ引き上げる場合は次を検討できます。

- E2E と accessibility test
- test coverage threshold
- dependency audit / SAST
- bundle size budget と Web Vitals
- Visual Regression
- preview deployment と成果物の smoke test
- Renovate / Dependabot
- branch protection での必須チェック化

なお、ローカルと CI の再現性を高めるため、`packageManager` で Yarn のバージョンを固定し、lockfile と Yarn 設定を整合させることを推奨します。

### 3.13 CDK / Cognito インフラは現ブランチの評価対象外

README では AWS CDK 用コードを `for-aws-cdk` ブランチとして案内しており、現在のブランチには `cdk` ディレクトリがありません。そのため、User Pool の削除ポリシー、パスワードポリシー、MFA、監査ログ、CDK assertion test などの本番適合性は、このコードベースだけでは評価できません。

本番利用時は別ブランチを独立してレビューし、少なくとも次を確認する必要があります。

- User Pool と利用者データの RemovalPolicy
- MFA、password policy、account recovery
- 権限属性と認可の信頼境界
- 環境ごとの設定分離
- SES、監査ログ、脅威検知
- CDK synth と assertion / snapshot test

フロントエンドの実用性評価と、Cognito インフラの安全性評価は分離して扱うのが適切です。

### 3.14 依存バージョンの整合性を見直す余地がある

React 本体は 19 系ですが、`@types/react` と `@types/react-dom` は 18 系です。現在のビルドは成功していますが、将来 React 19 固有 API や型定義を利用すると不整合が表面化する可能性があります。

また Storybook 本体は runtime dependencies にあります。通常 Storybook は開発・ドキュメント用途なので、devDependencies 側に揃える方が依存の意味が明確です。

### 3.15 Node バージョンがフロントと CDK で異なる

ルートは Node 24 系に限定されていますが、README では CDK に Node 20 を要求しています。開発者が環境を切り替える必要があり、CI、ローカルセットアップ、monorepo 的な一括コマンドが複雑になります。

可能であれば CDK 依存を更新して Node バージョンを統一し、Volta、mise、asdf、`.nvmrc` などでバージョンを明示するとよいです。

---

## 4. 規模別の実用性

### 4.1 小規模プロジェクト

#### 想定

- 開発者 1〜3 人
- 画面数 5〜20
- API 数 10〜30
- Cognito による基本認証
- 複雑な権限なし
- SPA で問題なし
- 数年単位の継続開発でも変更頻度は低〜中

#### 評価: 十分実用的

現在の構成は小規模プロジェクトにかなり適しています。

- ディレクトリ構成が直感的
- 共通 UI が分離されている
- Storybook がある
- 認証がラップされている
- API 共通処理がある
- Redux Toolkit を適切に利用している
- strict TypeScript と強い Lint がある
- ページ単位の lazy loading がある
- Guard が分離されている
- ビルドと静的配信が簡単

小規模でも業務リリース前には次を推奨します。

1. API client、AuthProvider、Guard の境界テストを追加
2. 認証フローの E2E を最低 1 本追加
3. Cognito 環境変数の起動時検証
4. Root / Route Error Boundary を追加
5. 別ブランチの本番 Cognito / CDK 設定をレビュー
6. Yarn バージョンと lockfile の再現性を確保
7. 空の `component.tsx`、`util.ts` を機械的に作らない

これらを対応すれば、社内ツール、管理画面、会員制の小規模 SPA などには十分利用できます。

### 4.2 中規模プロジェクト

#### 想定

- 開発者 4〜10 人
- 画面数 20〜80
- 複数の業務領域
- API 数 30〜150
- 複数権限
- 数年間の継続開発
- CI/CD と回帰テストが必要

#### 評価: 改善を前提に実用可能

ルートの設定化、lazy loading、Guard 分離、API module 分割、Redux slice 分割に加え、ページテストと PR CI も整備されているため、中規模の入口には到達しています。

ただし、次を追加しないまま規模だけを増やすと保守性が急激に低下します。

1. API・認証・Router を中心とした単体・integration・E2E のテスト戦略
2. TanStack Query などによる server state 管理
3. OpenAPI ベースの API 型生成
4. AppError と表示文言の分離
5. feature ごとの application hook
6. role / permission モデル
7. エラー追跡、Web Vitals、API 失敗率などの監視
8. coverage、E2E、dependency audit、bundle budget を含む CI

現在のアーキテクチャを全面的に再設計せず、必要な部分を段階的に改善しながら運用した場合の目安は、画面数 30〜50、開発者 5〜8 人、ドメイン 2〜5 領域程度です。ただし、単純な CRUD ならより大きくでき、複雑な権限、リアルタイム、オフライン対応などがある場合はより早く限界が来ます。

### 4.3 大規模プロジェクト

#### 想定

- 開発者 10〜30 人以上
- 複数チーム
- 画面数 100 以上
- 複数バックエンド
- 複雑な認可
- 長期運用
- 一部独立リリース
- SLA、監査、セキュリティ要件あり

#### 評価: 現状のままでは厳しい

問題は React や Vite ではなく、境界と所有権が不足していることです。現在は全アプリが `components`、`lib`、`utils`、単一 Store、単一 Router、単一 AuthProvider、単一 API client という共有領域を参照します。この形で規模を増やすと、共有層が巨大な依存ハブになります。

大規模向けには、例えば次のような再設計が必要です。

```text
src/
├── app/
│   ├── bootstrap/
│   ├── providers/
│   └── routing/
├── domains/
│   ├── identity/
│   ├── account/
│   ├── billing/
│   └── content/
├── features/
│   ├── sign-in/
│   ├── edit-profile/
│   └── publish-article/
├── infrastructure/
│   ├── auth/
│   ├── http/
│   ├── analytics/
│   └── monitoring/
└── shared/
    ├── ui/
    ├── hooks/
    └── types/
```

さらに、次が必要になります。

- workspace / monorepo
- package 単位の public API
- dependency boundary lint
- CODEOWNERS
- ADR
- contract test
- design system package
- API generated client
- feature flags
- observability
- release strategy
- role / permission model
- security review
- bundle budget
- 必要に応じた SSR / BFF

大規模ではフォルダを増やすだけでは足りません。各チームが独立して変更できるように、依存方向、公開 API、所有者、テスト境界を制度化する必要があります。

---

## 5. 改善優先順位

### P0: 業務利用前に対応

1. Yarn バージョンと lockfile の再現性を確保
2. API client、AuthProvider、Guard の境界テストを追加
3. 認証フローの E2E を追加
4. 環境変数を起動時に検証
5. Root / Route Error Boundary を追加
6. 認証エラーを利用者向けメッセージへ変換
7. 別ブランチの Cognito / CDK 本番設定をレビュー

### P1: 中規模化する前に対応

1. API クライアントから Redux 依存を外す
2. server state ライブラリを導入
3. OpenAPI 型生成を導入
4. 認証ユースケースを hook へ分離
5. 権限モデルを role / permission へ拡張
6. feature 内ファイルを具体的な名前にする
7. 監視・エラートラッキングを追加

### P2: 大規模化を判断した時点で対応

1. domain 単位の境界へ再編
2. `utils` を廃止または縮小
3. package / workspace 分割
4. CODEOWNERS と公開 API 境界を導入
5. ADR を導入
6. SSR / BFF の必要性を再評価
7. チーム単位の独立リリース戦略を検討

---

## 6. 総合スコア

| 観点             | 評価   | コメント                                                   |
| ---------------- | ------ | ---------------------------------------------------------- |
| ディレクトリ構成 | 8/10   | 小〜中規模で理解しやすい                                   |
| 依存方向         | 7/10   | ESLint 制約は良いが、API から Redux への依存が強い         |
| ルーティング     | 8/10   | 設定化・lazy・Guard 分離済み                               |
| 認証             | 7/10   | ラップと Context は良い。イベント同期・エラー体系は不足    |
| API 設計         | 7/10   | client / modules 分離済み。型生成・server state 管理は不足 |
| 状態管理         | 7/10   | slice 分割は良いが、用途の境界が曖昧                       |
| UI 再利用性      | 8/10   | 標準属性・forwardRef・Storybook が良い                     |
| テスト           | 5/10   | ページテストは整備済み。API・認証・Router・E2E は拡充余地  |
| CI/CD            | 7/10   | PR で checker・test・build・Storybook build を実行         |
| インフラ         | 対象外 | CDK は別ブランチのため、このブランチだけでは評価不能       |
| 大規模拡張性     | 4/10   | ドメイン境界・所有権・package 境界が不足                   |

規模別の総合評価は次のとおりです。

- **小規模: 8〜8.5/10**
- **中規模: 7/10**
- **大規模: 4/10**

特に高く評価できるのは、ルート設定の分離、ページ単位 lazy loading、認証 Guard、API client / module 分離、Redux slice 分離、配置ルールの README 明文化がすでに行われていることです。

現在の最大の課題は、API・認証・UI 状態管理の密結合、画面境界に留まる feature、そして API・認証・Router など重要な境界のテスト不足です。次の投資先は大規模なフォルダ再編ではなく、API client の純化、server state、エラー体系、境界テストを推奨します。

---

## 7. 調査時の検証結果

- 現在の `package.json` には Vitest / Testing Library と test script が存在する
- 認証、エラー、Example ページを対象とするフロントエンドテストが存在する
- GitHub Actions は `push` と `pull_request` の両方を契機とし、checker、test、アプリ build、Storybook build を実行する
- CDK は現在のブランチには存在せず、README から別ブランチへ案内されている
- 調査環境では Yarn 4 と既存 lockfile / 未追跡 Yarn 設定が整合せず、`yarn test`、`yarn checker`、`yarn build:scripts` は起動前に失敗した

したがって、コード上はテストと PR 品質ゲートが整備されていますが、パッケージマネージャーのバージョン固定と lockfile の整合性を確保し、ローカルと CI の再現性を高める余地があります。また、テスト投資はページ正常系から API、認証、Router、ビルド成果物などの境界へ広げることを推奨します。
