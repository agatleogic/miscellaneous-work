import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import alertReducer from "./alertSlice";
import sidebarReducer from "./sidebarSlice";
import tooltipReducer from "./toolTipSlice";
import languageReducer from "./languageSlice";
import engineConfigReducer from "./engineConfigSlice";
import apiGenerationReducer from "./apiGenerationSlice";
import myApiReducer from "./myApiSlice";

const store = configureStore({
  reducer: {
    authUser: authReducer,
    alert: alertReducer,
    sidebar: sidebarReducer,
    toolTip: tooltipReducer,
    language: languageReducer,
    engineConfig: engineConfigReducer,
    apiGeneration: apiGenerationReducer,
    myApi: myApiReducer
  }
});

export default store;
