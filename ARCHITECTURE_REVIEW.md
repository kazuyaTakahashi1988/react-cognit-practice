# Architecture Review by Codex - 2026/09/01

## 総合結論

このコードベースは、**小規模プロジェクトでは十分実用的であり、中規模プロジェクトの初期段階までは良好に対応できる構成**です。

一方、現状のまま機能数・開発者数・API 数が増えると、次の点がボトルネックになります。

- `page.tsx` に UI、フォーム制御、API 呼び出し、状態更新が集まりやすい
- `utils` がサービス層・インフラ層・アプリケーション層を兼ねている
- API キャッシュ、再試行、キャンセル、データ同期の仕組みがない
- ルーティング、Redux Store、API モジュールが単一ファイルへ集約される
- ドメインモデルやユースケース層が存在しない
- Error Boundary、監視、E2E テスト、アクセシビリティ実装が不足している
- 設計書がテンプレートまたは `Dummy` のままで、コード上の規約を十分説明していない

実用レベルをまとめると、次の評価です。

| 規模   | 現状の実用性 | 評価                           |
| ------ | ------------ | ------------------------------ |
| 小規模 | 高い         | **そのまま実用可能**           |
| 中規模 | 中〜高       | **一定の改善を前提に実用可能** |
| 大規模 | 低い         | **構造的な再設計が必要**       |

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
├── components/   # 複数画面で再利用する UI
├── features/     # 画面・機能単位の実装
├── lib/          # 型、スタイル、静的定義
├── router/       # ルート定義、認証ガード
├── utils/        # 認証、API、Redux、GA、Provider
├── App.tsx
└── main.tsx
```

構造としては、厳密な Clean Architecture というより、次の考え方を組み合わせた構成です。

- Feature-based architecture
- Shared component architecture
- Provider pattern
- SPA のレイヤー分離
- Redux Toolkit によるグローバル状態管理
- React Context による認証状態管理

規模の小さい SPA としては、理解しやすく現実的な構成です。

---

## 2. アーキテクチャ的に良い点

### 2.1 `features` を画面・機能の境界としている

画面固有のコードを `src/features` にまとめ、共通 UI を `src/components` に分離している点は良好です。

例えばサインイン画面は、共通の `Button`、`Input`、`Layout` を利用しつつ、認証処理だけを `authHelper` から呼び出しています。この構成には次の利点があります。

- 画面を探しやすい
- 共有 UI と画面固有 UI の区別が分かりやすい
- ページ追加時の配置ルールを予想しやすい
- 画面ごとの削除・置換が比較的容易
- UI コンポーネントを Storybook に展開しやすい

さらに、ESLint で `features` への依存を原則として `router` に限定しているため、別機能から別機能へ無秩序に依存することを防いでいます。単なるフォルダー命名ではなく、**依存方向を静的解析で守ろうとしている**点で評価できます。

### 2.2 ルート定義が宣言的である

ルートには次の情報が集約されています。

- URL
- ページコンポーネント
- アクセス権限
- title
- description
- noindex
- OGP 設定

ルートを追加する際に複数ファイルを個別に修正しなくてよく、各画面は `React.lazy` で読み込まれるため、ルート単位のコード分割も実現されています。

`Router` 側では全ルートを `Suspense` で包み、遅延ロード中に共通のページローディングを表示しています。小〜中規模 SPA において、非常に分かりやすい実装です。

### 2.3 認証ガードがルートから分離されている

`AuthGuard` と `GuestGuard` が分離され、ルート定義の `access` 値から適切なガードを選択しています。

この方式には次の利点があります。

- 認証制御がルーティング境界に集約される
- ページ本体が認証判定から解放される
- `auth`、`guest`、`public` の意味が明確
- 認証確認中に誤った画面を一瞬表示することを防げる

特に、`isChecking` を独立した状態として持つことで、初期値の `false` を「未認証」と誤認する問題を避けています。

### 2.4 Provider 構成が一か所に集約されている

Redux と認証 Context を `AppRootProvider` で束ねています。`App.tsx` も次の役割に限定されています。

- GA 初期化
- Provider の配置
- BrowserRouter
- GlobalStyle
- GlobalLoading
- Router

Provider が増えても、アプリのエントリーポイントが過度に読みにくくなりにくい構成です。

### 2.5 API クライアントに横断処理が集約されている

API クライアントは以下を共通化しています。

- Base URL
- Bearer token 取得
- 共通 HTTP ヘッダー
- Axios 呼び出し
- エラー形式の正規化
- グローバルローディング
- 同時リクエスト数の管理

特に、ローディングを boolean ではなくカウンターとして扱っている点は良い設計です。リクエスト開始時に加算し、終了時に減算するため、並行リクエストの片方が先に完了してもローディング表示が消えません。

テストでも、2 つの同時リクエストが順番に完了した場合に `2 → 1 → 0` になることを確認しています。小規模アプリの共通 HTTP クライアントとしては、必要な基礎がよく揃っています。

### 2.6 TypeScript と ESLint の品質ゲートが比較的強い

TypeScript では以下が有効です。

- `strict`
- `noUnusedLocals`
- `noUnusedParameters`
- `noFallthroughCasesInSwitch`
- `isolatedModules`

ESLint には次のようなルールがあります。

- 型 import の強制
- 非 null アサーションの禁止
- unsafe type assertion の禁止
- 循環的・認知的複雑度の制限
- import 順序
- React Hooks
- JSX アクセシビリティ
- feature 依存制限

特に認知的複雑度と循環的複雑度をともに 10 へ制限している点は、関数肥大化に対する有効な安全策です。ただし、一部のルールは後述のとおり強すぎる面もあります。

### 2.7 テスト対象の選択が適切である

テストは単純なスナップショットだけではなく、アーキテクチャ上重要な境界を確認しています。

API クライアントについては次を検証しています。

- トークン付与
- オプション引き渡し
- Axios エラーの正規化
- 非 Axios エラーの再送出
- 401 レスポンス
- セッション取得失敗
- 並行リクエスト時のローディング

テスト用の `renderPage` も Redux、AuthContext、MemoryRouter を共通化しており、画面テストを追加しやすい構成です。

### 2.8 CI が一通り用意されている

CI では次が分離されています。

- Prettier / ESLint / TypeScript
- Vitest
- アプリの静的ビルド
- Storybook ビルド
- main ブランチからのデプロイ

静的解析だけではなく、Pull Request 時にアプリと Storybook の両方を実際にビルドしている点は良好です。

### 2.9 SEO・静的配信への配慮がある

SPA でありながら、画面単位で次の情報を生成しています。

- title
- description
- OGP
- Twitter Card
- canonical
- robots
- JSON-LD

さらに、ビルド後に各ルート用の HTML を生成しています。完全な SSR ではありませんが、単純な CSR のみより検索エンジンや SNS クローラーへ配慮されています。

---

## 3. 改善できる点

### 3.1 `page.tsx` に責務が集中しやすい

現在の `features` はフォルダーとして分かれていますが、実装の中心は依然として `page.tsx` です。

サインインページには、次が同居しています。

- フォーム初期化
- バリデーション
- ローカルエラー状態
- 認証 API 呼び出し
- ローディング操作
- 認証 Context 更新
- UI
- styled-components

フォーム例では、さらに API 呼び出しとエラー画面へのナビゲーションもページ本体が担っています。小規模では問題ありませんが、業務画面が複雑になると、1 ページが数百〜千行へ成長する典型的な構造です。

#### 改善案

```text
features/auth/signIn/
├── api.ts
├── model.ts
├── schema.ts
├── hooks/
│   └── useSignIn.ts
├── components/
│   └── SignInForm.tsx
├── page.tsx
└── index.ts
```

`page.tsx` は、ページ全体の組み立て、Layout 選択、feature hook と UI の接続に限定します。

### 3.2 空の `component.tsx`、`util.ts`、`type.ts` を先回り配置している

複数の feature で、これらのファイルはコメントしかありません。将来使うかもしれないファイルを一律に生成すると、次の問題が起きます。

- 実装があるファイルと空ファイルを区別しづらい
- 命名が抽象的すぎる
- `component.tsx` に複数コンポーネントが集まりやすい
- `util.ts` が雑多な関数置き場になりやすい
- ファイル数の割に責務が明確にならない

必要になった時点で、`SignInForm.tsx`、`useSignIn.ts`、`signInSchema.ts`、`signInService.ts` のような具体的な名前で追加する方がよいです。

### 3.3 `utils` の責務が広すぎる

`utils` の中には次が置かれています。

- AWS Amplify 設定
- 認証ユースケース
- 認証 Context
- Axios API クライアント
- API エンドポイント
- Redux Store / slice
- Provider
- GA
- アプリ初期化

これは一般的な「便利関数」の範囲を大きく超えています。中規模以上になると、`utils` が実質的な巨大サービス層になり、feature 固有処理と全体共通処理の境界が崩れます。

#### 改善案

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
│   ├── lib/
│   └── types/
└── features/
```

