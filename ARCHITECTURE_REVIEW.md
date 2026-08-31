# Architecture Review by Codex - 2026/8/10

## 総合結論

このリポジトリは、単なる React の学習用サンプルより一段進んでおり、**小規模な業務 SPA のひな型としては十分に実用的**です。

一方、現状は「画面と共通処理を整理したフロントエンド構成」であり、複雑な業務ドメインを長期間・複数チームで開発するための境界設計までは確立されていません。

| 規模   | 実用性 | 評価                                                                 |
| ------ | ------ | -------------------------------------------------------------------- |
| 小規模 | 高い   | 現状のままでも十分実用的                                             |
| 中規模 | 中〜高 | API・認証・状態管理の責務分離を進めれば実用的                        |
| 大規模 | 低〜中 | 現状の延長では厳しく、ドメイン境界・依存方向・運用設計の再構築が必要 |

端的に言うと、**個人〜数人で開発する、10〜30 ページ程度の認証付き SPA には適しています。数十人・複数チームで長期運用する大規模システムには、そのままでは適していません。**

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
- GitHub Actions
- 独自の sitemap / 静的プリレンダリング処理

ソースコードは、大まかに次のレイヤーへ分かれています。

```text
src/
├── components/   # 再利用 UI・レイアウト
├── features/     # 画面・ユースケース単位
├── lib/          # 型・スタイル等の静的な共通要素
├── router/       # ルーティング・Guard
├── utils/        # API、認証、Store、GA、Provider
├── App.tsx
└── main.tsx
```

この分類は README にも明記されており、新規参加者が最初に見る入口として機能しています。

---

## 2. アーキテクチャ的に良い点

### 2.1 `features` に画面固有コードをコロケーションしている

認証機能であれば、例えば次のようにページ単位で関連ファイルがまとまっています。

```text
features/auth/signIn/
├── page.tsx
├── component.tsx
├── type.ts
└── util.ts
```

画面固有コードを `features`、再利用可能な UI を `components` に置く考え方は理解しやすく、小〜中規模で特に有効です。変更時に追う範囲を限定しやすく、画面数が増えても関連コードが技術別フォルダへ散在しにくくなります。

一方、現在は `component.tsx` と `util.ts` が空であるケースもあり、「分割できる形は用意したが、実際の責務分離はまだ途中」という状態です。

### 2.2 アプリケーションルートが簡潔

`App.tsx` は次の責務に集中しています。

- アプリ全体の Provider
- Router
- Global Style
- Global Loading
- GA 初期化

ページ固有ロジックがルートに混ざっていないため、アプリ全体の構成を把握しやすいです。また、Redux Provider と Auth Provider を `AppRootProvider` にまとめ、Provider の深いネストを `App.tsx` に露出させていません。

将来的には `utils/appRootHelper` よりも `app/providers` のような名前の方が、アプリケーション構成要素であることを明確に表せます。

### 2.3 ルート定義がデータとして集約されている

ルート定義には次の情報が一箇所にまとまっています。

- `path`
- 認証区分
- ページコンポーネント
- title / description
- noindex

各ページは `lazy()` で読み込まれ、Router 側は設定配列を `map()` して Route を生成しています。

この構成には次の利点があります。

- ルート追加場所が明確
- 認証要否を宣言的に指定できる
- ページメタ情報をルートと一緒に管理できる
- sitemap / プリレンダリングとルート情報を連携しやすい
- Route JSX の重複を抑えられる
- ページ単位のコード分割を自然に適用できる

現状から 20〜30 ページ程度までは十分扱いやすい方式です。大規模化した場合は、一つの巨大な `routeConfig` を維持するより、ドメイン単位で定義して最後に合成する形が適しています。

### 2.4 認証 Guard がページから分離されている

`AuthGuard` と `GuestGuard` が独立し、ページ側で毎回認証判定を実装する必要がありません。

- `auth`: 認証済みユーザーのみ
- `guest`: 未認証ユーザーのみ
- `public`: 両方アクセス可能

認証状態確認中の表示、未認証時のサインインページ遷移、認証済みユーザーが guest ページへ来た場合の遷移が一箇所にまとまっています。Guard には、未認証、認証済み、確認中、アクセス可能な状態を対象とするテストも用意されています。

現在の三分類は小規模な一般ユーザー向けアプリには十分です。管理画面や組織別権限が入る場合は、次のようなモデルへの拡張が必要です。

