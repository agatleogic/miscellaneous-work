import { Auth } from "aws-amplify";
import axios from "axios";
import { API_TEST_URI } from "../Constants";

import { createSlice } from "@reduxjs/toolkit";
import { setErrors, setSuccess } from "../alertSlice";

const LABELS = [
  "name",
  "type",
  "version",
  "database",
  "url",
  "username",
  "password",
  "description"
];

const DEFAULT_FORM_VALUES = {
  name: "",
  type: "",
  version: "",
  database: "",
  url: "",
  username: "",
  password: "",
  description: ""
};

const DEFAULT_FILTERS = {
  type: "",
  version: "",
  url: "",
  database: "",
  search: ""
};

const initialState = {
  errors: {},
  submitting: false,
  fetching: false,
  list: [],
  currentConfig: null,
  filters: DEFAULT_FILTERS,
  formValues: DEFAULT_FORM_VALUES,
  status: ""
  // eslint-disable-next-line no-unused-vars
};

const engineConfigSlice = createSlice({
  name: "engineConfig",
  initialState,
  reducers: {
    setCurrentConfig(state, action) {
      state.currentConfig = action.payload;
    },
    setFormValues(state, action) {
      state.formValues = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
    clearForm(state, action) {
      state.formValues = action.payload;
    },
    clearFilters(state, action) {
      state.filters = action.payload;
    },
    setSubmitting(state, action) {
      state.submitting = action.payload;
    },
    setList(state, action) {
      state.list = action.payload;
    },
    setFetching(state, action) {
      state.fetching = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    }
  }
});

export const {
  setCurrentConfig,
  setFormValues,
  setFilters,
  clearForm,
  clearFilters,
  setSubmitting,
  setList,
  setFetching,
  setStatus
} = engineConfigSlice.actions;
export default engineConfigSlice.reducer;

export function create(data) {
  return async function getDataThunk(dispatch, getState) {
    const { list } = getState().engineConfig;
    if (list.length === 10) {
      dispatch(setErrors("You've reached the maximum configuration limit!"));
      return;
    }
    try {
      dispatch(setSubmitting(true));
      await dispatch(update(`custom:connection-${list.length + 1}`, data));
      dispatch(setFormValues({}));
      dispatch(setSuccess("Engine configuration created."));
      dispatch(setStatus("create"));
    } catch (e) {
      dispatch(setErrors(e.message));
      throw new Error(e.message);
    } finally {
      dispatch(setSubmitting(false));
    }
  };
} // [list]

export function update(id, data) {
  return async function getDataThunk(dispatch, getState) {
    const { user } = getState().authUser;
    dispatch(setSubmitting(true));
    try {
      await Auth.updateUserAttributes(user, {
        [id]: encodeInfo(data)
      });
      dispatch(setSuccess("Engine configuration updated."));
      setStatus("update");
    } catch (e) {
      dispatch(setErrors(e.message));
      throw new Error(e.message);
    } finally {
      dispatch(setSubmitting(false));
    }
  };
}
export function destroy(id) {
  return async function getDataThunk(dispatch, getState) {
    const { user } = getState().authUser;
    dispatch(setSubmitting(true));
    try {
      await Auth.deleteUserAttributes(user, [id]);
      dispatch(setSuccess("Engine configuration deleted."));
      setStatus("destroy");
    } catch (e) {
      dispatch(setErrors(e.message));
      throw new Error(e.message);
    } finally {
      dispatch(setSubmitting(false));
    }
  };
}

export function test(payload) {
  return async function getDataThunk(dispatch, getState) {
    dispatch(setSubmitting(true));
    try {
      const result = await axios.post(API_TEST_URI, payload).then((resp) => resp.data);
      if (typeof result === "string") {
        dispatch(setSuccess(result));
      }
    } catch (e) {
      dispatch(setErrors(e.message));
      throw new Error(e.message);
    } finally {
      dispatch(setSubmitting(false));
    }
  };
}

export function fetchInfo(id) {
  return async function getDataThunk(dispatch, getState) {
    const { userAttributes } = getState().authUser;
    let config = null;
    if (!userAttributes.length) {
      dispatch(setFetching(true));
      const attrs = await Auth.userAttributes(await Auth.currentAuthenticatedUser());
      config = decodeInfo(attrs.find((a) => a.Name === id)?.Value);
      dispatch(setFetching(false));
    } else {
      config = decodeInfo(userAttributes.find((a) => a.Name === id)?.Value);
    }
    dispatch(setCurrentConfig(config));
    return config;
  };
} //  [userAttributes]

export function decodeInfo(info) {
  if (info)
    return info.split(";").reduce((prev, value, idx) => {
      return { ...prev, [LABELS[idx]]: value };
    }, {});
  return null;
}

const encodeInfo = (info) => {
  return LABELS.map((label) => info[label]).join(";");
};