少なくとも `utils` を、アプリ全体の構成を置く `app`、外部サービスを置く `infrastructure` または `services`、純粋な共有関数を置く `shared/lib` へ分けるとよいでしょう。

### 3.4 API クライアントが Redux Store へ直接依存している

API クライアントは Redux Store を直接 import して dispatch しています。手軽な一方、次の問題があります。

- HTTP クライアントを Redux なしで再利用できない
- テストごとにグローバル Store が共有される
- Storybook、SSR、別アプリでの再利用が難しい
- API 層が UI 状態であるローディング表示を知っている
- 個別画面だけでローディングを制御したいケースに弱い

Axios interceptor からイベント通知する、Redux listener middleware を利用する、TanStack Query 等へリクエスト状態を任せる、といった方法が考えられます。

最小の改善なら、次のように依存を注入します。

```ts
createApiClient({
  onRequestStart,
  onRequestEnd,
  getAccessToken,
});
```

これにより API クライアントを Redux と Amplify から分離できます。

### 3.5 サーバー状態管理がない

現状は Axios を直接呼び出し、結果をその場で処理する方式です。データ取得画面が増えると、以下を毎回実装する必要があります。

- loading
- error
- retry
- cache
- refetch
- stale 判定
- request deduplication
- cancel
- pagination
- optimistic update
- mutation 後の再取得

