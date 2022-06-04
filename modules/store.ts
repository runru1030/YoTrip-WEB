import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Context, createWrapper } from "next-redux-wrapper";
import tripInfoReducer from "./slices/tripCreationSlice";

export const reducer = (state: any, action: any) => {
  return combineReducers({ tripInfoReducer })(state, action);
};

const devMode = process.env.NODE_ENV === "development";
const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const makeStore = (context: Context) => store;
export const wrapper = createWrapper(makeStore, {
  debug: devMode,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default wrapper;
