import {
	combineReducers,
	configureStore,
	getDefaultMiddleware
} from "@reduxjs/toolkit";
import gameReducer from "./slices";
import createSaga from "redux-saga";
import rootSaga from "./sagas";

const rootReducer = combineReducers({
  game: gameReducer
});

const sagaMiddleware = createSaga();
const middleware = [...getDefaultMiddleware(), sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware
});

sagaMiddleware.run(rootSaga);

export default store;