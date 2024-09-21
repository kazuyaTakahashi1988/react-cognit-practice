import { legacy_createStore as createStore } from 'redux'

const initialState = {
  loadingFlug: 0,
  // xxxxFlug: false,
};

const CounterReducer = (state = initialState, action: { type: string; }) => {
  switch (action.type) {
    case 'LOADING_FLUG_UP':
      return { ...state, loadingFlug: state.loadingFlug + 1 };
    case 'LOADING_FLUG_DOWN':
      return { ...state, loadingFlug: state.loadingFlug - 1 };
    // case 'XXXX_FLUG_TRUE':
    //   return { ...state, xxxxFlug: true };
    // case 'XXXX_FLUG_FALSE':
    //   return { ...state, xxxxFlug: false };
    default:
      return state;
  }
}

export const store = createStore(CounterReducer);
