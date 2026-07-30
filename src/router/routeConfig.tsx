import { lazy } from "react";

export type RouteAccess = "auth" | "guest" | "public";
export type AppRoute = {
  access: RouteAccess;
  component: React.LazyExoticComponent<React.ComponentType>;
  path: string;
};

// ページ追加時はこの配列に1行足します。実体はアクセス時にだけ読み込まれます。
export const routeConfig: AppRoute[] = [
  {
    access: "public",
    component: lazy(() => import("../features/example/formExample/page")),
    path: "/example/form_example",
  },
  {
    access: "public",
    component: lazy(() => import("../features/example/todoExample/page")),
    path: "/example/todo_example",
  },
  {
    access: "public",
    component: lazy(() => import("../features/example/modalExample/page")),
    path: "/example/modal_example",
  },
  {
    access: "public",
    component: lazy(() => import("../features/example/accordionExample/page")),
    path: "/example/accordion_example",
  },
  {
    access: "public",
    component: lazy(
      () => import("../features/example/dropdownMenuExample/page"),
    ),
    path: "/example/dropdownmenu_example",
  },
  {
    access: "public",
    component: lazy(() => import("../features/example/storeExample/page")),
    path: "/example/store_example",
  },
  {
    access: "guest",
    component: lazy(() => import("../features/auth/signIn/page")),
    path: "/auth/signin",
  },
  {
    access: "guest",
    component: lazy(() => import("../features/auth/signUp/page")),
    path: "/auth/signup",
  },
  {
    access: "guest",
    component: lazy(() => import("../features/auth/verification/page")),
    path: "/auth/verification",
  },
  {
    access: "auth",
    component: lazy(() => import("../features/auth/signOut/page")),
    path: "/auth/signout",
  },
  {
    access: "public",
    component: lazy(() => import("../features/error/404/page")),
    path: "/error/404",
  },
  {
    access: "public",
    component: lazy(() => import("../features/error/500/page")),
    path: "/error/500",
  },
];
