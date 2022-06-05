import { AnyAction, combineReducers, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { Context, createWrapper } from "next-redux-wrapper";
import tripInfoReducer from "./slices/tripCreationSlice";
import userInfoReducer from "./slices/userSlice";

export const reducer = (state: any, action: any) => {
  return combineReducers({ tripInfoReducer, userInfoReducer })(state, action);
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
export type AppThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
export default wrapper;
