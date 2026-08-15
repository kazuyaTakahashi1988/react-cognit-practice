# 画面一覧表

<br />

| No. | 画面タイトル              | パス                            | アクセス区分         | メタ情報                                                                                                                               |
| --: | ------------------------- | ------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| A00 | Form Example              | `/example/form_example`         | 公開                 | description: react-hook-form を使った入力フォームコンポーネントのサンプルページです。<br>robots: `index, follow`<br>og:type: `website` |
| A01 | Todo Example              | `/example/todo_example`         | 公開                 | description: 動的に項目追加できる TODO フォームのサンプルページです。<br>robots: `index, follow`<br>og:type: `website`                 |
| A02 | Modal Example             | `/example/modal_example`        | 公開                 | description: モーダルダイアログの表示と操作を確認できるサンプルページです。<br>robots: `index, follow`<br>og:type: `website`           |
| A03 | Accordion Example         | `/example/accordion_example`    | 公開                 | description: アコーディオンコンポーネントの利用例を確認できるサンプルページです。<br>robots: `index, follow`<br>og:type: `website`     |
| A04 | Dropdown Menu Example     | `/example/dropdownmenu_example` | 公開                 | description: ドロップダウンメニューの表示パターンを確認できるサンプルページです。<br>robots: `index, follow`<br>og:type: `website`     |
| A05 | Store Example             | `/example/store_example`        | 公開                 | description: ストアの更新と取得・表示の操作を確認できるサンプルページです。<br>robots: `index, follow`<br>og:type: `website`           |
| B00 | Sign In                   | `/auth/signin`                  | 未認証ユーザーのみ   | description: メールアドレスとパスワードでログインするページです。<br>robots: `index, follow`<br>og:type: `website`                     |
| B01 | Sign Up                   | `/auth/signup`                  | 未認証ユーザーのみ   | description: メールアドレスとパスワードでアカウントを作成するページです。<br>robots: `noindex, nofollow`<br>og:type: `website`         |
| B02 | Verification              | `/auth/verification`            | 未認証ユーザーのみ   | description: 確認コードを入力してアカウント認証を完了するページです。<br>robots: `noindex, nofollow`<br>og:type: `website`             |
| B03 | Sign Out                  | `/auth/signout`                 | 認証済みユーザーのみ | description: 現在のセッションからサインアウトするページです。<br>robots: `noindex, nofollow`<br>og:type: `website`                     |
| C00 | 404 Not Found             | `/error/404`                    | 公開                 | description: お探しのページは見つかりませんでした。<br>robots: `noindex, nofollow`<br>og:type: `website`                               |
| C01 | 500 Internal Server Error | `/error/500`                    | 公開                 | description: サーバー内部エラーが発生しました。<br>robots: `noindex, nofollow`<br>og:type: `website`                                   |

<br />

### アクセス区分

| 表記                 | 説明                                            |
| -------------------- | ----------------------------------------------- |
| 公開                 | 認証状態にかかわらずアクセス可能                |
| 未認証ユーザーのみ   | 認証済みの場合は `/auth/signout` へリダイレクト |
| 認証済みユーザーのみ | 未認証の場合は `/auth/signin` へリダイレクト    |

<br />

### 補足

- 画面タイトルは、ブラウザー上では原則として `{title} | {VITE_APP_SITE_NAME}` の形式で表示されます。
- OGP 画像は全画面で `VITE_APP_DEFAULT_OG_IMAGE` の設定値が使用されます。
- canonical URL はアクセス中のオリジンとパスから自動生成され、末尾の `/` は除去されます。
- `/` と `/example` は `/example/form_example` へリダイレクトされます。`/auth` は認証状態に応じて `/auth/signin` または `/auth/signout` へリダイレクトされます。
- 一覧は `src/router/routeConfig.tsx` と `src/components/layouts/pageMeta.tsx` の実装内容に基づきます。
