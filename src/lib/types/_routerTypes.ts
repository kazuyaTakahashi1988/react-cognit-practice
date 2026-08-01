export type AppRoute = {
  access: "auth" | "guest" | "public";
  component: React.LazyExoticComponent<React.ComponentType>;
  path: string;
};
