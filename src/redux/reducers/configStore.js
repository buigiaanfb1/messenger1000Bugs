import { combineReducers, applyMiddleware, compose } from "redux";
import createMiddleWareSaga from "redux-saga";
import MessengerReducer from "./MessengerReducer";
import { rootSaga } from "./../sagas/rootSaga";
import { createStore } from "redux";

const middleWareSage = createMiddleWareSaga();

const reducer = combineReducers({
  MessengerReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(middleWareSage))
);
middleWareSage.run(rootSaga);
export default store;
