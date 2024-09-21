/* -------------------------------------------------------
    ▽ 型定義 (ストア編) ▽
---------------------------------------------------------- */
import { store } from "../../utils/store";

// Store
export type TypeStore = ReturnType<typeof store.getState>;
