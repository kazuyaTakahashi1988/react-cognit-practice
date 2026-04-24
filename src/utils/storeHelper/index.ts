import { configureStore, createSlice } from "@reduxjs/toolkit";

import type { TypeState } from "../../lib/types";

/* -----------------------------------------------
 * Store管理（Redux）処理
 * ----------------------------------------------- */

const initialState: TypeState = {
  loadingFlagCount: 0,
  // xxxxString: "",
  // xxxxFlag: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    loadingFlagUp: (state: TypeState) => {
      state.loadingFlagCount += 1;
    },
    loadingFlagDown: (state: TypeState) => {
      state.loadingFlagCount = Math.max(0, state.loadingFlagCount - 1);
    },
    // xxxxStringSet: (state: TypeState, action: { payload: string }) => {
    //   state.xxxxString = action.payload;
    // },
    // xxxxFlagSet: (state: TypeStat,  action: { payload: boolean }) => {
    //   state.xxxxFlag = action.payload;
    // },
  },
});

export const {
  loadingFlagUp,
  loadingFlagDown,
  // xxxxStringSet,
  // xxxxFlagSet,
} = appSlice.actions;

export const store = configureStore({ reducer: appSlice.reducer });

/*
 * グローバルローディングの開始・終了を1セットで保証するユーティリティ
 */
const createLoadingScope = () => {
  store.dispatch(loadingFlagUp());

  let isClosed = false;
  return () => {
    if (isClosed) return;
    isClosed = true;
    store.dispatch(loadingFlagDown());
  };
};

export const withGlobalLoading = async <T>(task: () => Promise<T>): Promise<T> => {
  const closeLoading = createLoadingScope();

  try {
    return await task();
  } finally {
    closeLoading();
  }
};