中規模へ進むなら、TanStack Query または RTK Query の導入を検討すべきです。Redux Toolkit をすでに利用しているため、統一感を重視するなら RTK Query、UI とサーバー状態を明確に分けたいなら TanStack Query が自然です。

Redux は、複数画面をまたぐ UI 状態、クライアントだけに存在するアプリケーション状態、複雑なワークフロー状態に限定するのが理想です。

### 3.6 認証状態の更新モデルが弱い

認証 Provider はマウント時と、明示的に `refreshAuthState()` を呼んだときだけ状態を確認します。そのため、次のイベントへ自動追従しません。

- 別タブでのログアウト
- セッション期限切れ
- トークン更新失敗
- Amplify 側で発生した認証イベント
- 401 レスポンス
- アカウント無効化

また、`refreshAuthState` は Promise を返さないため、呼び出し側が更新完了を待てません。

#### 改善案

- Amplify Hub の認証イベントを購読する
- `refreshAuthState(): Promise<void>` にする
- `user` または認証情報を状態として保持する
- 401 時の統一したセッション無効化を行う
- 認証失敗理由を分類する
- `status: "checking" | "authenticated" | "anonymous"` の判別可能 Union を使う

boolean を 2 つ持つより、状態の不正な組み合わせを防ぎやすくなります。

### 3.7 API のエラーハンドリング方針が一貫しにくい

Axios エラーの場合は `{ success: false, error }` を返しますが、Axios 以外のエラーは throw します。呼び出し側は Result 型と例外の両方を扱う必要があり、画面数が増えると処理漏れを起こしやすくなります。

次のいずれかへ統一すべきです。

- 常に例外を throw し、Error Boundary または Query ライブラリで扱う
- 常に Result 型を返し、予期しないエラーも `unknown_error` に正規化する

業務アプリでは、次のような判別可能 Union が扱いやすいです。

```ts
type ApiError =
  | { type: "unauthorized"; status: 401 }
  | { type: "validation"; status: 422; fields: FieldErrors }
  | { type: "network"; message: string }
  | { type: "server"; status: number }
  | { type: "unknown"; cause: unknown };
```

