import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "utils/firebase/app";
import { RootState } from "../store";
import { ITripInfo } from "./tripCreationSlice";

export interface ITripItemInfo {
  id: string;
  cost: number;
  title: string;
}
export interface ITripItemDetailInfo {
  id: string;
  title: string;
  startDate: Timestamp;
  endDate: Timestamp;
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
    startDate: JSON.parse(JSON.stringify(Timestamp.fromDate(new Date()))),
    endDate: JSON.parse(JSON.stringify(Timestamp.fromDate(new Date()))),
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
      const res = await getDoc(doc(db, "Trip", uid, "myTripInfo", tid));
      return res.data();
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
      const res = await getDocs(
        collection(db, "Trip", uid, "myTripInfo", tid, "tripItems")
      );
      return res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
    { uid, tid, itemid }: { uid: string; tid: any; itemid: any },
    { rejectWithValue }
  ) => {
    try {
      const item = await getDoc(
        doc(db, "Trip", uid, "myTripInfo", tid, "tripItems", itemid)
      );
      const res = await getDocs(
        collection(
          db,
          "Trip",
          uid,
          "myTripInfo",
          tid,
          "tripItems",
          itemid,
          "detail"
        )
      );
      return {
        item: item.data(),
        details: res.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
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
        const myTripInfo = JSON.parse(JSON.stringify(payload));
        state.myTripInfo = myTripInfo;
      })
      .addCase(getMyTripInfo.rejected, (state, { payload }) => {});
    builder
      .addCase(getMyTripItemsInfo.pending, (state, { payload }) => {})
      .addCase(getMyTripItemsInfo.fulfilled, (state, { payload }) => {
        const tripItems = JSON.parse(JSON.stringify(payload));
        state.tripItems = tripItems;
      })
      .addCase(getMyTripItemsInfo.rejected, (state, { payload }) => {});
    builder
      .addCase(getMyTripItemDetailInfo.pending, (state, { payload }) => {})
      .addCase(getMyTripItemDetailInfo.fulfilled, (state, { payload }) => {
        const { item, details } = payload;
        state.currTripItem = JSON.parse(JSON.stringify(item)) as ITripItemInfo;
        state.itemDetails = JSON.parse(JSON.stringify(details)) as any;
      })
      .addCase(getMyTripItemDetailInfo.rejected, (state, { payload }) => {});
  },
});

export const {} = myTripItemSlice.actions;
export const selectMyTripItemState = (state: RootState) =>
  state.myTripItemInfoReducer;

export default myTripItemSlice.reducer;
