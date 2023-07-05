import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "aws-amplify";
import axios from "axios";
import {
  API_CREATE_MODEL_URI,
  API_GET_MODELS_URI,
  API_UPDATE_MODEL_URI,
  DEFAULT_CONFIG,
  USER_PROFILE_MODEL
} from "../Constants";
import { setErrors } from "../alertSlice";

const authUserSlice = createSlice({
  name: "authUser",
  initialState: {
    submitting: false,
    fetching: false,
    loggedIn: false,
    user: null,
    profile: null,
    userVerify: false,
    userAttributes: [],
    retryCount: 0,
    requestInterceptorIds: []
  },
  reducers: {
    setSubmitting(state, action) {
      state.submitting = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setFetching(state, action) {
      state.fetching = action.payload;
    },
    setProfile(state, action) {
      state.profile = action.payload;
    },
    setRequestInterceptorIds(state, action) {
      state.requestInterceptorIds = action.payload;
    },
    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
    },
    setUserVerify(state, action) {
      state.userVerify = action.payload;
    },
    setUserAttributes(state, action) {
      state.userAttributes = action.payload;
    },
    setRetryCount(state, action) {
      state.retryCount = action.payload;
    }
  }
});

export const {
  setSubmitting,
  setUser,
  setFetching,
  setRequestInterceptorIds,
  setProfile,
  setLoggedIn,
  setUserVerify,
  setUserAttributes,
  setRetryCount
} = authUserSlice.actions;
export default authUserSlice.reducer;

///////////////////////////////////////////////////////////////////////////////////////////////
//thunk middlewere for handle asycronuse actions

export function registerRequestInterceptor(u) {
  return async function getDataThunk(dispatch, getState) {
    // Remove previous interceptor
    getState().authUser.requestInterceptorIds.forEach((id) => axios.interceptors.request.eject(id));
    // Request interceptor
    const id = axios.interceptors.request.use((config) => {
      if (u.getSignInUserSession() !== null) {
        config.headers.Authorization = u.getSignInUserSession().getIdToken().jwtToken;
      }
      return config;
    });
    dispatch(setRequestInterceptorIds([...getState().authUser.requestInterceptorIds, id]));
  };
}

export function searchOdooProfile(email) {
  return async function getDataThunk(dispatch, getState) {
    return await axios
      .post(API_GET_MODELS_URI, {
        configName: DEFAULT_CONFIG,
        model: USER_PROFILE_MODEL,
        fields: [["email", "=", email]],
        outputrecords: { fields: {}, limit: 1 }
      })
      .then((resp) => {
        dispatch(setProfile(resp.data[0]));
        return resp.data[0];
      });
  };
}

export function updateOdooProfile(id, payload) {
  return async function getDataThunk(dispatch, getState) {
    return await axios
      .post(API_UPDATE_MODEL_URI, {
        configName: DEFAULT_CONFIG,
        model: USER_PROFILE_MODEL,
        input: payload,
        id
      })
      .then((resp) => {
        return resp.data;
      });
  };
}

export function createOdooProfile(payload) {
  return async function getDataThunk(dispatch, getState) {
    const { user } = getState().authUser;
    const resp = await axios
      .post(API_CREATE_MODEL_URI, {
        configName: DEFAULT_CONFIG,
        model: USER_PROFILE_MODEL,
        input: payload
      })
      .then((resp) => resp.data);

    // update cognito user attributes
    await Auth.updateUserAttributes(user, {
      "custom:CREATION-DATE": new Date(),
      "custom:ORIGINATING-APP": "R3API",
      "custom:PROFILE-CRM": "odoo"
    });

    return resp;
  };
}

export function fetchCurrentUser() {
  return async function getDataThunk(dispatch, getState) {
    const { user } = getState().authUser;
    if (user) {
      return user;
    }
    dispatch(setFetching(true));
    let u = null;
    try {
      u = await Auth.currentAuthenticatedUser();
      dispatch(registerRequestInterceptor(u));
      await dispatch(searchOdooProfile(u.attributes.email));
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : typeof e === "string" ? e : "";
      throw new Error(errorMsg);
    } finally {
      dispatch(setUser(u));
      dispatch(setFetching(false));
    }
    return u;
  };
}