```ts
type RouteAccess =
  | { kind: "public" }
  | { kind: "guestOnly" }
  | { kind: "authenticated" }
  | { kind: "roles"; roles: UserRole[] }
  | { kind: "permissions"; permissions: Permission[] };
```

ただし、現時点で先回りして導入する必要はありません。

### 2.5 Amplify / Cognito の認証状態を Context に隔離している

認証状態は `AuthProvider` にまとまり、画面は Amplify の `getCurrentUser()` を直接呼ばず Context 経由で利用できます。また、`isSignedIn` と `isChecking` を別々に管理し、認証確認中にゲストページが一瞬表示されるようなちらつきを防ぎやすくしています。

Provider の正常系、未認証、初期化中、失敗ケースにもテストがあります。

### 2.6 API 共通クライアントと個別 API が分かれている

HTTP の共通処理は `client.ts`、エンドポイント固有の関数は `modules` 以下に分かれています。共通クライアントは次を処理します。

- base URL
- 認証セッション取得
- Authorization header
- Axios 呼び出し
- API エラーの正規化
- グローバルローディング

個別 API は薄い関数になっており、呼び出し側が Axios 設定を毎回組み立てる必要がありません。

API の戻り値が `ok` で判別できる Result 型であることも良い設計です。4xx / 5xx を想定内の結果として扱いやすく、TypeScript の narrowing を利用できます。Axios 以外の想定外エラーは再 throw されるため、「通信エラーは結果、想定外エラーは例外」という意図も明確です。

### 2.7 ローディングを boolean ではなくカウンターで管理している

グローバルローディングは `true / false` ではなく、開始時に `+1`、終了時に `-1` するカウンター方式です。0 未満にならない保護もあります。

これにより、並行リクエストの一方が先に完了しただけでローディングが消える問題を回避できます。実際に、2 つの同時リクエストが完了するごとにカウンターが `2 → 1 → 0` になるテストもあります。

### 2.8 Redux Store が slice 単位に分かれている

Store 本体は reducer の集約に集中し、状態更新は slice に分離されています。`RootState` と `AppDispatch` も Store から導出されるため、Store 構成変更時に型定義を手作業で同期する必要がありません。Redux Toolkit の基本構成として素直です。

### 2.9 UI コンポーネントが標準属性と親和的

フォーム部品は React の標準属性や `forwardRef` を活用しており、React Hook Form の `register()` と接続しやすい設計です。独自 UI がフォームライブラリへ過度に密結合していません。

### 2.10 静的解析の品質基準が強い

TypeScript は `strict`、未使用変数・未使用引数の禁止などが有効です。ESLint には次が設定されています。

- React / React Hooks
- jsx-a11y
- TypeScript
- import 整合性・並び順
- SonarJS
- cognitive complexity
- cyclomatic complexity
- ネスト上限
- unsafe assertion 禁止
- type-only import
- feature import 制限

特に認知的複雑度と循環的複雑度を最大 10 に制限し、`features` を原則 Router 以外から import できないようにしている点は、依存ルールを開発者の注意だけでなくツールで守る設計として評価できます。

### 2.11 CI とローカル品質ゲートが整備されている

GitHub Actions では次が分離実行されています。

- Prettier / ESLint / TypeScript
- Vitest
- 本番ビルド / sitemap / プリレンダリング
- Storybook ビルド

ローカルの pre-commit hook でも Checker とテストが実行されます。小規模リポジトリとしては充実しており、品質基盤はこのプロジェクトの明確な長所です。

### 2.12 Storybook が UI カタログとして機能する

フォーム部品、ボタン、モーダル、アコーディオン、ドロップダウンなどの Story があり、再利用 UI の確認場所が用意されています。中規模以上ではデザイン仕様、アクセシビリティ確認、Visual Regression の基盤として発展させられます。

### 2.13 SEO / 静的配信への配慮がある

独自スクリプトにより、ルート別に次を生成しています。

- title / description
- canonical
- OGP / Twitter Card
- robots
- JSON-LD
- sitemap
- ルートごとの `index.html`

sitemap では `noindex` ページを除外しています。SPA の静的ホスティングで問題になりやすいメタ情報を意識した構成です。

---

## 3. 悪い点・改善できる余地

### 3.1 `utils` がアプリケーションの主要レイヤーを抱えている

現在の `utils` には API、認証、Redux Store、App Provider、GA が含まれます。これらは補助関数ではなく、アプリケーションの主要サブシステムです。

