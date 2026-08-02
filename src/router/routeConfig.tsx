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
    access: "public", // ← 未認証 or 認証済みユーザーどちらもアクセス可の設定値
    component: lazy(() => import("../features/example/formExample/page")),
    path: "/example/form_example",
    pageMeta: {
      title: "Form Example",
      description:
        "react-hook-form を使った入力フォームコンポーネントのサンプルページです。",
      // ogImage: "/xxxx/xxxx.jpg",
      // ogType: "website" or "article",
      // noindex: boolean,
    },
  },
  {
    access: "public",
    component: lazy(() => import("../features/example/todoExample/page")),
    path: "/example/todo_example",
    pageMeta: {
      title: "Todo Example",
      description: "動的に項目追加できる TODO フォームのサンプルページです。",
    },
  },
  {
    access: "public",
    component: lazy(() => import("../features/example/modalExample/page")),
    path: "/example/modal_example",
    pageMeta: {
      title: "Modal Example",
      description:
        "モーダルダイアログの表示と操作を確認できるサンプルページです。",
    },
  },
  {
    access: "public",
    component: lazy(() => import("../features/example/accordionExample/page")),
    path: "/example/accordion_example",
    pageMeta: {
      title: "Accordion Example",
      description:
        "アコーディオンコンポーネントの利用例を確認できるサンプルページです。",
    },
  },
  {
    access: "public",
    component: lazy(
      () => import("../features/example/dropdownMenuExample/page"),
    ),
    path: "/example/dropdownmenu_example",
    pageMeta: {
      title: "Dropdown Menu Example",
      description:
        "ドロップダウンメニューの表示パターンを確認できるサンプルページです。",
    },
  },
  {
    access: "public",
    component: lazy(() => import("../features/example/storeExample/page")),
    path: "/example/store_example",
    pageMeta: {
      title: "Store Example",
      description:
        "ストアの更新と取得・表示の操作を確認できるサンプルページです。",
    },
  },
  /* ---------------------------------------------
   * ▽▽▽ auth 各ルート設定 ▽▽▽
   * --------------------------------------------- */
  {
    access: "guest", // ← 未認証ユーザーのみアクセス可の設定値
    component: lazy(() => import("../features/auth/signIn/page")),
    path: "/auth/signin",
    pageMeta: {
      title: "Sign In",
      description: "メールアドレスとパスワードでログインするページです。",
    },
  },
  {
    access: "guest",
    component: lazy(() => import("../features/auth/signUp/page")),
    path: "/auth/signup",
    pageMeta: {
      title: "Sign Up",
      description:
        "メールアドレスとパスワードでアカウントを作成するページです。",
      noindex: true,
    },
  },
  {
    access: "guest",
    component: lazy(() => import("../features/auth/verification/page")),
    path: "/auth/verification",
    pageMeta: {
      title: "Verification",
      description: "確認コードを入力してアカウント認証を完了するページです。",
      noindex: true,
    },
  },
  {
    access: "auth", // ← 認証済みユーザーのみアクセス可の設定値
    component: lazy(() => import("../features/auth/signOut/page")),
    path: "/auth/signout",
    pageMeta: {
      title: "Sign Out",
      description: "現在のセッションからサインアウトするページです。",
      noindex: true,
    },
  },
  /* ---------------------------------------------
   * ▽▽▽ error 各ルート設定 ▽▽▽
   * --------------------------------------------- */
  {
    access: "public",
    component: lazy(() => import("../features/error/404/page")),
    path: "/error/404",
    pageMeta: {
      title: "404 Not Found",
      description: "お探しのページは見つかりませんでした。",
      noindex: true,
    },
  },
  {
    access: "public",
    component: lazy(() => import("../features/error/500/page")),
    path: "/error/500",
    pageMeta: {
      title: "500 Internal Server Error",
      description: "サーバー内部エラーが発生しました。",
      noindex: true,
    },
  },
];
