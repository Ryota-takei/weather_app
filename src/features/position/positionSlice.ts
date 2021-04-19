import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface PositionState {
  currentPosition: { latitude: number; longitude: number };
  inputAreaName: string;
  wetherInformation: any;
}

const initialState: PositionState = {
  currentPosition: { latitude: 35.7022589, longitude: 139.7744733 },
  inputAreaName: "",
  wetherInformation: "",
};

export const fetchTasks = createAsyncThunk(
  "position/useURL",
  async (url: any) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
);

export const positionSlice = createSlice({
  name: "position",
  initialState,

  reducers: {
    setPosition: (state, action) => {
      state.currentPosition.latitude = action.payload.lat;
      state.currentPosition.longitude = action.payload.lng;
    },
    setInputAreaName: (state, action) => {
      state.inputAreaName = action.payload;
    },

    setWetherInformation: (state, action) => {
      state.wetherInformation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.wetherInformation = action.payload;
    })
    .addCase(fetchTasks.rejected, () => {
      alert("一時的にお天気情報が取得できません。時間を置いて再度お試しくださいませ")
    })
  },
});

export const {
  setPosition,
  setWetherInformation,
  setInputAreaName,
} = positionSlice.actions;

export const selectPosition = (state: RootState) =>
  state.position.currentPosition;

export const selectCurrentWeather = (state: RootState) =>
  state.position.wetherInformation;

export const selectInputAreaName = (state: RootState) =>
  state.position.inputAreaName;

export default positionSlice.reducer;
