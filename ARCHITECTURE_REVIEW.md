# Architecture Review by Codex - 2026/6/29

このコードベースは、**React + Vite + TypeScript + React Router + Redux Toolkit + AWS Amplify/Cognito + styled-components + Storybook** を組み合わせた、学習・検証・小〜中規模アプリの土台としてはかなり整理された構成です。

特に、`src/components`・`src/features`・`src/lib`・`src/utils`・`src/router` に責務を分ける方針が README に明示されており、画面単位の実装を `features` に集約する意図も読み取れます。

一方で、現状のまま **大規模プロジェクトに拡張するには、いくつかの設計上の限界が早めに出そう** です。主な理由は、ルーティング・API・状態管理・型定義・認証・ページ実装が、まだ「アプリ全体で一枚岩に近い共有層」に寄っているためです。

私の評価を一言でまとめると：

> **小規模には十分実用的。中規模はルールを追加すれば実用可能。大規模は現状のままだと厳しく、ドメイン分割・API層分割・ルート分割・状態管理方針の再設計が必要。**

---

## 現在のアーキテクチャ概要

### 技術スタック

`package.json` から見ると、フロントエンド本体は以下の構成です。

- React 19
- Vite
- TypeScript
- React Router
- Redux Toolkit / React Redux
- AWS Amplify / Cognito
- Axios
- react-hook-form
- styled-components
- Storybook
- ESLint / Prettier / Husky

また、`build`・`lint`・`checker`・Storybook 関連の npm scripts も整備されています。

---

## 良い点

### 1. ディレクトリ構成が直感的で、学習・開発の入口として分かりやすい

README では、`components`・`features`・`lib`・`router`・`utils` の責務が明示されています。これは小規模〜中規模プロジェクトにおいて、メンバーが迷いにくい構成です。

特に良いのは、画面単位の実装を `features` 配下に置く方針です。たとえば以下のように、認証系・example 系・error 系が分かれています。

- `src/features/auth/signIn`
- `src/features/auth/signUp`
- `src/features/example/formExample`
- `src/features/error/404`

この形は、画面数が少ないうちは非常に扱いやすいです。

### 2. アプリルートの責務分離ができている

`App.tsx` は、以下のようにアプリ全体の Provider、Router、GlobalStyle、GlobalLoading を組み立てる役割に集中しています。

```tsx
<AppRootProvider>
  <BrowserRouter>
    <GlobalStyle />
    <GlobalLoading />
    <Router />
  </BrowserRouter>
</AppRootProvider>
```

この構成は良いです。

理由は、アプリ全体に必要な横断的関心事が、トップレベルにまとまっているためです。

- Provider 集約
- ルーティング
- グローバルスタイル
- グローバルローディング
- GA 初期化

また、`AppRootProvider` が `StoreProvider` と `AuthProvider` をまとめている点も、アプリルートを見通しやすくしています。

### 3. 認証状態を Context として切り出している

`AuthProvider` は Cognito の現在ユーザー取得処理を使い、`isSignedIn` と `refreshAuthState` を Context として提供しています。

これは良い設計です。

ページコンポーネントが Cognito の詳細を直接知りすぎず、`useAuth()` 経由で認証状態を扱えるためです。 `useAuth` も Provider 外で呼ばれた場合に明示的なエラーを投げるようになっています。

### 4. Amplify/Cognito のラッパー関数が用意されている

`signInHelper`・`signUpHelper`・`verifyHelper`・`signOutHelper` が用意され、Cognito の処理が `utils/authHelper` にまとまっています。

これは、画面側から直接 `aws-amplify/auth` を呼び出すよりも良いです。

例えば、将来 Cognito 以外に変更する場合でも、呼び出し側の影響範囲をある程度抑えられます。

### 5. グローバルローディングを API 処理と連動させている

API ヘルパーでは、リクエスト前に `loadingFlagUp()`、finally で `loadingFlagDown()` を dispatch しています。

