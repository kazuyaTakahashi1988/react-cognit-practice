import { configureStore } from "@reduxjs/toolkit";

import {
  exampleReducer,
  loadingReducer,
  // xxxxReducer
} from "./_slices";

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

export {
  exampleFlagSet,
  exampleStringSet,
  loadingFlagDown,
  loadingFlagUp,
  // xxxxFlagSet,
  // xxxxStringSet
} from "./_slices";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
