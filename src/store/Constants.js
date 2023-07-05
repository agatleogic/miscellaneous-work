const API_BASE_URL = "https://api.r3api.com/";
const API_GET_MODELS_URI = "r3apisearch/r3apisearch";
const API_GET_FIELDS_URI = "r3apigetfields/r3apigetfields";
const API_CREATE_MODEL_URI = "r3apicreate/r3apicreate";
const API_UPDATE_MODEL_URI = "r3apiupdate/r3apiupdate";
const API_DELETE_MODEL_URI = "r3apidelete/r3apidelete";
const API_TEST_URI = "/r3apitest/r3apitest";
const API_FETCH_FILE = "execute/prestoapi_execute";
const API_FETCH_FILE_LIST = "listfilesfroms3/listfilesfroms3";
const API_SAVE_FILE = "savefileins3/savefileins3";
const API_EXECUTE_METHOD = "execute/prestoapi_execute";
const API_DELETE_FILE = "deletefilefroms3/deletefilefroms3";
const DEFAULT_CONFIG = "prestocharts-inc";
const USER_PROFILE_MODEL = "res.partner";
const LANG_OPTIONS = [
  ["English", "en"],
  ["French", "fr"],
  ["German", "de"],
  ["Spaniah", "es"]
];

export {
  API_BASE_URL,
  API_EXECUTE_METHOD,
  LANG_OPTIONS,
  API_GET_MODELS_URI,
  API_GET_FIELDS_URI,
  API_CREATE_MODEL_URI,
  API_UPDATE_MODEL_URI,
  API_DELETE_MODEL_URI,
  API_FETCH_FILE,
  API_FETCH_FILE_LIST,
  API_SAVE_FILE,
  API_DELETE_FILE,
  API_TEST_URI,
  DEFAULT_CONFIG,
  USER_PROFILE_MODEL
};
