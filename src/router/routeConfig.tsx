import { lazy } from "react";

import SignIn from "../features/auth/signIn/page";
import SignOut from "../features/auth/signOut/page";
import SignUp from "../features/auth/signUp/page";
import Verification from "../features/auth/verification/page";
import Error404 from "../features/error/404/page";
import Error500 from "../features/error/500/page";
import AccordionExample from "../features/example/accordionExample/page";
import DropdownMenuExample from "../features/example/dropdownMenuExample/page";
import FormExample from "../features/example/formExample/page";
import ModalExample from "../features/example/modalExample/page";
import StoreExample from "../features/example/storeExample/page";
import TodoExample from "../features/example/todoExample/page";

import type { AppRoute } from "../lib/types";

/* -----------------------------------------------
 * 各ルート一覧
 * ----------------------------------------------- */
export const routeConfig: AppRoute[] = [
  /* ---------------------------------------------
   * ▽▽▽ example 各ルート ▽▽▽
   * --------------------------------------------- */
  {
    access: "public", // ← 未認証 or 認証済みユーザーどちらもアクセス可の設定値
    component: lazy(() => Promise.resolve({ default: FormExample })),
    path: "/example/form_example",
  },
  {
    access: "public",
    component: lazy(() => Promise.resolve({ default: TodoExample })),
    path: "/example/todo_example",
  },
  {
    access: "public",
    component: lazy(() => Promise.resolve({ default: ModalExample })),
    path: "/example/modal_example",
  },
  {
    access: "public",
    component: lazy(() => Promise.resolve({ default: AccordionExample })),
    path: "/example/accordion_example",
  },
  {
    access: "public",
    component: lazy(() => Promise.resolve({ default: DropdownMenuExample })),
    path: "/example/dropdownmenu_example",
  },
  {
    access: "public",
    component: lazy(() => Promise.resolve({ default: StoreExample })),
    path: "/example/store_example",
  },
  /* ---------------------------------------------
   * ▽▽▽ auth 各ルート ▽▽▽
   * --------------------------------------------- */
  {
    access: "guest", // ← 未認証ユーザーのみアクセス可の設定値
    component: lazy(() => Promise.resolve({ default: SignIn })),
    path: "/auth/signin",
  },
  {
    access: "guest",
    component: lazy(() => Promise.resolve({ default: SignUp })),
    path: "/auth/signup",
  },
  {
    access: "guest",
    component: lazy(() => Promise.resolve({ default: Verification })),
    path: "/auth/verification",
  },
  {
    access: "auth", // ← 認証済みユーザーのみアクセス可の設定値
    component: lazy(() => Promise.resolve({ default: SignOut })),
    path: "/auth/signout",
  },
  /* ---------------------------------------------
   * ▽▽▽ error 各ルート ▽▽▽
   * --------------------------------------------- */
  {
    access: "public",
    component: lazy(() => Promise.resolve({ default: Error404 })),
    path: "/error/404",
  },
  {
    access: "public",
    component: lazy(() => Promise.resolve({ default: Error500 })),
    path: "/error/500",
  },
];
