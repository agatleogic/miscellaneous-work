import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    errors: "",
    successMessage: "",
    persist: false
  },
  reducers: {
    clearErrors(state, action) {
      state.errors = action.payload;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
    setSuccess(state, action) {
      state.successMessage = action.payload;
    },
    setPersist(state, action) {
      state.persist = action.payload;
    }
  }
});

export const { clearErrors, setErrors, setSuccess, setPersist } =
  alertSlice.actions;
export default alertSlice.reducer;