また、Redux 側では `loadingFlagCount` をカウント方式で管理しており、複数リクエストが並行しても 0 未満にならないようにしています。

これは良い実装です。

単純な boolean ローディングだと、複数 API が同時に走ったときに「片方が終わっただけでローディングが消える」問題が起きがちです。カウント方式はその点を避けられます。

### 6. SEO / OGP / canonical / 構造化データを SPA 内で更新している

`PageMeta` は、ページごとに title、description、OGP、Twitter Card、robots、canonical、JSON-LD を更新する実装になっています。

SPA でここまでメタ情報を管理しているのは良い点です。

特に、以下を動的に upsert している点は丁寧です。

- description
- og:title
- og:description
- og:type
- og:url
- og:image
- twitter 系 meta
- robots / googlebot
- canonical
- structured data

### 7. ESLint ルールがかなり強めに整備されている

`.eslintrc.cjs` では、React、TypeScript、jsx-a11y、import、react-hooks、sonarjs、total-functions などが入っています。

さらに、以下のようなルールも設定されています。

- button type 強制
- console 制限
- type import 強制
- import 順序
- JSX props ソート
- cognitive complexity 上限
- complexity 上限
- max-depth
- no-else-return
- `features` の import 制限

これはアーキテクチャ的にも良いです。

単に「人間が気をつける」ではなく、Lint で構造を守ろうとしているため、プロジェクトが大きくなったときの崩壊をある程度防げます。

### 8. `features` 配下の依存方向を制限しようとしている

`.eslintrc.cjs` では、`src/features` 配下の実装を `src/router` 配下でのみ import 可能にする制限が入っています。

これはかなり良い考え方です。

`features` 同士が相互に import し始めると、中規模以降で依存関係が複雑になります。この制限は「feature は画面単位で独立させる」という方針を守る助けになります。

### 9. Storybook がある

Storybook 関連の依存と scripts があり、`stories` 配下に各 UI コンポーネントの stories も存在します。

UI コンポーネントを独立して確認できるのは、小規模だけでなく中規模以上でも有効です。

---

## 改善できる点・アーキテクチャ上の懸念

### 1. ルーティングが一箇所に集中しており、規模が大きくなると肥大化しやすい

現在、`src/router/index.tsx` がすべてのページを直接 import し、すべての Route を定義しています。

現状はページ数が少ないので問題ありません。

ただし、ページが 30、50、100 と増えていくと、このファイルは以下の問題を抱えやすいです。

- import が大量になる
- 認証制御が Route ごとに散らばる
- lazy loading しづらい
- route meta、breadcrumb、権限、layout などを紐づけにくい
- feature 単位でルートを追加しにくい

現状でも、認証ページでは `isSignedIn` による分岐が各 Route に直接書かれています。

#### 改善案

中規模以上では、以下のようにするとよいです。

```txt
src/router/
  index.tsx
  routes.tsx
  guards/
    AuthGuard.tsx
    GuestGuard.tsx
  routeConfig.ts
```

または feature 側に route 定義を持たせます。

```txt
src/features/auth/routes.tsx
src/features/example/routes.tsx
src/features/error/routes.tsx
```

ただし、現在の ESLint 制約では `features` の import を router に限定しているため、router が feature route を集約する形とは相性が良いです。

### 2. API 層が単一ファイルに集約されており、大規模化すると破綻しやすい

`src/utils/apiHelper/index.ts` は、axios request の共通処理と個別 API 関数が同じファイルに入っています。

現状は `testGetArticleApi` と `testPostApi` 程度なので問題ありません。

しかし、実 API が増えると、以下が問題になります。

- すべての endpoint が 1 ファイルに集まる
- 型定義も肥大化する
- auth API、user API、article API、admin API などの境界が曖昧になる
- API ごとのエラー処理や response 変換を置く場所がなくなる
- OpenAPI / Swagger 由来の自動生成コードとの統合がしづらい

#### 改善案

