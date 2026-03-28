import { configureStore, createSlice } from "@reduxjs/toolkit";

export type TypeAppState = {
  loadingFlagCount: number;
  // xxxxFlag: boolean;
};

const initialState: TypeAppState = {
  loadingFlagCount: 0,
  // xxxxFlag: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    loadingFlagUp: (state: TypeAppState) => {
      state.loadingFlagCount += 1;
    },
    loadingFlagDown: (state: TypeAppState) => {
      state.loadingFlagCount = Math.max(0, state.loadingFlagCount - 1);
    },
    // xxxxFlagTrue: (state) => {
    //   state.xxxxFlag = true;
    // },
    // xxxxFlagFalse: (state) => {
    //   state.xxxxFlag = false;
    // },
  },
});

export const { loadingFlagUp, loadingFlagDown } = appSlice.actions;

export const store = configureStore({
  reducer: appSlice.reducer,
});

export type TypeStore = ReturnType<typeof store.getState>;
export type TypeStoreDispatch = typeof store.dispatch;

export const selectLoadingFlagCount = (state: TypeStore) => state.loadingFlagCount;
