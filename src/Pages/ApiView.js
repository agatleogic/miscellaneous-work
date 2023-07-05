import React, { useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Layout from "../Layout";
import PrimaryButton from "../Component/PrimaryButton";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  API_BASE_URL,
  API_CREATE_MODEL_URI,
  API_DELETE_MODEL_URI,
  API_GET_MODELS_URI,
  API_UPDATE_MODEL_URI
} from "../store/Constants";

const Tab = ({ active, children, onSelect, value }) => {
  return (
    <div
      onClick={() => onSelect(value)}
      className={
        "text-lg border-b-4 cursor-pointer p-2 " +
        (active ? "font-semibold border-blue-800" : "border-gray-400 hover:border-blue-800")
      }>
      {children}
    </div>
  );
};

Tab.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  onSelect: PropTypes.func,
  value: PropTypes.any
};

const ApiView = () => {
  const { t } = useTranslation("common");
  const [currentTab, setCurrentTab] = useState("api");
  const {
    selectedConfig,
    currentModel,
    selectedFields,
    selectedMethod,
    fieldType,
    requiredFields,
    filterFields,
    selectedRecord,
    completeQuery
  } = useSelector((state) => state.apiGeneration);

  if (!selectedMethod) {
    return <Navigate to={"/api-generator"} />;
  }

  const apiDetails = useMemo(() => {
    const p = {
      action: selectedMethod,
      model: currentModel
    };
    if (selectedMethod === "create") {
      p.input = selectedFields?.reduce((prev, f) => ({ ...prev, [f]: t("YOUR_VALUE") }), {});
    } else if (selectedMethod === "delete") {
      p.id = selectedRecord ? selectedRecord : t("YOUR_RECORD_ID");
    } else if (selectedMethod === "update") {
      p.input = selectedFields?.reduce((prev, f) => ({ ...prev, [f]: t("YOUR_VALUE") }), {});
      p.id = selectedRecord ? selectedRecord : t("YOUR_RECORD_ID");
    } else if (selectedMethod === "view") {
      p.fields = completeQuery;
      p.outputrecords = {
        fields: selectedFields
      };
    }
    return p;
  }, [currentModel, selectedMethod, selectedFields, selectedRecord]);

  const uriMap = {
    create: API_CREATE_MODEL_URI,
    update: API_UPDATE_MODEL_URI,
    delete: API_DELETE_MODEL_URI,
    view: API_GET_MODELS_URI
  };
  const endpoint = useMemo(() => {
    return API_BASE_URL + uriMap[selectedMethod];
  }, [selectedMethod]);

  const METHOD = "POST";

  const payload = useMemo(() => {
    const p = {
      configName: selectedConfig,
      model: currentModel
    };
    console.log("selectedRecord", selectedRecord);
    if (selectedMethod === "create") {
      p.serviceValidation = true;
      p.required = requiredFields; // ["x_name", "x_address"],
      p.inputFields = selectedFields;
      p.properties = fieldType;
      p.input = selectedFields?.reduce((prev, f) => ({ ...prev, [f]: t("YOUR_VALUE") }), {});
    } else if (selectedMethod === "delete") {
      p.id = selectedRecord ? selectedRecord : t("YOUR_RECORD_ID");
    } else if (selectedMethod === "update") {
      p.serviceValidation = true;
      p.required = requiredFields; // ["x_name", "x_address"],
      p.inputFields = selectedFields;
      p.properties = fieldType;
      p.input = selectedFields?.reduce((prev, f) => ({ ...prev, [f]: t("YOUR_VALUE") }), {});
      p.id = selectedRecord ? selectedRecord : t("YOUR_RECORD_ID");
    } else if (selectedMethod === "view") {
      p.properties = fieldType;
      p.fields = completeQuery;
      p.outputrecords = { fields: selectedFields };
      p.id = selectedRecord ? selectedRecord : t("YOUR_RECORD_ID");
    }
    return p;
  }, [
    selectedMethod,
    selectedFields,
    fieldType,
    requiredFields,
    selectedConfig,
    currentModel,
    filterFields,
    selectedRecord
  ]);

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: t("YOUR_ID_TOKEN")
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-start h-full w-full">
        <div className="flex lg:flex-row items-center flex-col lg:space-x-4 space-y-4 lg:space-y-0">
          <Link to="/api-generator/form" replace>
            <PrimaryButton>{t("Test Api")}</PrimaryButton>
          </Link>
        </div>
        <div className="flex flex-row space-x-4 mt-5 mb-2">
          {[
            ["api", "API"],
            ["web_api", "Web API"]
          ].map(([value, label]) => (
            <Tab
              key={value}
              value={value}
              active={value === currentTab}
              onSelect={(v) => setCurrentTab(v)}>
              {label}
            </Tab>
          ))}
        </div>
        <div className="w-full lg:w-auto p-4 border shadow bg-white">
          {currentTab === "api" ? (
            <div className="prose overflow-auto">
              <pre>{JSON.stringify(apiDetails, null, 4)}</pre>
            </div>
          ) : (
            <div className="flex flex-col flex-auto space-y-6">
              <div>
                <p className="text-xs text-gray-600 leading-loose">Endpoint:</p>
                <p className="text-base">{endpoint}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 leading-loose">Method:</p>
                <p className="text-base">{METHOD}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 leading-loose">Headers:</p>
                <div className="prose overflow-auto">
                  <pre>{JSON.stringify(headers, null, 4)}</pre>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-600 leading-loose">Payload:</p>
                <div className="prose overflow-auto">
                  <pre>{JSON.stringify(payload, null, 4)}</pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default ApiView;