中規模以上なら、最低限以下のように分けたいです。

```txt
src/api/
  client.ts
  errors.ts
  types.ts
  modules/
    authApi.ts
    userApi.ts
    articleApi.ts
```

または feature ごとに API を colocate します。

```txt
src/features/articles/api.ts
src/features/articles/types.ts
src/features/articles/hooks.ts
```

大規模なら OpenAPI Generator / Orval / aspida / TanStack Query などを検討した方がよいです。

### 3. API ヘルパーが Redux store を直接 import している

`apiHelper` は `store` を直接 import し、API 実行時に loading action を dispatch しています。

これは小規模では便利ですが、中規模以上では結合度が高くなります。

問題は、API 層が Redux の存在を知っていることです。

その結果、以下のような課題が出ます。

- API クライアントを React 外、テスト、Node script などで再利用しにくい
- 状態管理を Redux から TanStack Query や Zustand に変えにくい
- API の責務と UI ローディングの責務が混ざる
- リクエスト単位のローディング、画面単位のローディング、グローバルローディングを分けにくい

#### 改善案

API クライアントは pure にして、ローディング制御は呼び出し側、または middleware/interceptor、あるいは data fetching library に寄せるのが望ましいです。

例：

```txt
src/api/client.ts       // axios instance only
src/api/interceptors.ts // auth token, error normalize
src/store/appSlice.ts   // global UI state
src/features/.../hooks.ts // loading/error management
```

### 4. Redux store が単一 slice で、今後の拡張に弱い

現在の store は `appSlice` 1 つで、state も `loadingFlagCount` のみです。

小規模では問題ありません。

ただし、今後以下のような状態が増えると、単一 slice はすぐに限界が来ます。

- user profile
- notification
- modal state
- permissions
- feature-specific filters
- cached entities
- form draft
- websocket state

#### 改善案

中規模なら slice 分割を早めに行うとよいです。

```txt
src/store/
  index.ts
  hooks.ts
  slices/
    appSlice.ts
    authSlice.ts
    notificationSlice.ts
```

さらに Redux を使うなら typed hooks もほしいです。

```ts
useAppDispatch();
useAppSelector();
```

現在は `useSelector` に `TypeSelectorState` を直接渡しています。

### 5. 認証状態の初期ロード中を表現できていない

`AuthProvider` は `isSignedIn` の初期値を `false` にし、マウント後に `getCurrentUser()` を呼んで状態を更新しています。

これにより、初回ロード時に以下の問題が起きる可能性があります。

- 実際はログイン済みなのに、一瞬未ログイン扱いになる
- `/auth/signout` のような認証必須ページで一瞬 `/auth/signin` に redirect される可能性がある
- 認証確認中の loading UI を出せない

#### 改善案

`isSignedIn: boolean` だけでなく、`isAuthChecking` や `status` を持つとよいです。

```ts
type AuthStatus = "checking" | "signedIn" | "signedOut";
```

そして router 側では checking 中に redirect 判定しないようにします。

### 6. 認証 helper の型ガードが少し緩い

`isSignInResponse` は、オブジェクトであり、`isSignedIn`・`nextStep`・`userId` のいずれかを持っていれば `TypeSignInResult` と見なします。

小規模では実害が出にくいですが、型安全性としてはやや緩いです。

例えば `isSignedIn` が boolean かどうかまでは確認していません。

#### 改善案

```ts
const isSignInResponse = (value: unknown): value is TypeSignInResult =>
  isObject(value) && typeof value.isSignedIn === "boolean";
```

ただし Amplify のレスポンス仕様に合わせて、`nextStep` も含めてより正確に定義するのが望ましいです。

### 7. `localStorage.clear()` は影響範囲が大きい

`signOutHelper` では `signOut()` 後に `localStorage.clear()` を呼んでいます。

これは危険になり得ます。

理由は、アプリが使うすべての localStorage だけでなく、同一 origin 上の他用途の localStorage も消す可能性があるためです。

#### 改善案

