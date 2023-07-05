import React, { useCallback, useEffect, useMemo, useState } from "react";
import Label from "../Component/Label";
import Select from "../Component/Select";
import Layout from "../Layout";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../Component/PrimaryButton";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import TextInput from "../Component/TextInput";
import PageTitle from "../Component/PageTitle";
import { Tooltip } from "@material-tailwind/react";
import QueryBuilder from "react-querybuilder";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { materialControlElements, QueryBuilderMaterial } from "@react-querybuilder/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFields,
  fetchModelRecords,
  fetchModels,
  fetchRecords,
  setCompleteQuery,
  setCurrentModel,
  setFieldType,
  setFilterFields,
  setModelRecords,
  setPrevModel,
  setQBFields,
  setRequiredFields,
  setSelectedConfig,
  setSelectedFields,
  setSelectedMethod,
  setSelectedRecord
} from "../store/apiGenerationSlice";
import { save } from "../store/myApiSlice";
import { fieldOperatorsByType } from "../store/FieldProperties";
import { fetchUserAttributes } from "../store/authSlice";
const muiTheme = createTheme();
const METHOD_OPTIONS = [
  ["create", "Create"],
  ["update", "Update"],
  ["delete", "Delete"],
  ["view", "View"]
  // ["execute_method", "Execute Method"]
];

