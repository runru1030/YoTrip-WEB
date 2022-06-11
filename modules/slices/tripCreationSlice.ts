import { createSlice } from "@reduxjs/toolkit";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import { ICountry } from "public/Country";
import { jsonConverter } from "utils/function";
import { RootState } from "../store";

export interface ICountryInfo {
  name: string;
  detail: string;
}
export interface ICountryTotalInfo extends ICountryInfo {
  startDate: Timestamp;
  endDate: Timestamp;
}
export interface ITripInfo {
  title: string;
  countries: ICountryTotalInfo[];
  cost: number;
  mateList: number[];
  startDate: Timestamp | Date;
  endDate: Timestamp | Date;
}
export type T_TRIP_CREATE_STATUS = "country" | "detail" | "date" | "confirm";
interface ItripCreationState {
  tripInfo: ITripInfo;
  countryInfo: ICountryInfo;
  tripCreationSatus: T_TRIP_CREATE_STATUS;
  countryResult: ICountry[];
}
const initialState: ItripCreationState = {
  tripInfo: {
    title: "",
    countries: [],
    mateList: [],
    cost: 0,
    startDate: jsonConverter(new Date()),
    endDate: jsonConverter(new Date()),
  },
  countryInfo: {
    name: "",
    detail: "",
  },
  tripCreationSatus: "country",
  countryResult: [],
};

const tripCreationSlice = createSlice({
  name: "tripCreationInfo",
  initialState,
  reducers: {
    setTripInfo(state, { payload }) {
      const { value, type } = payload;
      switch (type) {
        case "title":
          state.tripInfo.title = value;
          break;
        case "countryName":
          state.countryInfo.name = value;
          break;
        case "countryDetail":
          state.countryInfo.detail = value;
          break;
      }
    },
    addTripCountry(state, { payload }) {
      state.tripInfo.countries.push({ ...state.countryInfo, ...payload });
    },
    delTripCountry(state, { payload }) {
      const { countryInfo } = payload;
      state.tripInfo.countries = state.tripInfo.countries.filter(
        (country) => JSON.stringify(country) !== JSON.stringify(countryInfo)
      );
    },
    initCountryInfo(state) {
      state.countryInfo = initialState.countryInfo;
      state.countryResult = [];
    },
    setStatus(state, { payload }) {
      state.tripCreationSatus = payload;
    },
    initState(state) {
      state.tripInfo = initialState.tripInfo;
      state.countryInfo = initialState.countryInfo;
      state.tripCreationSatus = initialState.tripCreationSatus;
      state.countryResult = initialState.countryResult;
    },
  },
  // extraReducers: (builder) => {},
});

export const {
  setTripInfo,
  setStatus,
  initCountryInfo,
  addTripCountry,
  delTripCountry,
  initState,
} = tripCreationSlice.actions;
export const selectTripCreationState = (state: RootState) =>
  state.tripInfoReducer;

export default tripCreationSlice.reducer;
