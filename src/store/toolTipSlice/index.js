import { createSlice } from "@reduxjs/toolkit";

const toolTipSlice = createSlice({
  name: "toolTip",
  initialState: {
    switchToolTip: true
  },
  reducers: {
    setSwitchToolTip(state, action) {
      state.switchToolTip = action.payload;
    }
  }
});

export const { setSwitchToolTip } = toolTipSlice.actions;
export default toolTipSlice.reducer;
