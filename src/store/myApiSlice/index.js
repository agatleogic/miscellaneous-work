import axios from "axios";
import {
  // ACTION_API_CONTENT,
  // ACTION_API_EXISTS,
  API_DELETE_FILE,
  // ACTION_API_LIST,
  API_EXECUTE_METHOD,
  API_FETCH_FILE_LIST,
  API_SAVE_FILE
} from "../Constants";
import { setErrors } from "../alertSlice";

const DEFAULT_FILTERS = {
  config: "",
  model: "",
  action: "",
  search: ""
};

import { createSlice } from "@reduxjs/toolkit";

const myApiSlice = createSlice({
  name: "myApi",
  initialState: {
    list: [],
    currentDetails: null,
    fetching: false,
    saving: false,
    deleting: false,
    filters: DEFAULT_FILTERS
  },
  reducers: {
    setCurrentDetails(state, action) {
      state.currentDetails = action.payload;
    },
    clearFilters(state, action) {
      state.filters = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
    setList(state, action) {
      state.list = action.payload;
    },
    setFetching(state, action) {
      state.fetching = action.payload;
    },
    setSaving(state, action) {
      state.saving = action.payload;
    },
    setDeleting(state, action) {
      state.deleting = action.payload;
    }
  }
});

export const {
  setCurrentDetails,
  setList,
  setFetching,
  setSaving,
  setDeleting,
  setFilters,
  clearFilters
} = myApiSlice.actions;
export default myApiSlice.reducer;

export function fetchList() {
  return async function getDataThunk(dispatch, getState) {
    dispatch(setFetching(true));
    try {
      const resp = await axios.post(API_FETCH_FILE_LIST, {}).then((resp) => resp.data);
      dispatch(setList(resp));
      return resp;
    } catch (e) {
      dispatch(setErrors(e.message));
      throw new Error(e.message);
    } finally {
      dispatch(setFetching(false));
    }
  };
}
export function fetchDetails(id) {
  return async function getDataThunk(dispatch, getState) {
    dispatch(setFetching(true));
    try {
      const resp = await axios
        .post(API_EXECUTE_METHOD, {
          // Actionname: ACTION_API_CONTENT,
          Filename: id
        })
        .then((resp) => resp.data);
      dispatch(setCurrentDetails(resp));
      return resp;
    } catch (e) {
      dispatch(setErrors(e.message));
      throw new Error(e.message);
    } finally {
      dispatch(setFetching(false));
    }
  };
}
export function exists(id) {
  return async function getDataThunk(dispatch, getState) {
    dispatch(setFetching(true));
    try {
      return await axios
        .post(API_EXECUTE_METHOD, {
          // Actionname: ACTION_API_EXISTS,
          Filename: id
        })
        .then((resp) => resp.data);
    } catch (e) {
      dispatch(setErrors(e.message));
      throw new Error(e.message);
    } finally {
      dispatch(setFetching(false));
    }
  };
}
export function save(data) {
  return async function getDataThunk(dispatch, getState) {
    dispatch(setSaving(true));
    try {
      const resp = await axios
        .post(API_SAVE_FILE, {
          configName: data.config,
          filename: data.filename,
          json_text: JSON.stringify(data),
          model: data.model
        })
        .then((resp) => resp.data);
      dispatch(setCurrentDetails(resp));
      return resp;
    } catch (e) {
      dispatch(setErrors(e.message));
      throw new Error(e.message);
    } finally {
      dispatch(setSaving(false));
    }
  };
}
export function destroy(config, filePath) {
  return async function getDataThunk(dispatch, getState) {
    dispatch(setDeleting(true));
    try {
      return await axios
        .post(API_DELETE_FILE, {
          configName: config,
          filePath
        })
        .then((resp) => resp.data);
    } catch (e) {
      dispatch(setErrors(e.message));
      throw new Error(e.message);
    } finally {
      dispatch(setDeleting(false));
    }
  };
}
