import { legacy_createStore as createStore } from 'redux'

const initialState = { flug: 0 };

const loadingFlugCounterReducer = (state = initialState, action: { type: string; }) => {
  switch (action.type) {
    case 'FLUG_UP':
      return { ...state, flug: state.flug + 1 };
    case 'FLUG_DOWN':
      return { ...state, flug: state.flug - 1 };
    default:
      return state;
  }
}

export const loadingFlugStore = createStore(loadingFlugCounterReducer);
