import { createStore, applyMiddleware, compose } from "redux";

import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
// this middleware warns us if we accidentaly mutate state in the reducer

import thunk from "redux-thunk";

import reducer from "./reducers";

export default function configureStore(initialState) {
  const composerEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  // this will add support for redux dev tools
  return createStore(
    reducer,
    initialState,
    composerEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}
