import { createStore } from "redux";

export type StoreState = { loadingFlag: number };

const initialState: StoreState = { loadingFlag: 0 };

export const loadingFlagUp = () => ({ type: "loading/flagUp" }) as const;

export const loadingFlagDown = () => ({ type: "loading/flagDown" }) as const;

export type StoreAction = ReturnType<typeof loadingFlagUp> | ReturnType<typeof loadingFlagDown>;

const counterReducer = (state: StoreState = initialState, action: StoreAction): StoreState => {
  switch (action.type) {
    case "loading/flagUp":
      return { ...state, loadingFlag: state.loadingFlag + 1 };
    case "loading/flagDown":
      return { ...state, loadingFlag: Math.max(0, state.loadingFlag - 1) };
    default:
      return state;
  }
};

export const store = createStore(counterReducer);

export type AppDispatch = typeof store.dispatch;
