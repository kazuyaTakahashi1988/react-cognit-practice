import { configureStore, createSlice } from "@reduxjs/toolkit";

import type { TypeState } from "../../lib/types";

const initialState: TypeState = {
  loadingFlagCount: 0,
  // xxxxFlag: false
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
    // xxxxFlagTrue: (state: TypeState) => {
    //   state.xxxxFlag = true;
    // },
    // xxxxFlagFalse: (state: TypeState) => {
    //   state.xxxxFlag = false;
    // },
  },
});

export const {
  loadingFlagUp,
  loadingFlagDown,
  // xxxxFlagTrue,
  // xxxxFlagFalse
} = appSlice.actions;

export const store = configureStore({ reducer: appSlice.reducer });
