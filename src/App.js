import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import {
  AuthRoute,
  EnsureHasProfile,
  EnsureVerified,
  GuestRoute,
  RedirectIfVerified
} from "./middlewares";
import NoMatch from "./Pages/NoMatch";

import EngineConfigStack from "./Routes/EngineConfigStack";
import ApiGenerationStack from "./Routes/ApiGenerationStack";
import MyApiStack from "./Routes/MyApiStack";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import Verify from "./Pages/Verification";
import ApiView from "./Pages/ApiView";
import ForgotPassword from "./Pages/ForgotPassword";
import Payment from "./Pages/Payment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { decodeInfo, setCurrentConfig, setList } from "./store/engineConfigSlice";
import {
  setFieldType,
  setPrevConfig,
  setQBFields,
  setRequiredFields,
  setSelectedFields
} from "./store/apiGenerationSlice";
import {
  fetchCurrentUser,
  registerRequestInterceptor,
  setLoggedIn,
  setUserVerify
} from "./store/authSlice";
import i18next from "i18next";
import { fieldOperatorsByType } from "./store/FieldProperties";

function App() {
  const { list } = useSelector((state) => state.engineConfig);
  const { selectedConfig, fieldType, selectedFields, fields, QBFields } = useSelector(
    (state) => state.apiGeneration
  );
  const { user, userAttributes } = useSelector((state) => state.authUser);
  const { selectedLang } = useSelector((state) => state.language);
  const dispatch = useDispatch();

  //apiGeneration
  useEffect(() => {
    setCurrentConfig(list.find(({ name }) => name === selectedConfig));
    setPrevConfig(selectedConfig);
  }, [selectedConfig]);

  useEffect(() => {
    let filteredFields = Object.entries(fields).filter(([, f]) => f.required);
    if (selectedFields.length === 0) {
      dispatch(setSelectedFields(filteredFields.map(([name]) => name)));
      dispatch(setRequiredFields(filteredFields.map(([name]) => name)));
      // "x_address": {"type": "string"}
      filteredFields.map(([name, f]) => (fieldType[name] = { type: f.type }));
      filteredFields.map(([name, f]) => {
        let ops = fieldOperatorsByType[f.type]
          ? { operators: fieldOperatorsByType[f.type].operators }
          : {};
        dispatch(setQBFields([...QBFields, {
          ...ops,
          name: name,
          label: f.string,
          type: f.type,
          inputType: f.type == "boolean" ? "checkbox" : f.type == "integer" ? "number" : f.type,
          valueEditorType:
            f.type == "boolean" ? "checkbox" : f.type == "integer" ? "number" : f.type
        }]));
      });
      dispatch(setFieldType(fieldType));
    }
  }, [fields]);

  //authUser
  useEffect(() => {
    dispatch(fetchCurrentUser()).then(async () => {
      // await fetchUserAttributes();
    });
  }, []);
  useEffect(() => {
    if (user && user.getSignInUserSession()) {
      dispatch(registerRequestInterceptor(user));
      // Response interceptor
      // axios.interceptors.response.use((resp) => {
      //   if (resp.statusCode === 401) {
      //     refreshSession();
      //   }
      //   return resp;
      // });
      dispatch(setLoggedIn(true));
      dispatch(setUserVerify(!!user.attributes?.email_verified));
    } else {
      dispatch(setLoggedIn(false));
      dispatch(setUserVerify(false));
    }
  }, [user]);

  //engineconfig
  useEffect(() => {
    dispatch(
      setList(
        userAttributes
          .filter(({ Name }) => Name.includes("custom:connection"))
          .map(({ Name, Value }) => {
            return {
              id: Name,
              ...decodeInfo(Value)
            };
          })
      )
    );
  }, [userAttributes]);

  useEffect(() => {
    localStorage.setItem("lang", selectedLang);
    i18next.changeLanguage(selectedLang);
  }, [selectedLang]);

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/" element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route path="/" element={<RedirectIfVerified />}>
        <Route path="/verify" element={<Verify />} />
      </Route>
      <Route path="/" element={<AuthRoute />}>
        <Route path="/" element={<EnsureVerified />}>
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<EnsureHasProfile />}>
            <Route path="/home" element={<Home />} />
            <Route path="/my-apis/*" element={<MyApiStack />} />
            <Route path="/engine-config/*" element={<EngineConfigStack />} />
            <Route path="/api-generator/*" element={<ApiGenerationStack />} />
            <Route path="/api-view" element={<ApiView />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
