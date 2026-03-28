/* -------------------------------------------------------
    ▽ 型定義 (ストア編) ▽
---------------------------------------------------------- */
import type { AppDispatch, store } from "../../utils/store";

// Store
export type TypeStore = ReturnType<typeof store.getState>;

// Dispatch
export type TypeDispatch = AppDispatch;
