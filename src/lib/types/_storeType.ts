/* -------------------------------------------------------
    ▽ 型定義 (ストア編) ▽
---------------------------------------------------------- */
import type { AppDispatch, RootState } from "../../utils/store";

export type TypeSelectorState = RootState;
export type TypeDispatch = AppDispatch;

export type TypeState = {
  loadingFlagCount: number;
  // xxxxString: string;
  // xxxxFlag: boolean;
};
