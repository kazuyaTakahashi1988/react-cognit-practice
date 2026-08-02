import { lazy } from "react";

import type { AppRoute } from "../lib/types";

/* -----------------------------------------------
 * 各ルート一覧
 * ----------------------------------------------- */
export const routeConfig: AppRoute[] = [
  /* ---------------------------------------------
   * ▽▽▽ example 各ルート設定 ▽▽▽
   * --------------------------------------------- */
  {
    access: "public", // 未認証 or 認証済みユーザーどちらもアクセス可の設定値
    component: lazy(() => import("../features/example/formExample/page")),
    pageMeta: {
      title: "Form Example",
      description:
        "react-hook-form を使った入力フォームコンポーネントのサンプルページです。",
    },
    path: "/example/form_example",
  },
  {
    access: "public",
    component: lazy(() => import("../features/example/todoExample/page")),
    pageMeta: {
      title: "Todo Example",
      description: "動的に項目追加できる TODO フォームのサンプルページです。",
    },
    path: "/example/todo_example",
  },
  {
    access: "public",
    component: lazy(() => import("../features/example/modalExample/page")),
    pageMeta: {
      title: "Modal Example",
      description:
        "モーダルダイアログの表示と操作を確認できるサンプルページです。",
    },
    path: "/example/modal_example",
  },
  {
    access: "public",
    component: lazy(() => import("../features/example/accordionExample/page")),
    pageMeta: {
      title: "Accordion Example",
      description:
        "アコーディオンコンポーネントの利用例を確認できるサンプルページです。",
    },
    path: "/example/accordion_example",
  },
  {
    access: "public",
    component: lazy(
      () => import("../features/example/dropdownMenuExample/page"),
    ),
    pageMeta: {
      title: "Dropdown Menu Example",
      description:
        "ドロップダウンメニューの表示パターンを確認できるサンプルページです。",
    },
    path: "/example/dropdownmenu_example",
  },
  {
    access: "public",
    component: lazy(() => import("../features/example/storeExample/page")),
    pageMeta: {
      title: "Store Example",
      description:
        "ストアの更新と取得・表示の操作を確認できるサンプルページです。",
    },
    path: "/example/store_example",
  },
  /* ---------------------------------------------
   * ▽▽▽ auth 各ルート設定 ▽▽▽
   * --------------------------------------------- */
  {
    access: "guest", // 未認証ユーザーのみアクセス可の設定値
    component: lazy(() => import("../features/auth/signIn/page")),
    pageMeta: {
      title: "Sign In",
      description: "メールアドレスとパスワードでログインするページです。",
    },
    path: "/auth/signin",
  },
  {
    access: "guest",
    component: lazy(() => import("../features/auth/signUp/page")),
    pageMeta: {
      title: "Sign Up",
      description:
        "メールアドレスとパスワードでアカウントを作成するページです。",
      noindex: true,
    },
    path: "/auth/signup",
  },
  {
    access: "guest",
    component: lazy(() => import("../features/auth/verification/page")),
    pageMeta: {
      title: "Verification",
      description: "確認コードを入力してアカウント認証を完了するページです。",
      noindex: true,
    },
    path: "/auth/verification",
  },
  {
    access: "auth", // 認証済みユーザーのみアクセス可の設定値
    component: lazy(() => import("../features/auth/signOut/page")),
    pageMeta: {
      title: "Sign Out",
      description: "現在のセッションからサインアウトするページです。",
      noindex: true,
    },
    path: "/auth/signout",
  },
  /* ---------------------------------------------
   * ▽▽▽ error 各ルート設定 ▽▽▽
   * --------------------------------------------- */
  {
    access: "public",
    component: lazy(() => import("../features/error/404/page")),
    pageMeta: {
      title: "404 Not Found",
      description: "お探しのページは見つかりませんでした。",
      noindex: true,
    },
    path: "/error/404",
  },
  {
    access: "public",
    component: lazy(() => import("../features/error/500/page")),
    pageMeta: {
      title: "500 Internal Server Error",
      description: "サーバー内部エラーが発生しました。",
      noindex: true,
    },
    path: "/error/500",
  },
];