### 3.8 認証情報をすべての API リクエストで取得している

明示的なアクセストークンがなければ、すべてのリクエストで `fetchAuthSession()` を呼びます。公開 API であっても認証セッションを問い合わせるため、認証が不要な画面でも Amplify への依存が発生します。

API 定義側で、次のように認証要否を明示するとよいでしょう。

```ts
request("GET", "/public/articles", { auth: "none" });
request("GET", "/profile", { auth: "required" });
```

`required`、`optional`、`none` の 3 状態があると実用的です。

### 3.9 ルート設定が大規模化すると単一ファイルへ集中する

現在のルート数では単一の `routeConfig.tsx` は読みやすいですが、50〜100 画面になると次の問題が起きます。

- コンフリクトが増える
- feature 担当者同士が同じファイルを編集する
- ネストルートが表現しにくい
- レイアウト継承が重複する
- 権限が `auth` / `guest` / `public` だけでは足りなくなる

#### 改善案

```text
router/
├── routes.tsx
├── authRoutes.tsx
├── exampleRoutes.tsx
├── adminRoutes.tsx
└── errorRoutes.tsx
```

大規模では role、permission、tenant、organization、feature flag、subscription plan 等を扱う可能性があり、`access: "auth"` だけでは表現力が不足します。

### 3.10 Error Boundary がない

`Suspense` は存在しますが、React のレンダリングエラーを捕捉する Error Boundary はありません。

`/error/500` ページを用意しても、レンダリング例外、lazy import 失敗、Provider 内部エラーが自動的にその画面へ遷移するわけではありません。少なくともアプリ全体とルート単位の 2 段階に設置し、本番では Sentry 等へ例外を送信することを推奨します。

### 3.11 UI コンポーネントのアクセシビリティが十分ではない

ESLint には `jsx-a11y` が入っていますが、動的コンポーネントは静的 Lint だけでは保証できません。

例えばモーダルでは、次の実装を追加する余地があります。

- `role="dialog"`
- `aria-modal="true"`
- タイトルとの `aria-labelledby`
- Escape キーによる閉じる操作
- フォーカストラップ
- 開いた際の初期フォーカス
- 閉じた際のフォーカス復帰
- 背景スクロール抑止

グローバルローディングにも `role="status"`、`aria-live`、読み上げ用テキストを追加すべきです。公共系・金融系・大企業向けでは、アクセシビリティは実用性評価に大きく影響します。

### 3.12 SEO 処理がクライアント実装とビルドスクリプトで重複している

メタ情報生成ロジックが React の `PageMeta` と Node.js の `prerender.mjs` の 2 か所にあります。

この状態では次の問題が起こり得ます。

- 片方だけ修正する
- title 生成ルールがずれる
- canonical URL の仕様がずれる
- テストを二重に用意する必要がある

DOM 操作と文字列置換そのものは分離しても、正規化ロジックは次のような純粋関数として共有すべきです。

```ts
createPageMetadata(route, pageMeta, siteConfig);
```

なお、現在の「プリレンダリング」は React 画面そのものの HTML 出力ではなく、タイトルと説明だけの簡易マークアップです。そのため、SSR や本格的な SSG と同等には評価できません。

### 3.13 設計ドキュメントが実装に追いついていない

`docs/01_全体設計書/README.md` は、現状では `Dummy` と責務についての注記だけです。一方、実コードには次の重要な設計判断があります。

- feature 依存制限
- 認証ガード
- API エラー方針
- Redux と Context の使い分け
- SEO プリレンダリング
- グローバルローディング
- Storybook 運用

これらがドキュメント化されていないため、新規参加者はコードと ESLint を読んで暗黙のルールを推測する必要があります。

中規模へ進む前に、依存方向、各ディレクトリの境界、状態管理の選択基準、API エラー方針、認証フロー、route 追加手順、Storybook 追加基準、テスト戦略、環境変数一覧、ADR を整備すべきです。

### 3.14 テスト構成は良いが、規模拡大に必要な層が不足している

現状のテストは重要箇所を押さえていますが、次が不足しています。

