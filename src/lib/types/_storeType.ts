/* -------------------------------------------------------
    ▽ 型定義 (ストア編) ▽
---------------------------------------------------------- */
import type { store } from "../../utils/storeHelper";

export type TypeSelectorState = ReturnType<typeof store.getState>;
export type TypeDispatch = typeof store.dispatch;

export type TypeState = {
  loadingFlagCount: number;
  // xxxxString: string;
  // xxxxFlag: boolean;
};
