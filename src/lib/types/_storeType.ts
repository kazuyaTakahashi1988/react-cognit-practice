/* -------------------------------------------------------
    ▽ 型定義 (ストア編) ▽
---------------------------------------------------------- */
import type { store } from "../../utils/store";

// Store
export type TypeStore = ReturnType<typeof store.getState>;
