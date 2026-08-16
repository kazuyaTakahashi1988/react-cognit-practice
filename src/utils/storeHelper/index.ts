import { configureStore } from "@reduxjs/toolkit";

import { exampleReducer } from "./slices/exampleSlice";
import { loadingReducer } from "./slices/loadingSlice";
// import { xxxxReducer } from "./slices/xxxxSlice";

/* -----------------------------------------------
 * Redux Store 設定
 * （用途ごとに ./slices 内に分けて管理する）
 * ----------------------------------------------- */

export const store = configureStore({
  reducer: {
    example: exampleReducer, // StoreExample ページ用のサンプル Store
    loading: loadingReducer, // Loading（表示/非表示フラグ）用の Store
    // xxxx: xxxxReducer
  },
});

export { exampleFlagSet, exampleStringSet } from "./slices/exampleSlice";
export { loadingFlagDown, loadingFlagUp } from "./slices/loadingSlice";
export { useGlobalLoading } from "./useGlobalLoading";
// export { xxxxFlagSet, xxxxStringSet } from "./slices/xxxxSlice";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
