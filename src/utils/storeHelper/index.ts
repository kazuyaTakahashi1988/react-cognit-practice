import { configureStore } from "@reduxjs/toolkit";

import { exampleReducer } from "./slices/exampleSlice";
import { loadingReducer } from "./slices/loadingSlice";

export { exampleFlagSet, exampleStringSet } from "./slices/exampleSlice";
export { loadingFlagDown, loadingFlagUp } from "./slices/loadingSlice";

// 機能が増えたら reducer を1つ追加するだけで slice 分割できます。
export const store = configureStore({
  reducer: { example: exampleReducer, loading: loadingReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