export function refreshSession() {
  return async function getDataThunk(dispatch, getState) {
    const { retryCount, requestInterceptorIds } = getState().authUser;
    console.log("refresh session called");
    return new Promise((resolve, reject) => {
      Auth.currentAuthenticatedUser()
        .then((currentUser) => {
          const currentSession = currentUser.signInUserSession;
          currentUser.refreshSession(currentSession.refreshToken, (err, session) => {
            console.log(err, session);
            if (err) {
              dispatch(setRetryCount(retryCount + 1));
              reject(err);
              return;
            }
            requestInterceptorIds.forEach((id) => axios.interceptors.request.eject(id));
            // axios.interceptors.response.eject(0);
            const id = axios.interceptors.request.use((config) => {
              console.log("new interceptor called");
              config.headers.Authorization = session.getIdToken().jwtToken;
              resolve(true);
              return config;
            });
            dispatch(setRequestInterceptorIds([...requestInterceptorIds, id]));
          });
        })
        .catch((e) => {
          dispatch(setRetryCount(retryCount + 1));
          reject(e);
        });
    });
  };
}

export function login({ username, password }) {
  return async function getDataThunk(dispatch, getState) {
    dispatch(setSubmitting(true));
    dispatch(setFetching(true));
    try {
      const u = await Auth.signIn(username, password);
      dispatch(setUser(u));
      dispatch(registerRequestInterceptor(u));
      await dispatch(searchOdooProfile(u.attributes.email));
    } catch (e) {
      dispatch(setErrors(e.message));
      throw e;
    } finally {
      dispatch(setSubmitting(false));
      dispatch(setFetching(false));
    }
  };
}

export function logout() {
  return async function getDataThunk(dispatch, getState) {
    dispatch(setSubmitting(true));
    try {
      await Auth.signOut();
      dispatch(setUser(null));
    } catch (e) {
      dispatch(setErrors(e.message));
      throw new Error(e.message);
    } finally {
      dispatch(setSubmitting(false));
    }
  };
}

export function fetchUserAttributes() {
  return async function getDataThunk(dispatch, getState) {
    let attributes = [];
    if (getState().authUser.user) {
      try {
        attributes = await Auth.userAttributes(getState().authUser.user);
      } catch (e) {
        console.log(e);
        if (e.code === "UserNotFoundException") {
          await dispatch(logout());
        }
      }
    }
    setUserAttributes(attributes);
    return attributes;
  };
}

export function forgotPassword(email) {
  return async function getDataThunk(dispatch, getState) {
    dispatch(setSubmitting(true));
    try {
      await Auth.forgotPassword(email);
    } catch (e) {
      dispatch(setErrors(e.message));
      throw new Error(e.message);
    } finally {
      dispatch(setSubmitting(false));
    }
  };
}

export function resetPassword(username, code, password) {
  return async function getDataThunk(dispatch, getState) {
    dispatch(setSubmitting(true));
    try {
      await Auth.forgotPasswordSubmit(username, code, password);
    } catch (e) {
      dispatch(setErrors(e.message));
      throw new Error(e.message);
    } finally {
      dispatch(setSubmitting(false));
    }
  };
}

export function register({ username, password }) {
  return async function getDataThunk(dispatch, getState) {
    try {
      dispatch(setSubmitting(true));
      const { user } = await Auth.signUp(username, password);
      console.log(username);
      dispatch(setUserVerify(false));
      dispatch(setUser(user));
    } catch (e) {
      dispatch(setErrors(e.message));
      throw new Error(e.message);
    } finally {
      dispatch(setSubmitting(false));
    }
  };
}

export function confirmSignup(username, code) {
  return async function getDataThunk(dispatch, getState) {
    try {
      dispatch(setSubmitting(true));
      await Auth.confirmSignUp(username, code);
      // setUserVerify(true);
    } catch (e) {
      dispatch(setErrors(e.message));
      throw new Error(e.message);
    } finally {
      dispatch(setSubmitting(false));
    }
  };
}
