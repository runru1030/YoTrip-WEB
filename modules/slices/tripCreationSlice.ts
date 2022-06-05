import { createSlice } from "@reduxjs/toolkit";
import { ICountry } from "public/Country";
import { RootState } from "../store";

interface ICountryInfo {
  name: string;
  detail: string;
}
interface ICountryTotalInfo extends ICountryInfo {
  startDate: Date;
  endDate: Date;
}
interface ITripInfo {
  title: string;
  countries: ICountryTotalInfo[];
  mateList: number[];
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
    initCountryInfo(state) {
      state.countryInfo = initialState.countryInfo;
      state.countryResult = [];
    },
    setStatus(state, { payload }) {
      state.tripCreationSatus = payload;
    },
  },
  // extraReducers: (builder) => {},
});

export const { setTripInfo, setStatus, initCountryInfo, addTripCountry } =
  tripCreationSlice.actions;
export const selectTripCreationState = (state: RootState) =>
  state.tripInfoReducer;

export default tripCreationSlice.reducer;
