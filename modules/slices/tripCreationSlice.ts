import { createSlice } from "@reduxjs/toolkit";
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
type T_TRIP_CREATE_STATUS = "country" | "detail" | "date" | "confirm";
interface ItripCreationState {
  tripInfo: ITripInfo;
  countryInfo: ICountryInfo;
  tripCreationSatus: T_TRIP_CREATE_STATUS;
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
        case "countryName":
          state.countryInfo.name = value;
        case "countryDetail":
          state.countryInfo.detail = value;
      }
    },
    addTripCountry(state, { payload }) {
      state.tripInfo.countries.push({ ...state.countryInfo, ...payload });
    },
    initCountryInfo(state) {
      state.countryInfo = initialState.countryInfo;
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
