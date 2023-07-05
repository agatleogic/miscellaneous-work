import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: {
    selectedLang: localStorage.getItem("lang") || "en"
  },
  reducers: {
    setSelectedLang(state, action) {
      state.selectedLang = action.payload;
    }
  }
});

export const { setSelectedLang } = languageSlice.actions;
export default languageSlice.reducer;
