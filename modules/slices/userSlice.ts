import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IUserInfo {
  uid: string;
  nickname: string;
}
interface IUserState {
  isLoggedIn: boolean;
  userInfo: IUserInfo;
}
const initialState: IUserState = {
  isLoggedIn: false,
  userInfo: { uid: "", nickname: "" },
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setLoggedIn(state, { payload }) {
      state.isLoggedIn = true;
      state.userInfo = payload;
    },
  },
  // extraReducers: (builder) => {},
});

export const { setLoggedIn } = userSlice.actions;
export const selectUserInfoState = (state: RootState) => state.userInfoReducer;

export default userSlice.reducer;
