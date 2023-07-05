import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    showingSidebar: false
  },
  reducers: {
    setShowingSidebar(state, action) {
      state.showingSidebar = action.payload;
    }
  }
});

export const { setShowingSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