`utils` という名前は依存方向や責務を説明しないため、規模が増えると分類できないものをすべて置く場所になりがちです。中規模化するなら、例えば次の分類が候補です。

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
│   ├── types/
│   └── styles/
├── features/
└── domains/
```

現在の規模で一括移行する必要はありません。新しい機能を追加するときから、`utils` に新しい主要責務を増やさない方針が現実的です。

### 3.2 API クライアントが Redux Store に直接依存している

API クライアントは `store` と loading action を直接 import し、リクエスト内部で dispatch しています。

```text
API infrastructure
    ↓
Redux global store
    ↓
Global loading UI
```

この構成には次の問題があります。

- API クライアントを React / Redux 外で再利用しにくい
- 単体テストにグローバル Store が必要
- バックグラウンド更新にも全画面ローディングが出る可能性がある
- ボタン単位・フォーム単位の loading に発展させにくい
- Redux から別の状態管理手段へ移行しにくい
- cache、retry、deduplication、invalidation の責務が不明確

中規模化する場合は HTTP クライアントを純化し、loading を application hook 側で持たせる方がよいでしょう。サーバー状態が増えるなら、TanStack Query や RTK Query も候補になります。

- Redux: クライアント状態
- Query ライブラリ: サーバー状態
- React Hook Form: フォーム状態

と分けると責務が明確になります。

### 3.3 認証ページにユースケースと UI が混在している

サインインページは一つのファイルで次を担当しています。

- React Hook Form の初期化
- フォーム状態と validation
- 認証 API 呼び出し
- Auth Context 更新
- Redux loading
- エラー変換
- JSX
- styled-components

現状の行数なら読めますが、MFA、強制パスワード変更、CAPTCHA、SSO、セッション失効などが追加されると急速に肥大化します。

複雑になった feature だけ、次のように分けるのが適切です。

```text
features/auth/sign-in/
├── SignInPage.tsx
├── SignInForm.tsx
├── useSignIn.ts
├── schema.ts
├── types.ts
└── constants.ts
```

重要なのはファイル数ではなく、Page は画面構成、Form は表示と入力、Hook はユースケース実行と状態遷移、Auth API は Cognito との通信、Domain は認証ルール、という責務分離です。

### 3.4 `component.tsx` / `util.ts` という抽象的な名前

空ファイルであること自体の実害は小さいものの、`component.tsx` や `util.ts` は内容を予測できない名前です。

規模が大きくなったときは、`SignInForm.tsx`、`useSignIn.ts`、`mapAuthError.ts`、`signInSchema.ts`、`passwordPolicy.ts` のような責務ベースの名前が適しています。将来使うかもしれない空ファイルを機械的に用意するより、実際に分割が必要になった時点で追加する方が構造上のノイズを減らせます。

### 3.5 feature の境界が「画面」であり「業務ドメイン」ではない

現在の認証機能は `signIn`、`signUp`、`signOut`、`verification` のページ単位です。小規模では非常に分かりやすい一方、規模が増えると次がページ間で共有されます。

- email validation
- password policy
- Cognito error mapping
- Cognito `nextStep` の解釈
- verification 状態と再送処理
- 認証後リダイレクト
- セッション失効処理

中〜大規模では、業務ルールと画面ユースケースを分離する余地があります。

```text
domains/auth/
├── model/
├── policy/
├── errors/
└── types/

features/auth/
├── sign-in/
├── sign-up/
└── verify/

infrastructure/auth/
└── amplifyAuthGateway.ts
```

ただし、現状で導入すると過剰設計になり得ます。重複や仕様の複雑化が実際に始まった段階で移行するのが適切です。

### 3.6 AuthProvider が認証エラーをすべて「未認証」に変換している

`getCurrentUser()` の失敗は理由を問わず `false` になります。そのため、本当に未認証、ネットワーク障害、Amplify 設定ミス、Cognito 障害、SDK の予期しないエラーを区別できません。

小規模サービスでは単純で扱いやすい一方、業務アプリでは障害時にログイン画面へ戻されるだけだと、利用者がパスワードの問題と誤解する可能性があります。中規模以上では、少なくとも次の状態が望ましいです。

```ts
type AuthState =
  | { status: "checking" }
  | { status: "authenticated"; user: User }
  | { status: "anonymous" }
  | { status: "error"; error: AuthInitializationError };