消すキーを限定した方が安全です。

```ts
localStorage.removeItem("xxx");
sessionStorage.removeItem("access_token");
```

また、Amplify が管理する認証情報との整合性も確認した方がよいです。

### 8. `sessionStorage` の `access_token` と Cognito 認証情報の関係が曖昧

API ヘルパーでは `accessToken` 引数がなければ `sessionStorage.getItem("access_token")` を Authorization header に使います。

しかし、Cognito の signInHelper 側では sessionStorage に `access_token` を保存している実装は見当たりません。

つまり、現在の構造だと以下が曖昧です。

- API 用 token はどこで取得するのか
- Cognito token と `access_token` の関係は何か
- token refresh はどうするのか
- 期限切れ時の再認証はどうするのか

#### 改善案

認証 token の取得・更新・注入は、API client の interceptor または auth service に閉じ込めるのがよいです。

Amplify を使うなら、`fetchAuthSession()` などを使って token を取得し、axios interceptor で付与する設計が候補です。

### 9. ページコンポーネントが UI・フォーム・API・画面ロジックを抱えやすい

`FormExample` は、フォーム初期値、validation、UI、API 呼び出し、エラーハンドリング、スタイルを 1 ファイルで持っています。

これは小規模では非常に分かりやすいです。

しかし、中規模以上ではページファイルが肥大化しやすいです。

#### 改善案

feature 配下を以下のように分けると拡張しやすくなります。

```txt
src/features/example/formExample/
  page.tsx
  FormExampleView.tsx
  useFormExample.ts
  schema.ts
  api.ts
  types.ts
  constants.ts
```

現在すでに `page.tsx`・`component.tsx`・`util.ts`・`type.ts` の雛形はありますが、実際には `page.tsx` に寄っている箇所があります。ファイル分割方針を明確化するとよいです。

### 10. `component.tsx` / `util.ts` / `type.ts` が空の feature が多く、運用ルールが曖昧に見える

いくつかの feature では `component.tsx`・`util.ts`・`type.ts` が存在しますが、空コメントのみのファイルがあります。

雛形としては分かりやすいですが、実運用では以下の問題が出ます。

- 何をどこに書くべきか迷う
- 空ファイルが増える
- 「page.tsx に全部書く」流れになりやすい
- component と util の責務が曖昧になる

#### 改善案

以下のような命名にすると意図が明確になります。

```txt
page.tsx         // route component
view.tsx         // presentational component
hooks.ts         // feature-specific hooks
schema.ts        // validation schema
api.ts           // feature-specific API wrapper
types.ts         // feature-local types
constants.ts     // feature constants
```

### 11. `lib/types` に型が集まりすぎる可能性がある

現在、`src/lib/types/index.ts` が `_apiType`・`_authType`・`_componentsType`・`_storeType` を再 export しています。

小規模では便利です。

ただし、中規模以上では `lib/types` が「なんでも型置き場」になりやすいです。

すでに `TypeFormExampleValues` が `_apiType.ts` に入っていますが、これは API 型というより form example の form values に近いです。

#### 改善案

型は基本的に利用箇所の近くに置き、複数 feature で共有するものだけ `shared` や `lib` に上げるとよいです。

```txt
src/features/example/formExample/types.ts
src/features/auth/types.ts
src/components/form/types.ts
src/api/types.ts
src/store/types.ts
```

### 12. `PageMeta` は丁寧だが、SPA の SEO としては限界がある

`PageMeta` は client side で meta tag を更新しています。

これは UI としては良いですが、SEO を重視するサイトでは限界があります。

検索エンジンや SNS クローラーによっては、初期 HTML の meta を重視するため、client side で後から更新した OGP が期待通り読まれない場合があります。

#### 改善案

本当に SEO / OGP が重要なら、以下の選択肢があります。

- Next.js / Remix など SSR 対応 framework に寄せる
- Vite SSR
- prerender script の精度向上
- route ごとの静的 HTML 生成