- E2E テスト
- 実ブラウザでの認証フロー
- API 契約テスト
- Visual Regression
- axe 等によるアクセシビリティ検査
- カバレッジ閾値
- MSW を使った画面と API の統合テスト
- 本番同等ビルドのスモークテスト
- lazy import 失敗時のテスト
- Error Boundary のテスト

中規模なら、Vitest + Testing Library、MSW、Playwright、axe-core、Storybook test runner または Visual Regression の組み合わせを推奨します。

### 3.15 Node / Yarn のバージョン管理に注意が必要

CI は `yarn install --immutable` を利用し、プロジェクトは Node 24 を必須としています。開発者環境と CI でパッケージマネージャーの世代が異なると lockfile 全体が書き換わる可能性があります。

次を明示的に統一すべきです。

- Yarn Classic と Yarn Berry のどちらを使うか
- `packageManager` フィールド
- `.yarn/releases` をコミットするか
- `nodeLinker` 設定
- CI とローカルの Yarn バージョン
- Node バージョン管理ファイル

### 3.16 一部の Lint ルールが設計判断を過度に固定する

複雑度制限は良い一方、`switch` を全面禁止している点は注意が必要です。

`switch` は判別可能 Union の網羅性チェックと相性がよく、状態機械や Reducer ではオブジェクトルックアップより安全になることがあります。

```ts
switch (state.status) {
  case "idle":
  case "loading":
  case "success":
  case "error":
  // ...
  default:
    return assertNever(state);
}
```

全面禁止より、用途に応じた例外を認めた方が、大規模な状態管理では保守性が高くなる場合があります。

---

## 4. プロジェクト規模別の実用性

### 4.1 小規模プロジェクト

#### 想定

- 1〜5 人程度
- 10〜30 画面程度
- 1 つの SPA
- API 数が少ない
- Cognito 認証
- 複雑な権限管理がない
- 複雑なサーバーキャッシュがない

#### 評価：実用的

現状の構成は、この規模に非常に適しています。

特に次が揃っています。

- Vite
- TypeScript strict
- React Router
- 認証ガード
- Redux Toolkit
- API クライアント
- Storybook
- Vitest
- ESLint / Prettier
- CI
- SEO メタ情報
- ルート単位コード分割

小規模でも、最低限 Error Boundary、モーダルとローディングのアクセシビリティ、API エラー方式の統一、空の feature ファイルの削減、全体設計書の更新、Yarn バージョンの固定は行いたいところです。

これらを整えれば、実案件の小規模 SPA として十分利用できます。

### 4.2 中規模プロジェクト

#### 想定

- 5〜15 人程度
- 30〜100 画面程度
- 複数の業務ドメイン
- API 数が数十〜数百
- 複数ロール
- 継続的な機能追加
- 並行開発
- 長期保守

#### 評価：改善を前提に実用可能

現状の feature 分割と依存制限は、中規模への良い出発点です。ただし、次を行わないまま規模を拡大すると苦しくなります。

- `utils` の解体
- route 定義のドメイン別分割
- Redux Store の feature 単位管理
- API の server-state 管理導入
- feature hook / service / component の分離
- API エラー型の体系化
- Error Boundary
- MSW と E2E
- 認証イベント同期
- 監視・ログ基盤
- アクセシビリティテスト
- ドキュメントと ADR

#### 中規模向けの推奨構成

```text
src/
├── app/
│   ├── providers/
│   ├── router/
│   ├── store/
│   └── config/
├── features/
│   ├── auth/
│   ├── article/
│   └── account/
├── entities/
│   ├── user/
│   └── article/
├── shared/
│   ├── api/
│   ├── auth/
│   ├── ui/
│   ├── hooks/
│   ├── types/
│   └── styles/
└── pages/
```

必ずしも Feature-Sliced Design を厳密に採用する必要はありませんが、`app`、`features`、`shared` の境界は明確にした方がよいでしょう。

### 4.3 大規模プロジェクト

#### 想定

- 15 人以上
- 100 画面以上
- 複数チーム
- 複数ドメイン
- 複雑なロール・権限
- 複数バックエンド
- 多言語
- マルチテナント
- 高度な監査・セキュリティ要件
- 数年以上の運用

#### 評価：現状のままでは不十分

React、Vite、Redux Toolkit など、採用技術そのものは大規模でも使えます。問題はライブラリではなく、**境界と運用設計**です。

