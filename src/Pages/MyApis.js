import React, { useEffect, useMemo } from "react";
import Layout from "../Layout";
import { useNavigate } from "react-router-dom";
// import ReactTooltip from "react-tooltip";
import Select from "./../Component/Select";
import TextInput from "../Component/TextInput";
import { useTranslation } from "react-i18next";
import PageTitle from "../Component/PageTitle";
import PrimaryButton from "../Component/PrimaryButton";
import DangerButton from "../Component/DangerButton";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentModel,
  setFieldType,
  setModelRecords,
  setRequiredFields,
  setSelectedConfig,
  setSelectedFields,
  setSelectedMethod,
  setSelectedRecord
} from "../store/apiGenerationSlice";
import { clearFilters, destroy, fetchList, setFilters } from "../store/myApiSlice";

const MyApis = () => {
  const { list, deleting, fetching, filters } = useSelector((state) => state.myApi);
  const { prevModel } = useSelector((state) => state.apiGeneration);
  const dispatch = useDispatch();
  // const { switchToolTip } = useSelector(state=>state.toolTip);
  const { t } = useTranslation("common");
  const navigate = useNavigate();

  const updateFilterValue = (key, value) => {
    dispatch(setFilters({ ...filters, [key]: value }));
  };

  const mappedList = useMemo(() => {
    return list.map(({ fileContent, filePath, size }) => {
      try {
        return { ...JSON.parse(fileContent), filePath, size };
      } catch (e) {
        return {};
      }
    });
  }, [list]);

  const configOptions = useMemo(() => {
    return mappedList
      .map(({ config }) => config)
      .filter((v, i, a) => a.indexOf(v) === i)
      .map((e) => [e, e]);
  }, [mappedList]);

  const modelOptions = useMemo(() => {
    return mappedList
      .map(({ model }) => model)
      .filter((v, i, a) => a.indexOf(v) === i)
      .map((e) => [e, e]);
  }, [mappedList]);

  const actionOptions = useMemo(() => {
    return mappedList
      .map(({ action }) => action)
      .filter((v, i, a) => a.indexOf(v) === i)
      .map((e) => [e, e]);
  }, [mappedList]);

  const filteredList = useMemo(() => {
    return mappedList.filter(({ filename: name, config, model, action }) => {
      return (
        new RegExp(filters.search, "gi").test(name) &&
        (!filters.config || config === filters.config) &&
        (!filters.model || model === filters.model) &&
        (!filters.action || action === filters.action)
      );
    });
  }, [mappedList, filters]);

  useEffect(() => {
    console.log(filteredList);
    dispatch(fetchList());
  }, []);

  const handleDelete = async (config, filePath) => {
    let text = "Are you sure to delete?";
    if (confirm(text)) {
      dispatch(destroy(config, filePath));
      dispatch(fetchList());
    }
  };

  const onView = (api) => {
    dispatch(setSelectedConfig(api.config));
    dispatch(setCurrentModel(api.model));
    dispatch(setSelectedMethod(api.action));
    dispatch(setSelectedRecord(api.record));
    dispatch(setSelectedFields(api.inputFields));
    dispatch(setRequiredFields(api.required));
    dispatch(setFieldType(api.properties));
    navigate("/api-view");
  };

  const onEdit = (api) => {
    dispatch(setSelectedConfig(api.config));
    dispatch(setCurrentModel(api.model));
    dispatch(setSelectedMethod(api.action));
    dispatch(setSelectedRecord(api.record));
    dispatch(setSelectedFields(api.fields));
    dispatch(setRequiredFields(api.fields));
    dispatch(setFieldType(api.fields));
    if (prevModel !== api.model) {
      dispatch(setModelRecords([]));
    }
    navigate("/api-generator");
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-start w-full h-full">
        <PageTitle>{t("My APIs")}</PageTitle>
        <div className="flex lg:flex-row flex-col items-center justify-between lg:space-x-4 mb-6 space-y-4 lg:space-y-0 w-full">
          <Select
            options={configOptions}
            value={filters.config}
            onChange={(v) => updateFilterValue("config", v)}
            placeholder="Config"
          />
          <Select
            options={modelOptions}
            value={filters.model}
            onChange={(v) => updateFilterValue("model", v)}
            placeholder="Model"
          />
          <Select
            options={actionOptions}
            value={filters.action}
            onChange={(v) => updateFilterValue("action", v)}
            placeholder="Action"
          />
          <TextInput
            value={filters.search}
            onChange={(v) => updateFilterValue("search", v)}
            type="search"
            placeholder="Search..."
          />
          <PrimaryButton type="button" onClick={() => dispatch(clearFilters({ ...filters }))}>
            {t("Clear")}
          </PrimaryButton>
        </div>
        {fetching ? (
          <div className="flex justify-evenly flex-wrap flex-auto items-center">
            <h3 className="text-lg font-medium text-gray-700">Fetching...</h3>
          </div>
        ) : list.length === 0 ? (
          <h3 className="text-lg font-medium text-gray-700">There is no saved APIs here...</h3>
        ) : filteredList.length === 0 ? (
          <h3 className="text-lg font-medium text-gray-700">
            The API you're looking for couldn't be found!
          </h3>
        ) : (
          <div className="grid lg:grid-cols-3 gap-4 w-full">
            {filteredList.map((api, i) => (
              <div key={i} className="flex flex-col border rounded p-4 space-y-4 shadow bg-white">
                <h3 className="text-xl text-center border-b pb-4">{api.filename}</h3>
                <table className="flex-auto px-4">
                  <tbody>
                    <tr>
                      <td className="text-xs text-gray-600">Config:</td>
                      <td className="text-base">{api.config}</td>
                    </tr>
                    <tr>
                      <td className="text-xs text-gray-600">Model:</td>
                      <td className="text-base">{api.model}</td>
                    </tr>
                    <tr>
                      <td className="text-xs text-gray-600">Action:</td>
                      <td className="text-base">{api.action}</td>
                    </tr>
                    <tr>
                      <td className="text-xs text-gray-600">Fields:</td>
                      <td className="text-base">{api.fields?.join(", ")}</td>
                    </tr>
                    {api.record ? (
                      <tr>
                        <td className="text-xs text-gray-600">Record ID:</td>
                        <td className="text-base">{api.record}</td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
                <div className="flex justify-evenly mt-4 border-t pt-4">
                  <PrimaryButton type="button" onClick={() => onView(api)}>
                    {t("View")}
                  </PrimaryButton>
                  <PrimaryButton type="button" onClick={() => onEdit(api)}>
                    {t("Edit")}
                  </PrimaryButton>
                  <DangerButton
                    type="button"
                    disabled={deleting}
                    onClick={() => handleDelete(api.config, api.filePath)}>
                    {t("Delete")}
                  </DangerButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyApis;