なお、README には `build:scripts` として sitemap / prerender が含まれているため、静的生成を意識している点は良いです。

### 13. React 19 と `@types/react` 18 の組み合わせが気になる

`dependencies` では React が `^19.2.4` ですが、`devDependencies` の `@types/react` は `^18.3.12`、`@types/react-dom` は `^18.3.1` です。

React 19 は型定義の前提が React 18 と異なる可能性があるため、長期的にはズレが問題になる可能性があります。

#### 改善案

React 19 を使うなら、型定義も React 19 対応に揃える方が安全です。

### 14. Node バージョン要件がかなり狭い

`engines` が `node >=24 <25` になっています。

これは環境を固定できるメリットがありますが、チーム開発や CI ではやや厳しい制約です。

一方で、README の CDK 手順では CDK 側は node 20.x と書かれており、フロントと CDK で Node バージョンが分かれています。

#### 改善案

フロントと CDK で必要 Node バージョンが違う場合は、`.nvmrc`・`.node-version`・Volta・mise などで明示すると運用しやすいです。

### 15. テスト戦略がまだ薄く見える

Storybook はありますが、アプリロジック・hooks・API helper・認証 helper の unit test / integration test は見当たりませんでした。

小規模では許容できますが、中規模以上では以下がほしくなります。

- Vitest
- React Testing Library
- MSW
- Playwright
- Storybook interaction test
- API helper の unit test
- auth guard の test

特に認証・ルーティング・API error handling は、回帰バグが起きやすい箇所です。

---

## 小規模・中規模・大規模での実用性

## 小規模プロジェクトでの評価

### 実用性

**かなり実用的です。**

画面数でいうと、目安として以下くらいまでは十分扱いやすいと思います。

- 5〜15画面程度
- API endpoint 10〜30個程度
- 開発者 1〜3人程度
- 認証ありの管理画面、LP、フォームサイト、社内ツール、小さめの SPA

### 理由

- ディレクトリ構成がシンプル
- Provider・Router・Component・Feature の位置が分かりやすい
- ESLint がしっかりしている
- Storybook がある
- Cognito 認証の基本がある
- グローバルローディングがある
- styled-components による UI 実装が完結している

### 小規模で特に良い点

小規模では、抽象化しすぎないことも重要です。

このコードベースは、API・Auth・Store・Router が素直に読めるため、学習コストが低いです。現在の `Router` も、画面数が少ないうちは一覧性が高く、むしろ分かりやすいです。

## 中規模プロジェクトでの評価

### 実用性

**改善を入れれば実用的です。**

目安としては以下くらいです。

- 15〜50画面程度
- API endpoint 30〜100個程度
- 開発者 3〜8人程度
- 認証・権限・ユーザー設定・複数ドメインを持つ業務アプリ

ただし、現状のまま拡大すると少しずつ苦しくなります。

### 中規模化で最初に改善すべき点

優先度順に挙げると以下です。

#### 優先度 A

1. API 層を module 分割する
2. router を route config / guard / lazy loading に分ける
3. auth に `checking` 状態を追加する
4. store を slice 分割できる構成に変える
5. feature 内の `page`・`view`・`hooks`・`types` の責務を明文化する

#### 優先度 B

6. 型定義を feature local に寄せる
7. API error の型と正常 response の型を明確に分ける
8. token 管理を Cognito / Amplify に合わせて整理する
9. テスト基盤を追加する
10. path alias を導入する

### 中規模での懸念ポイント

一番の懸念は、`utils` が便利置き場になりやすいことです。

現在、`utils` には以下が入っています。

- apiHelper
- appRootHelper
- authHelper
- gaHelper
- storeHelper

これ自体は悪くありませんが、機能が増えると `utils` が肥大化し、責務が曖昧になります。

中規模では、以下のように責務名で分けた方がよいです。

```txt
src/app/
src/router/
src/store/
src/api/
src/auth/
src/shared/
src/features/
```

