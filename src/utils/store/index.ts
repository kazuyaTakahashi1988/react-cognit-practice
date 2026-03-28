import { configureStore, createSlice } from "@reduxjs/toolkit";

import type { TypeState } from "../../lib/types";

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
    // xxxxFlagSetTrue: (state: TypeState) => {
    //   state.xxxxFlag = true;
    // },
    // xxxxFlagSetFalse: (state: TypeState) => {
    //   state.xxxxFlag = false;
    // },
  },
});

export const {
  loadingFlagUp,
  loadingFlagDown,
  // xxxxStringSet,
  // xxxxFlagSetTrue,
  // xxxxFlagSetFalse
} = appSlice.actions;

export const store = configureStore({ reducer: appSlice.reducer });
