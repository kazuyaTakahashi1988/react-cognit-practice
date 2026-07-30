import { configureStore } from "@reduxjs/toolkit";

import { exampleReducer } from "./slices/exampleSlice";
import { loadingReducer } from "./slices/loadingSlice";

export { exampleFlagSet, exampleStringSet } from "./slices/exampleSlice";
export { loadingFlagDown, loadingFlagUp } from "./slices/loadingSlice";
// export { xxxxFlagSet, xxxxStringSet } from "./slices/xxxxSlice";

/* -----------------------------------------------
 * Redux Store 設定
 * ----------------------------------------------- */

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    loading: loadingReducer,
    // xxxx: xxxxReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