## 大規模プロジェクトでの評価

### 実用性

**現状のままでは厳しいです。**

大規模の目安は以下です。

- 50画面以上
- API endpoint 100個以上
- 開発者 10人以上
- 複数チーム
- 複数ドメイン
- 権限管理が複雑
- 長期保守
- CI/CD・E2E・監視・feature flag が必要

### 大規模で厳しい理由

#### 1. ドメイン境界がまだ弱い

`features` はありますが、ビジネスドメインというより「画面」単位に近い構成です。

大規模では、例えば以下のような境界が必要になります。

```txt
features/
  users/
  organizations/
  billing/
  reports/
  settings/
  auth/
```

さらに、それぞれに以下が必要です。

```txt
api.ts
components/
hooks/
model/
schemas/
types.ts
routes.tsx
```

#### 2. shared / domain / app の層が未整理

現状は `components`・`lib`・`utils` が共有層になっています。

大規模では、共有層の粒度が重要です。

例えば以下の分離が必要になります。

```txt
src/app/       // アプリ初期化、Provider、store、router
src/shared/    // 汎用 UI、汎用 hooks、汎用 utils
src/entities/  // User, Article などのドメインモデル
src/features/  // ユースケース単位
src/pages/     // route に紐づくページ
```

これは Feature-Sliced Design に近い考え方です。

#### 3. API と状態管理の設計が大規模向けではない

API helper が Redux store を直接操作しているため、API 層・UI 層・状態管理層が結合しています。

大規模では、server state と client state を分けるのが重要です。

おすすめは以下です。

- server state: TanStack Query / SWR / RTK Query
- client state: Redux Toolkit / Zustand / Jotai
- form state: react-hook-form
- auth/session state: dedicated auth provider

現在は、server state 管理の仕組みはまだ薄く、API request 関数を直接呼ぶ形です。これは小規模にはシンプルですが、大規模では cache、retry、dedupe、pagination、invalidation がつらくなります。

#### 4. 権限・認可モデルがない

現在の router は `isSignedIn` だけで認証済み / 未認証を切り替えています。

大規模アプリでは、以下が必要になりやすいです。

- role
- permission
- tenant
- organization
- plan
- feature flag
- route-level access control
- component-level access control

その場合、`isSignedIn` だけでは足りません。

#### 5. テスト・CI 品質ゲートが不足しそう

ESLint は強いですが、大規模では以下も必要です。

- unit test
- integration test
- E2E test
- visual regression test
- accessibility test
- dependency audit
- bundle size check
- type coverage
- circular dependency check

現状の scripts では `checker` が Prettier + lint を実行する構成です。

これは良い出発点ですが、大規模では品質ゲートとしてはまだ不足します。

---

## 改善優先度つき提案

## 優先度 1: 認証状態に `checking` を追加する

現在は `isSignedIn` の初期値が `false` です。

これを以下のように変えると、初回ロード時の誤 redirect を防げます。

```ts
type AuthStatus = "checking" | "signedIn" | "signedOut";
```

router 側では `checking` 中は loading を出し、redirect 判定しないようにします。

## 優先度 2: API client と loading 管理を分離する

現在の API helper は request 実行と loading dispatch が密結合です。

中規模以上では、以下のように分離するのがおすすめです。

```txt
src/api/client.ts
src/api/request.ts
src/api/errors.ts
src/store/slices/loadingSlice.ts
```

さらに、API 単位の loading は TanStack Query に任せ、グローバル loading は本当に全画面ブロックが必要な処理だけに限定するとよいです。

## 優先度 3: router を guard と route config に分ける

現状は route 定義と guard 条件が同じファイルにあります。

以下のように分けると拡張しやすくなります。

```txt
src/router/
  index.tsx
  routeConfig.tsx
  guards/
    AuthGuard.tsx
    GuestGuard.tsx
```

認証制御は以下のように抽象化できます。

