/* -------------------------------------------------------
    ▽ 型定義 (ストア編) ▽
---------------------------------------------------------- */
import type { AppDispatch, RootState } from "../../utils/storeHelper";

export type TypeSelectorState = RootState;
export type TypeDispatch = AppDispatch;

export type TypeState = {
  loadingFlagCount: number;
  // xxxxString: string;
  // xxxxFlag: boolean;
};
