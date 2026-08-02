import type { TypePageMeta } from "./_componentsType";

export type AppRoute = {
  access: "auth" | "guest" | "public";
  component: React.LazyExoticComponent<React.ComponentType>;
  pageMeta: TypePageMeta;
  path: string;
};