const ApiGeneration = () => {
  const { list: engineConfigs } = useSelector((state) => state.engineConfig);
  const {
    userAttributes: { length: userAttrLength }
    // refreshSession
  } = useSelector((state) => state.authUser);
  const {
    models,
    fetching,
    currentModel,
    fields,
    modelRecords,
    selectedRecord,
    selectedFields,
    filterFields,
    requiredFields,
    fieldType,
    selectedMethod,
    selectedConfig,
    completeQuery,
    QBFields
  } = useSelector((state) => state.apiGeneration);
  const { saving } = useSelector((state) => state.myApi);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const [saveApi, setSaveApi] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fieldNameFilter, setFieldNameFilter] = useState("");
  const [labelNameFilter, setLableNameFilter] = useState("");
  // const [fieldSlugFilter, setFieldSlugFilter] = useState("");
  const [showingRetryButton, setShowingRetryButton] = useState(false);
  const navigate = useNavigate();
  let searchQuery = [];
  const [query, setQuery] = useState({
    combinator: "and",
    rules: []
  });

  const [filteredFields, setFilteredFields] = useState(fields);

  useEffect(() => {
    if (["update", "delete", "view"].includes(selectedMethod)) {
      if (modelRecords.length === 0) {
        dispatch(fetchModelRecords(currentModel));
      }
    }
    console.log(selectedMethod, selectedFields);
    if (["update", "create"].includes(selectedMethod)) {
      let newfields = selectedFields.filter((elem) => !fields[elem].readonly);
      console.log(newfields);
      dispatch(setSelectedFields(newfields));
    }
  }, [currentModel, selectedMethod]);

  const toggleSelectedFields = (field, type) => {
    if (selectedFields.includes(field)) {
      dispatch(setSelectedFields(selectedFields.filter((f) => f !== field)));
      dispatch(setQBFields(QBFields.filter((f) => f.name !== field)));
    } else {
      dispatch(setSelectedFields([...selectedFields, field]));
      let f = fields[field];
      let ops = fieldOperatorsByType[f.type]
        ? { operators: fieldOperatorsByType[f.type].operators }
        : {};

      if (
        !f.readOnly &&
        (f.type === "selection" ||
          f.type === "one2one" ||
          f.type === "many2one" ||
          f.type === "one2many" ||
          f.type === "many2many")
      ) {
        dispatch(fetchRecords(fields[field].relation)).then((response) => {
          let options = response.map((obj) => {
            return { label: obj.display_name + "(id:" + obj.id + ")", name: obj.id };
          });
          console.log("response", options, {
            ...ops,
            values: options,
            name: f.name,
            label: f.string,
            // type: "select",
            inputType: "select",
            valueEditorType: "select"
          });
          dispatch(
            setQBFields([
              ...QBFields,
              {
                values: options,
                name: f.name,
                label: f.string,
                // type: f.type,
                inputType: "select",
                valueEditorType: "select"
              }
            ])
          );
        });
      } else {
        dispatch(
          setQBFields([
            ...QBFields,
            {
              // ...ops,
              name: f.name,
              label: f.string,
              // type: f.type,
              inputType: f.type == "boolean" ? "checkbox" : f.type == "integer" ? "number" : f.type,
              valueEditorType:
                f.type == "boolean" ? "checkbox" : f.type == "integer" ? "number" : f.type
            }
          ])
        );
      }
      console.log(fields, QBFields);
    }
    togglefieldType(field, type);
  };

  const togglefieldType = (field, type) => {
    if (fieldType && fieldType[field]) {
      delete fieldType[field];
    } else {
      fieldType[field] = { type };
    }
    dispatch(setFieldType(fieldType));
  };

  // const toggleSelectedFilterFields = (field) => {
  //   console.log(filterFields, field);
  //   if (filterFields.indexOf(field) > -1) {
  //     dispatch(setFilterFields(filterFields.filter((f) => f !== field)));
  //   } else {
  //     dispatch(setFilterFields([...filterFields, field]));
  //   }
  // };

  useEffect(() => {
    if (userAttrLength === 0) {
      dispatch(fetchUserAttributes());
    }
  }, []);

  useEffect(() => {
    setFilteredFields(fields);
  }, [fields]);

  useEffect(() => {
    // console.log(fields);
    let keys = Object.keys(fields).filter((element) => {
      let nameret = true;
      let labelret = true;
      if (labelNameFilter) {
        labelret = fields[element].string.toLowerCase().includes(labelNameFilter.toLowerCase());
      }
      if (fieldNameFilter) {
        nameret = element.toLowerCase().includes(fieldNameFilter.toLowerCase());
      }
      return nameret && labelret;
    });
    let newArr = {};
    keys.map((elem) => (newArr[elem] = fields[elem]));
    setFilteredFields(newArr);
  }, [fieldNameFilter, labelNameFilter]);

  useEffect(() => {
    dispatch(fetchFields());
    dispatch(setPrevModel(currentModel));
  }, [currentModel]);

  useEffect(() => {
    searchQuery = [];
    checkHaveRuleWithin(query);
    dispatch(setCompleteQuery(searchQuery));
    console.log("completeQuery ", query, JSON.stringify(completeQuery));
  }, [query]);

  useEffect(() => {
    let execute = async () => {
      try {
        dispatch(fetchModels());
      } catch (e) {
        // Auto Refresh
        console.log("fetching models failed");
        try {
          if (e?.request?.status === 401 || e?.request?.status === 403) {
            // console.log("refreshing session");
            // await refreshSession();
            // console.log("session refreshed");
          }
          console.log("fetching models again");
          dispatch(fetchModels());
        } catch (e) {
          console.log("something went wrong on retry", e);
          setShowingRetryButton(true);
        }
      }
    };
    execute();
  }, [selectedConfig]);

  const checkHaveRuleWithin = (q) => {
    if (q && q.rules && q.rules.length > 0 && q.combinator) {
      if (q.rules.length > 1) searchQuery.push(q.combinator == "and" ? "&" : "|");
      q.rules.map((rule) => {
        if (rule && rule.field && rule.operator) {
          searchQuery.push([rule.field, rule.operator, rule.value]);
        }
        if (rule.rules && rule.rules.length > 0) {
          checkHaveRuleWithin(rule);
        }
      });
    }
  };
  const engineOptions =
    useMemo(() => {
      return engineConfigs?.map(({ name }) => [name, name]);
    }, [engineConfigs]) || [];

  const modelOptions = useMemo(() => {
    return models?.map(({ model, display_name }) => [model, display_name]) || [];
  }, [models]);

  const recordsOptions = useMemo(() => {
    return modelRecords?.map(({ id, display_name }) => [id, display_name]) || [];
  }, [modelRecords]);

  const handleSelectConfig = useCallback(
    (confId) => {
      dispatch(setSelectedConfig(confId));
    },
    [engineConfigs]
  );

  const handleModelChange = useCallback(
    (model) => {
      dispatch(setCurrentModel(model));
      dispatch(setModelRecords([]));
      dispatch(setSelectedRecord(null));
      dispatch(setSelectedFields([]));
      dispatch(setSelectedMethod(null));
    },
    [models]
  );

  const handleMethodChange = (method) => {
    dispatch(setSelectedMethod(method));
  };

  const handleSave = async () => {
    let payload = {
      config: selectedConfig,
      model: currentModel,
      serviceValidation: true,
      required: requiredFields,
      inputFields: selectedFields,
      properties: fieldType,
      outputrecords: filterFields,
      action: selectedMethod,
      apiName: fileName,
      filename: fileName,
      record: selectedRecord,
      fields: completeQuery
    };
    dispatch(save(payload));
    navigate("/my-apis");
  };

  const handleRecordChange = (recordId) => {
    dispatch(setSelectedRecord(recordId));
    console.log(selectedRecord);
  };

  const isSelected = useCallback(
    (name) => {
      return selectedFields.includes(name);
    },
    [selectedFields]
  );

  const clearAll = () => {
    setQuery({ combinator: "and", rules: [] });
  };

  const clearValues = () => {
    dispatch(setSelectedConfig(null));
    dispatch(setCurrentModel(null));
    dispatch(setSelectedRecord(null));
    dispatch(setSelectedMethod(""));
    dispatch(setSelectedFields([]));
    dispatch(setRequiredFields([]));
    dispatch(setFilterFields([]));
    dispatch(setFieldType({}));
    dispatch(setQBFields([]));
    setQuery({ combinator: "and", rules: [] });
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-start w-full h-full">
        <PageTitle>{t("API Generator")}</PageTitle>
        <div className="lg:max-w-screen-md w-full">
          <Label htmlFor="engineConfig">{t("Connection")}</Label>
          <div className="flex space-x-4 items-center">
            <Select
              id="engineConfig"
              value={selectedConfig || ""}
              options={engineOptions}
              onChange={handleSelectConfig}
              disabled={fetching}
            />
            {showingRetryButton ? (
              <PrimaryButton onClick={() => dispatch(fetchModels())} disabled={fetching}>
                {t("Retry")}
              </PrimaryButton>
            ) : (
              ""
            )}
            {fetching ? <h4 className="text-sm">Fetching...</h4> : null}
            <PrimaryButton type="button" onClick={clearValues}>
              {t("Clear")}
            </PrimaryButton>
          </div>
        </div>
        {selectedConfig && models.length ? (
          <div className="flex flex-col space-y-4 max-w-screen-lg w-full">
            <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-6 lg:space-y-0 mt-6 w-full">
              <div className="w-1/3">
                <Label htmlFor="model">{t("Model")}</Label>
                <Select
                  id="model"
                  value={currentModel || ""}
                  options={modelOptions}
                  onChange={handleModelChange}
                />
              </div>
              {currentModel ? (
                <>
                  <div className="w-1/3">
                    <Label htmlFor="method">{t("API Action")}</Label>
                    <Select
                      id="method"
                      value={selectedMethod || ""}
                      options={METHOD_OPTIONS}
                      onChange={handleMethodChange}
                    />
                  </div>
                  {["update", "delete", "view"].includes(selectedMethod) ? (
                    <div className="w-1/3">
                      <Label htmlFor="record">{t("Choose record")}</Label>
                      <Select
                        id="record"
                        value={selectedRecord || ""}
                        options={recordsOptions}
                        onChange={handleRecordChange}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
            </div>
            {currentModel ? (
              <div className="bg-blue-800 bg-opacity-10 p-4 rounded w-full max-w-screen-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-4">{t("Selected Fields")}:</h3>
                <ol className="list-decimal flex flex-wrap -mx-2">
                  {selectedFields.map((field) => (
                    <li className="list-item list-inside px-2" key={field}>
                      {fields[field]?.string}
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              ""
            )}
            {currentModel ? (
              ["view"].includes(selectedMethod) ? (
                <ThemeProvider theme={muiTheme}>
                  <div className="relative">
                    <div className="absolute top-8 right-0 h-16 w-32">
                      <button
                        type="button"
                        className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-sizeSmall MuiButton-containedSizeSmall ruleGroup-addGroup css-9aa3p4-MuiButtonBase-root-MuiButton-root"
                        onClick={clearAll}>
                        {t("Clear All")}
                      </button>
                    </div>
                  </div>

                  <QueryBuilderMaterial>
                    <QueryBuilder
                      fields={QBFields}
                      showCombinatorsBetweenRules={true}
                      showNotToggle={true}
                      query={query}
                      onQueryChange={setQuery}
                      controlElements={materialControlElements}
                    />
                  </QueryBuilderMaterial>
                </ThemeProvider>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            {selectedMethod ? (
              <div className="flex justify-center space-x-4">
                <PrimaryButton onClick={() => setSaveApi(true)}>{t("Save Api")}</PrimaryButton>
                <Link to="view">
                  <PrimaryButton>{t("View Api")}</PrimaryButton>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        {saveApi && (
          <div className="mt-6 flex lg:flex-row flex-col lg:space-x-4 space-y-4 lg:space-y-0 items-center bg-slate-300 p-4 rounded">
            <div>
              {/* <Label htmlFor="file_name">{t("File Name")}</Label> */}
              <TextInput
                onChange={setFileName}
                value={fileName}
                id="file_name"
                name="file_name"
                placeholder="Enter file name"
              />
            </div>
            <div className="flex space-x-4">
              <PrimaryButton onClick={handleSave} disabled={saving}>
                {t("Save")}
              </PrimaryButton>
              <PrimaryButton onClick={() => setSaveApi(false)}>{t("Close")}</PrimaryButton>
            </div>
          </div>
        )}
        {/* {currentModel && ["create", "update"].includes(selectedMethod) ? ( */}
        {currentModel ? (
          <div className="flex flex-col items-center space-y-8 mt-8 w-full">
            <div className="w-full max-w-screen-lg overflow-auto">
              <table className="text-left bg-white w-full whitespace-nowrap">
                <thead>
                  <tr>
                    <th className="border p-2">{t("Select")}</th>
                    <th className="border p-2">
                      <label className="relative block">
                        <span className="sr-only">Search</span>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                          <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
                            ...
                          </svg>
                        </span>
                        <input
                          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                          placeholder={"Search for " + t("Field Name")}
                          type="text"
                          value={fieldNameFilter}
                          id="fieldNameFilter"
                          name="fieldNameFilter"
                          onChange={(e) => setFieldNameFilter(e.target.value)}
                        />
                      </label>
                    </th>
                    <th className="border p-2">
                      <label className="relative block">
                        <span className="sr-only">Search</span>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                          <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
                            ...
                          </svg>
                        </span>
                        <input
                          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                          placeholder={"Search for " + t("Field Label")}
                          type="text"
                          value={labelNameFilter}
                          id="labelNameFilter"
                          name="labelNameFilter"
                          onChange={(e) => setLableNameFilter(e.target.value)}
                        />
                      </label>
                    </th>
                    <th className="border p-2">{t("Required")}</th>
                    <th className="border p-2">{t("Read Only")}</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(filteredFields).map(([name, options]) => (
                    <tr
                      key={name}
                      className={
                        !(options.readonly && !["view"].includes(selectedMethod)) ? "" : "disabled"
                      }>
                      <td className="border p-2">
                        {!(options.readonly && !["view"].includes(selectedMethod)) ? (
                          <input
                            type="checkbox"
                            value={name}
                            checked={isSelected(name)}
                            disabled={options.required}
                            onChange={(e) => toggleSelectedFields(e.target.value, options.type)}
                          />
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="border p-2">
                        <Tooltip
                          content={options.type}
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 }
                          }}
                          placement="top">
                          <div>{name}</div>
                        </Tooltip>
                      </td>
                      <td className="border p-2">{options.string}</td>
                      <td className="border p-2">
                        <input type="checkbox" checked={options.required} readOnly />
                      </td>
                      <td className="border p-2">
                        <input type="checkbox" checked={options.readonly} readOnly />
                      </td>
                    </tr>
                  ))}
                  {Object.keys(fields).length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center border">
                        Loading fields...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
};

export default ApiGeneration;