```tsx
<Route element={<GuestGuard />}>
  <Route path="/auth/signin" element={<SignIn />} />
</Route>

<Route element={<AuthGuard />}>
  <Route path="/auth/signout" element={<SignOut />} />
</Route>
```

## 優先度 4: feature の内部構造を標準化する

現在は `page.tsx`・`component.tsx`・`util.ts`・`type.ts` の雛形がありますが、実装は `page.tsx` に寄りやすい構造です。

おすすめは以下です。

```txt
featureName/
  page.tsx
  view.tsx
  hooks.ts
  api.ts
  types.ts
  constants.ts
  schema.ts
```

このルールを README または ARCHITECTURE.md に明記すると、中規模以上でもブレにくくなります。

## 優先度 5: 型定義を近くに置く

`lib/types` にすべて寄せると、規模が大きくなるほど依存が集中します。

共有型だけ `lib` / `shared` に置き、feature 固有型は feature に置くのがよいです。

## 優先度 6: store を将来の slice 分割前提にする

現在は単一 reducer です。

早めに以下の構成へ移行するとよいです。

```txt
src/store/
  index.ts
  hooks.ts
  slices/
    appSlice.ts
```

今は slice が 1 つでも、将来の増加に備えられます。

## 優先度 7: token 管理方針を明確化する

API helper は `sessionStorage.access_token` を見ていますが、Cognito helper はそこに token を保存していません。

以下を決めるべきです。

- Cognito token を API Authorization に使うのか
- token は毎回 Amplify から取るのか
- sessionStorage に保存するのか
- refresh は誰が担当するのか
- 401 の扱いはどうするのか

このあたりは中規模以上でかなり重要です。

## 優先度 8: テスト基盤を追加する

おすすめは以下です。

```txt
Vitest
React Testing Library
MSW
Playwright
```

特にテストしたい箇所は以下です。

- API helper の success/error
- loading count の増減
- AuthProvider の checking / signedIn / signedOut
- AuthGuard / GuestGuard
- form validation
- PageMeta の meta 更新

---

## 現状の実用レベルまとめ

| 規模   | 実用性 | 評価                                                           |
| ------ | -----: | -------------------------------------------------------------- |
| 小規模 |      ◎ | そのまま十分実用的                                             |
| 中規模 |      ○ | API・router・auth・store を整理すれば実用的                    |
| 大規模 |      △ | 現状のままでは厳しい。ドメイン分割と状態管理設計の再構築が必要 |

---

## 私ならこう育てます

### Phase 1: 現状を保ちつつ安全性を上げる

- AuthProvider に `checking` を追加
- typed Redux hooks を追加
- `localStorage.clear()` を限定削除に変更
- API error 型を整理
- React 19 と型定義のバージョン整合性確認

### Phase 2: 中規模対応

- router guard 導入
- API module 分割
- store slice 分割
- feature 内構成ルール策定
- tests 追加
- path alias 導入

### Phase 3: 大規模対応

- server state に TanStack Query / RTK Query 導入
- OpenAPI 由来の API client 自動生成
- permission / role / tenant 設計
- feature / domain / shared / app の層分け
- E2E / visual regression / accessibility CI
- route lazy loading / code splitting

---

## 最終評価

このコードベースは、**React + Cognito の練習用・テンプレート用・小規模 SPA の出発点としてはかなり良い** です。

特に良いのは以下です。

- 責務別ディレクトリ構成がある
- feature 単位の意識がある
- ESLint による構造制約がある
- Cognito 認証が helper 化されている
- グローバルローディングが実装されている
- PageMeta が丁寧
- Storybook がある

一方で、中規模以上を本格的に目指すなら、最初に直すべきは以下です。

- router の肥大化対策
- API 層の分割
- API と Redux store の密結合解消
- auth checking 状態の導入
- token 管理方針の明確化
- feature 内の責務分割
- テスト戦略の追加

結論としては、**「小規模は即戦力、中規模は少し整理すれば十分、大規模は再設計が必要」** という評価です。
