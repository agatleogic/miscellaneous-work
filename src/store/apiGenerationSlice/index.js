import { createSlice } from "@reduxjs/toolkit";
import { API_GET_FIELDS_URI, API_GET_MODELS_URI } from "../Constants";
import axios from "axios";
import { setErrors } from "../alertSlice";

const apiGenerationSlice = createSlice({
  name: "apiGeneration",
  initialState: {
    submitting: false,
    fetching: false,
    models: [],
    modelRecords: [],
    fields: {},
    currentModel: null,
    selectedRecord: null,
    currentRecord: null,
    selectedFields: [],
    QBFields: [],
    filterFields: [],
    requiredFields: [],
    fieldType: [],
    selectedMethod: "",
    selectedConfig: null,
    prevModel: null,
    prevConfig: null,
    completeQuery: []
  },
  reducers: {
    setCurrentModel(state, action) {
      state.currentModel = action.payload;
    },
    setSelectedRecord(state, action) {
      state.selectedRecord = action.payload;
    },
    setSelectedFields(state, action) {
      state.selectedFields = action.payload;
    },
    setQBFields(state, action) {
      state.QBFields = action.payload;
    },
    setFilterFields(state, action) {
      state.filterFields = action.payload;
    },
    setRequiredFields(state, action) {
      state.requiredFields = action.payload;
    },
    setFieldType(state, action) {
      state.fieldType = action.payload;
    },
    setSelectedMethod(state, action) {
      state.selectedMethod = action.payload;
    },
    setSelectedConfig(state, action) {
      state.selectedConfig = action.payload;
    },
    setPrevConfig(state, action) {
      state.prevConfig = action.payload;
    },
    setPrevModel(state, action) {
      state.prevModel = action.payload;
    },
    setModelRecords(state, action) {
      state.modelRecords = action.payload;
    },
    setFetching(state, action) {
      state.fetching = action.payload;
    },
    setModels(state, action) {
      state.models = action.payload;
    },
    setFields(state, action) {
      state.fields = action.payload;
    },
    setCurrentRecord(state, action) {
      state.currentRecord = action.payload;
    },
    setCompleteQuery(state, action) {
      state.completeQuery = action.payload;
    }
  }
});

export const {
  setCurrentModel,
  setSelectedRecord,
  setSelectedFields,
  setQBFields,
  setFilterFields,
  setRequiredFields,
  setFieldType,
  setSelectedMethod,
  setSelectedConfig,
  setPrevModel,
  setPrevConfig,
  setModelRecords,
  setFetching,
  setModels,
  setFields,
  setCurrentRecord,
  setCompleteQuery
} = apiGenerationSlice.actions;
export default apiGenerationSlice.reducer;

export function fetchModels() {
  return async function getDataThunk(dispatch, getState) {
    const { selectedConfig, prevConfig } = getState().apiGeneration;
    console.log(getState());
    if (selectedConfig && selectedConfig !== prevConfig) {
      dispatch(setFetching(true));
      dispatch(setModels([]));
      try {
        const models = await axios
          .post(API_GET_MODELS_URI, {
            configName: selectedConfig,
            model: "ir.model",
            fields: [["id", ">", 0]],
            outputrecords: { fields: ["display_name", "model"], limit: 1000 }
          })
          .then((resp) => resp.data);
        dispatch(setModels(models || []));
      } catch (e) {
        dispatch(setErrors(e.message));
        throw new Error(e.message);
      } finally {
        dispatch(setFetching(false));
      }
    }
  };
} //  }, [selectedConfig, prevConfig]);

export function fetchFields() {
  return async function getDataThunk(dispatch, getState) {
    const { selectedConfig, currentModel, prevModel, prevConfig } = getState().apiGeneration;
    if (
      selectedConfig &&
      currentModel &&
      (currentModel !== prevModel || selectedConfig !== prevConfig)
    ) {
      console.log("fetching fields");
      dispatch(setFields({}));
      dispatch(setFetching(true));
      try {
        const resp = await axios.post(API_GET_FIELDS_URI, {
          configName: selectedConfig,
          model: currentModel
        });
        dispatch(setFields(resp.data || {}));
      } catch (e) {
        dispatch(setErrors(e.message));
        throw new Error(e.message);
      } finally {
        dispatch(setFetching(false));
      }
    }
  };
}
//  }, [selectedConfig, currentModel, prevModel, prevConfig]);

export function fetchModelRecords(model, fields) {
  return async function getDataThunk(dispatch, getState) {
    dispatch(setModelRecords([]));
    dispatch(setFetching(true));
    try {
      dispatch(setModelRecords(dispatch(fetchRecords(model, fields))));
    } catch (e) {
      dispatch(setErrors(e.message));
      throw new Error(e.message);
    } finally {
      dispatch(setFetching(false));
    }
  };
}

export function fetchRecords(model, fields = ["display_name", "id"]) {
  return async function getDataThunk(dispatch, getState) {
    const { selectedConfig } = getState().apiGeneration;
    if (selectedConfig) {
      return await axios
        .post(API_GET_MODELS_URI, {
          configName: selectedConfig,
          model,
          fields: [["id", ">", 0]],
          input: { fields },
          outputrecords: { fields, limit: 1000 }
        })
        .then((resp) => resp.data);
    }
    throw new Error("Engine Configuration is not selected!");
  };
} //[selectedConfig] );

export function fetchAllRecords(model) {
  return async function getDataThunk(dispatch, getState) {
    const { selectedConfig, completeQuery } = getState().apiGeneration;
    if (selectedConfig) {
      try {
        dispatch(setFetching(true));
        return await axios
          .post(API_GET_MODELS_URI, {
            configName: selectedConfig,
            model,
            fields: completeQuery,
            outputrecords: { fields: [], limit: 1000 }
          })
          .then((resp) => resp.data);
      } catch (e) {
        dispatch(setFetching(false));
        throw new Error("Engine Configuration is not selected!");
      } finally {
        dispatch(setFetching(false));
      }
    }
  };
} //    [selectedConfig] );

export function fetchRecordById(model, id) {
  return async function getDataThunk(dispatch, getState) {
    const { currentConfig } = getState().engineConfig;
    if (currentConfig) {
      try {
        dispatch(setCurrentRecord(null));
        dispatch(setFetching(true));
        const record = await axios
          .post(API_GET_MODELS_URI, {
            configName: currentConfig.name,
            model,
            fields: [["id", "=", id]],
            input: { limit: 1 },
            outputrecords: {}
          })
          .then((resp) => resp.data)
          .then((records) => records?.shift())
          .finally(() => {
            dispatch(setFetching(false));
          });
        dispatch(setCurrentRecord(record));
      } catch (e) {
        dispatch(setErrors(e.message));
        throw new Error(e.message);
      } finally {
        dispatch(setFetching(false));
      }
    }
  };
} //    [currentConfig] )