現状では次が大規模化の障害になります。

- 単一アプリ・単一 Store
- グローバル Store を直接参照する API クライアント
- 単一 route 配列
- `utils` への横断処理集中
- ドメイン層がない
- 権限表現が 3 値のみ
- API 契約の自動生成がない
- feature API の公開境界がない
- E2E・契約テスト・監視がない
- 設計ドキュメントが実装を説明していない

#### 大規模化する場合に必要な再設計

1. ドメイン境界の定義
2. feature public API の導入
3. OpenAPI からの型・クライアント生成
4. server-state 管理
5. role / permission ベースの認可モデル
6. モジュール別 route 定義
7. Store の feature 単位注入
8. 監視・ログ・トレーシング
9. E2E と契約テスト
10. i18n
11. Design System
12. セキュリティヘッダー・CSP
13. モノレポまたはパッケージ分割の検討
14. ADR とオーナーシップ管理

最初からマイクロフロントエンドへ移行する必要はありません。まずは単一リポジトリ内のモジュラーモノリスとして境界を強化する方が安全です。

---

## 5. 改善優先順位

### P0：実運用前

1. Error Boundary を追加する
2. API エラー方針を統一する
3. モーダルのアクセシビリティへ対応する
4. 認証セッション失効時の統一処理を追加する
5. Node / Yarn バージョンを固定する
6. 本番監視・エラー通知を追加する

### P1：中規模化する前

1. `utils` を `app` / `shared` / `infrastructure` へ分割する
2. route 設定をドメイン単位に分割する
3. TanStack Query または RTK Query を導入する
4. `page.tsx` から hook / service / component を抽出する
5. MSW と Playwright を導入する
6. OpenAPI 由来の型生成を導入する
7. 認証状態を判別可能 Union へ変更する
8. 全体設計書と ADR を整備する

### P2：大規模化するとき

1. feature public API を導入する
2. entities / domain 層を導入する
3. 権限モデルを高度化する
4. Design System を独立させる
5. feature ownership を定義する
6. パッケージ境界を静的に検査する
7. モノレポ化を検討する
8. パフォーマンス予算と Bundle 分析を導入する

---

## 6. 総合評価

| 観点             | 評価 | コメント                                                  |
| ---------------- | ---- | --------------------------------------------------------- |
| ディレクトリ構成 | 4/5  | 小規模では明快。`utils` の責務が広い                      |
| 依存関係         | 4/5  | ESLint で feature 依存を制限している                      |
| ルーティング     | 4/5  | 宣言的でメタ情報・ガードを統合。大規模時は分割が必要      |
| 状態管理         | 3/5  | Redux と Context の使い分けは妥当だが server state がない |
| API 設計         | 3/5  | 共通化は良いが Redux・Amplify へ強く結合している          |
| 認証             | 3/5  | 基本フローは良い。期限切れ・イベント同期が不足している    |
| 型安全性         | 4/5  | strict と強い Lint ルールが有効                           |
| テスト           | 3/5  | 重要境界は検証。E2E・契約・a11y・coverage が不足している  |
| UI 再利用性      | 4/5  | 共通 UI と Storybook がある                               |
| アクセシビリティ | 2/5  | Lint はあるが動的 UI の実装が不足している                 |
| SEO              | 4/5  | SPA としては配慮あり。ただし本格 SSR ではない             |
| CI/CD            | 4/5  | 静的解析、テスト、ビルド、デプロイを用意している          |
| ドキュメント     | 2/5  | README はあるが全体設計書が実質未整備                     |
| 大規模適性       | 2/5  | 境界、データ層、運用基盤の再設計が必要                    |

**総評としては、よく整備された小規模 SPA テンプレートであり、中規模アプリの土台にもできます。**

特に、コード分割、認証ガード、API 共通化、厳格な静的解析、Storybook、CI まで揃っている点は評価できます。

一方で、フォルダーが分かれていることと、アーキテクチャ上の責務が分離されていることは同義ではありません。現在は `page.tsx` と `utils` に責務が集まりやすいため、**中規模へ進むタイミングで「feature 内部の分割」「外部サービスとの境界」「server state 管理」を導入することが最も重要**です。
