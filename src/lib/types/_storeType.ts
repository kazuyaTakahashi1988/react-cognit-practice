/* -------------------------------------------------------
    ▽ 型定義 (ストア編) ▽
---------------------------------------------------------- */
import type { store } from "../../utils/store";

export type TypeSelectorState = ReturnType<typeof store.getState>;

export type TypeState = {
  loadingFlagCount: number;
  // xxxxString: string;
  // xxxxFlag: boolean;
};