```

また、`refreshAuthState()` が連続して呼ばれた場合の競合制御や、Amplify Hub の auth event、別タブのサインアウト、API の 401 への追従も将来的な検討事項です。

### 3.7 API クライアントは基本機能に留まる

基本的なリクエスト、認証ヘッダー、エラー正規化には対応していますが、中〜大規模で必要になりやすい次の機能はまだありません。

- timeout 方針
- AbortSignal / キャンセル
- retry / 429 対応
- 401 時のセッション更新
- correlation ID
- observability / エラー監視
- API schema からの型生成
- runtime response validation
- cache / deduplication
- idempotency key
- エラーコードから画面メッセージへの変換層

特に `TResponse` はコンパイル時の型であり、実際のレスポンスがその型であることを実行時には保証しません。大規模システムなら OpenAPI からクライアントを生成し、必要に応じて外部境界を runtime validation する方法が適しています。

### 3.8 グローバルローディング一辺倒では UX が伸びにくい

カウンター方式自体は優れていますが、検索候補取得、一覧の再取得、自動保存、Like、バックグラウンド refresh まで全画面ローディングにすると操作感が悪化します。

次のように用途を分けるのが望ましいです。

- 画面遷移: ページローディング
- 初期表示: skeleton
- フォーム送信: submit button loading
- 部分更新: コンポーネント単位 loading
- バックグラウンド更新: 原則ブロックしない
- アプリ全体を止める処理: global loading

### 3.9 テストは良好だが、戦略としては小〜中規模向け

認証、Router、API、Store、各サンプルページのテストがあり、小規模アプリの回帰防止としては実用的です。一方、次の拡張余地があります。

#### カバレッジの可視化

coverage コマンドや最低カバレッジ基準はありません。カバレッジ率自体を目的にすべきではありませんが、未テスト領域を把握するレポートは有効です。

#### E2E テスト

Playwright / Cypress 等による E2E は見当たりません。特に認証付きアプリでは、サインアップ、確認コード、サインイン、認証必須ページ、サインアウト、セッション失効、静的ホスティング上の直リンク、404、API 障害表示をブラウザレベルで保証したいところです。

#### ビルドスクリプトのテスト

sitemap と prerender は CI で実行されていますが、生成内容の専用テストはありません。正規表現による HTML 編集は構造変更の影響を受けやすいため、canonical、noindex、title、JSON-LD、sitemap 除外、HTML escaping、全ルートの出力先を検証すると安全です。

#### アクセシビリティ / Visual Regression

Storybook はありますが、axe 等の自動アクセシビリティ検査や画像差分は品質ゲートになっていません。モーダルのフォーカス制御、ドロップダウンのキーボード操作、フォームのエラー通知などを優先すると効果的です。

### 3.10 現在のプリレンダリングは完全な SSR / SSG ではない

生成されるルートごとの HTML 本文は、実際の React ページコンポーネントをレンダリングしたものではなく、タイトルと説明文を持つ簡易マークアップです。

したがって、OGP、title / description、canonical、クローラー向けの最低限の本文、ルート別静的 HTML は改善しますが、次は提供しません。

- 実ページのサーバーレンダリング
- React コンポーネント由来の本文 HTML
- サーバーデータ取得
- SSR cache
- streaming
- hydration 前の完全表示

SEO や初期表示性能が主要要件になるなら、React Router の Framework Mode、Next.js、Remix 等を比較する余地があります。

### 3.11 Error Boundary と可観測性が弱い

ページの遅延ロードやレンダリング例外を受け止めるアプリケーションレベルの Error Boundary が明確ではありません。`Suspense` はローディング状態の扱いであり、例外処理ではありません。

実運用では次を検討すべきです。

- アプリ全体 / ルート単位の Error Boundary
- chunk load failure の復旧
- Sentry 等へのエラー送信
- 利用者向けの再読み込み導線
- request ID / user ID / route のログ付加
- PII を除去した監視
- Web Vitals と API 失敗率の計測

小規模なサンプルでは必須ではありませんが、中規模以上の本番運用では優先度が高い項目です。

### 3.12 環境変数の起動時検証がない

環境変数が不足した場合、空文字などで起動し、認証操作や API 呼び出しの時点で分かりにくいエラーになる可能性があります。Zod 等で環境変数を起動時に検証し、設定不足を fail fast で発見できるようにすると安全です。

### 3.13 デプロイ方式は大規模運用向けではない

main ブランチへの push 後、FTP でアプリと Storybook を配信しています。小規模サイトには簡単で有効ですが、規模が大きくなると次が課題になります。

- immutable artifact の管理
- staging / production の昇格
- rollback
- preview environment
- CDN cache invalidation
- provenance / SBOM
- デプロイ承認
- Blue-Green / Canary
- 環境ごとの secret 管理
- Storybook の公開範囲

Storybook に業務固有データや内部 UI が増える場合は、一般公開しない運用も検討すべきです。

### 3.14 Node 24 固定は再現性にはよいが、更新方針が必要

ルートと CI が Node 24 で揃っている点は良好です。一方、狭いバージョン範囲は開発環境やホスティング側が追いついていない場合に導入障壁になります。Node の更新方針、Yarn バージョン、Corepack の利用方法、Renovate / Dependabot、LTS 追従方針を明示すると運用しやすくなります。

### 3.15 CDK / Cognito インフラは現ブランチの評価対象外

README では AWS CDK 用コードを別ブランチとして案内しています。そのため、User Pool の RemovalPolicy、MFA、password policy、account recovery、監査ログなどの本番適合性は、このコードベースだけでは評価できません。

フロントエンドの実用性評価と Cognito インフラの安全性評価は分離し、本番利用前に別途レビューする必要があります。

---

## 4. プロジェクト規模別の実用性

### 4.1 小規模プロジェクト

#### 想定

- 開発者 1〜5 人
- 画面数 10〜30
- 単一 SPA
- 認証方式が一つ
- API 数が数十程度
- 複雑な権限管理がない
- 1 チームが全体を把握できる

#### 評価: 十分実用的

現状の強みが最も活きる規模です。

- feature 単位でページを探しやすい
- 共通コンポーネントが分離されている
- 認証 Guard と API クライアントがある
- Redux と Storybook がある
- 自動テストと CI がある
- sitemap / プリレンダリングがある

この規模で Clean Architecture や複雑な Domain 層を先に導入すると、むしろ開発速度が落ちます。

業務投入前には、Error Boundary、主要認証フローの E2E、環境変数検証、エラー監視、API timeout / cancel、本番ログ方針、セキュリティヘッダーの確認を推奨します。

### 4.2 中規模プロジェクト

#### 想定

- 開発者 5〜20 人
- 画面数 30〜100
- 複数の業務領域
- API 数が増える
- role / permission がある
- 複数人が同時に別機能を開発
- 数年以上運用する

#### 評価: 改善を前提に実用可能

現状を土台として使用できますが、そのまま機能を追加し続けると次がボトルネックになります。

- `utils` の肥大化
- API と Redux の密結合
- ページ内へのユースケース集中
- 画面境界だけの feature
- 単一 `routeConfig`
- グローバルローディング偏重
- 認証エラー状態の単純化
- server state 管理不足
- E2E / 可観測性不足

中規模化までには、次の順で改善するのが効果的です。

1. Error Boundary、監視、API timeout、認証エラー区別、主要 E2E を追加
2. API クライアントから Store dispatch を外し、server state 管理方針を決める
3. 複雑なページのみ UI と application hook を分離する
4. `app`、`infrastructure`、`shared`、`domains`、`features` の責務を明文化する
5. role / permission、API 型生成、依存方向の lint を必要に応じて追加する

### 4.3 大規模プロジェクト

#### 想定

- 開発者 20 人以上
- 複数チーム
- 画面数 100 以上
- 多数の業務ドメイン
- 複雑な認可
- 複数バックエンド
- 長期保守
- 高い監査・可用性要件

#### 評価: 現状の延長では厳しい

React、Vite、Redux 等の技術選択そのものが問題なのではありません。主な問題は、チーム間・ドメイン間の境界を構造として表せていないことです。

大規模では次のようなドメイン境界が必要になります。

```text
domains/
├── accounts/
├── orders/
├── billing/
└── inventory/
```

各ドメインには公開エントリポイントを設け、内部ファイルを自由に import させないようにします。さらに、次が必要です。

- package / domain 単位の公開 API
- dependency boundary lint
- CODEOWNERS
- ADR
- contract test
- design system package
- API generated client
- feature flags
- observability
- release / rollback strategy
- role / permission model
- security review
- bundle budget
- 必要に応じた SSR / BFF

大規模ではフォルダを増やすだけでは足りません。各チームが独立して変更できるよう、依存方向、公開 API、所有者、テスト境界を制度化する必要があります。

単一 SPA / 単一 source tree をそのまま拡大するより、まずモジュラーモノリスとして境界を定義し、その後必要に応じて monorepo 化する方が安全です。マイクロフロントエンドは、チームごとの独立デプロイが本当に必要になった段階で検討すべきです。

---

## 5. 推奨ロードマップ

### フェーズ 1: 現状の良さを維持したまま本番耐性を上げる

1. Root / Route Error Boundary を追加
2. Sentry 等の監視を追加
3. API timeout / AbortSignal を追加
4. 環境変数 schema validation を追加
5. 認証フローの E2E を最低 1 本追加
6. build scripts の生成物テストを追加
7. 別ブランチの Cognito / CDK 本番設定をレビュー

### フェーズ 2: 中規模化に備える

1. `utils` を `app` / `infrastructure` / `shared` に段階移行
2. API クライアントから Redux dispatch を削除
3. Query ライブラリの採否を決定
4. 複雑な feature に application hook を導入
5. 認証エラーを型付き状態として扱う
6. OpenAPI 等による API 型生成を導入
7. role / permission モデルを導入

### フェーズ 3: 複数チーム化に備える

1. domain 境界を定義
2. 公開エントリポイントを定義
3. ESLint で依存方向を強制
4. ADR と CODEOWNERS を導入
5. Visual Regression / E2E / bundle budget を CI に追加
6. artifact ベースのデプロイと rollback を整備
7. SSR / BFF / monorepo の必要性を再評価

---

## 6. 総合評価

| 観点             | 評価   | コメント                                                       |
| ---------------- | ------ | -------------------------------------------------------------- |
| ディレクトリ構成 | 8/10   | 小〜中規模で理解しやすい                                       |
| 依存方向         | 7/10   | ESLint 制約は良いが、API から Redux への依存が強い             |
| ルーティング     | 8/10   | 設定化・lazy load・Guard 分離ができている                      |
| 認証             | 7/10   | Context 隔離は良いが、障害状態・イベント同期は改善余地あり     |
| API 設計         | 7/10   | client / modules 分離済み。型生成・server state は改善余地あり |
| 状態管理         | 7/10   | slice と loading counter は良いが、用途境界が曖昧              |
| UI 再利用性      | 8/10   | 標準属性・forwardRef・Storybook が良い                         |
| テスト           | 7/10   | 主要境界のテストあり。E2E・生成物・a11y は拡張余地あり         |
| CI/CD            | 7/10   | checker・test・app build・Storybook build を実行               |
| インフラ         | 対象外 | CDK は別ブランチのため、このブランチだけでは評価不能           |
| 大規模拡張性     | 4/10   | ドメイン境界・所有権・package 境界が不足                       |

規模別の総合評価は次のとおりです。

- **小規模: 8〜8.5/10**
- **中規模: 7/10**
- **大規模: 4/10**

特に評価できるのは、feature コロケーション、ルート設定の分離、ページ単位の lazy loading、認証 Guard、API client / module 分離、Redux slice、loading counter、強い静的解析、テスト、Storybook、CI、静的配信への配慮です。

現在の最大の課題は、API・認証・UI 状態管理の密結合、画面境界に留まる feature、`utils` への主要責務の集中、E2E・Error Boundary・可観測性の不足です。

次の投資先は大規模なフォルダ再編ではなく、**API client の純化、認証エラー状態の改善、Error Boundary、監視、E2E、環境変数検証**を推奨します。それらを段階的に整備すれば、中規模 SPA の基盤として十分に発展させられます。

---

## 7. 調査時の検証結果

2026/8/10 のレビュー時に、次を確認しました。

- `package.json` に Vitest / Testing Library と test script が存在する
- 認証、Router、API、Store、各サンプルページのテストが存在する
- GitHub Actions が checker、test、アプリ build、Storybook build を実行する
- `yarn test` は 17 ファイル・35 テストすべて成功した
- `yarn checker` は Prettier / ESLint / TypeScript をすべて通過した
- `yarn build:scripts` は Vite build、7 URL の sitemap、12 ルートの prerender に成功した
- CDK は現在のブランチには存在せず、README から別ブランチへ案内されている

以上から、このコードベースは**よく整備された小規模 SPA であり、中規模 SPA の入口にも到達している**と評価します。一方、大規模化にはフォルダ数を増やすだけでなく、ドメイン境界、依存方向、公開 API、所有権、運用基盤を明示的に設計する必要があります。
