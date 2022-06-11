import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";
import {
  getMyTrip,
  getMyTripItem,
  getMyTripItemDetailList,
  getMyTripItemList,
} from "lib/apis/trip";
import { jsonConverter } from "utils/function";
import { RootState } from "../store";
import { ITripInfo } from "./tripCreationSlice";

export interface ITripItemInfo {
  id?: string;
  cost: number;
  title: string;
}
export interface ITripItemDetailInfo {
  id?: string;
  title: string;
  startDate: Timestamp | Date;
  endDate: Timestamp | Date;
  cost: number;
}
export type T_TRIP_CREATE_STATUS = "country" | "detail" | "date" | "confirm";
interface ItripCreationState {
  myTripInfo: ITripInfo;
  tripItems: ITripItemInfo[];
  currTripItem: ITripItemInfo;
  itemDetails: ITripItemDetailInfo[];
}
const initialState: ItripCreationState = {
  myTripInfo: {
    title: "",
    countries: [],
    mateList: [],
    cost: 0,
    startDate: jsonConverter(new Date()),
    endDate: jsonConverter(new Date()),
  },
  tripItems: [],
  currTripItem: { id: "", cost: 0, title: "" },
  itemDetails: [],
};

const GET_MYTRIP_INFO = "getMyTripInfo/myTripItemSlice" as const;
export const getMyTripInfo = createAsyncThunk(
  GET_MYTRIP_INFO,
  async ({ uid, tid }: { uid: string; tid: any }, { rejectWithValue }) => {
    try {
      const res = await getMyTrip({ uid, tid });
      return res?.data;
    } catch (e) {
      const error: any = e;
      return rejectWithValue(error.response.data);
    }
  }
);
const GET_MYTRIP_ITEMS_INFO = "getMyTripItemsInfo/myTripItemSlice" as const;
export const getMyTripItemsInfo = createAsyncThunk(
  GET_MYTRIP_ITEMS_INFO,
  async ({ uid, tid }: { uid: string; tid: any }, { rejectWithValue }) => {
    try {
      const res = await getMyTripItemList({ uid, tid });
      return res?.data;
    } catch (e) {
      const error: any = e;
      return rejectWithValue(error.response.data);
    }
  }
);
const GET_MYTRIP_ITEM_DETAILS = "getMyTripItemDetails/myTripItemSlice" as const;
export const getMyTripItemDetailInfo = createAsyncThunk(
  GET_MYTRIP_ITEM_DETAILS,
  async (
    { uid, tid, itemId }: { uid: string; tid: any; itemId: any },
    { rejectWithValue }
  ) => {
    try {
      const item = await getMyTripItem({ uid, tid, itemId });
      const details = await getMyTripItemDetailList({ uid, tid, itemId });
      return {
        item: item?.data,
        details: details?.data,
      };
    } catch (e) {
      const error: any = e;
      return rejectWithValue(error.response.data);
    }
  }
);
const myTripItemSlice = createSlice({
  name: "myTripItemInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyTripInfo.pending, (state, { payload }) => {})
      .addCase(getMyTripInfo.fulfilled, (state, { payload }) => {
        console.log(jsonConverter(payload), "dfaskdhfasdfjal");

        state.myTripInfo = jsonConverter(payload);
      })
      .addCase(getMyTripInfo.rejected, (state, { payload }) => {});
    builder
      .addCase(getMyTripItemsInfo.pending, (state, { payload }) => {})
      .addCase(getMyTripItemsInfo.fulfilled, (state, { payload }) => {
        state.tripItems = jsonConverter(payload);
      })
      .addCase(getMyTripItemsInfo.rejected, (state, { payload }) => {});
    builder
      .addCase(getMyTripItemDetailInfo.pending, (state, { payload }) => {})
      .addCase(getMyTripItemDetailInfo.fulfilled, (state, { payload }) => {
        const { item, details } = jsonConverter(payload);
        state.currTripItem = item;
        state.itemDetails = details;
      })
      .addCase(getMyTripItemDetailInfo.rejected, (state, { payload }) => {});
  },
});

export const {} = myTripItemSlice.actions;
export const selectMyTripItemState = (state: RootState) =>
  state.myTripItemInfoReducer;

export default myTripItemSlice.reducer;
