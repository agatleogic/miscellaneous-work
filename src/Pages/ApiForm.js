/* eslint-disable indent */
import { useCallback, useEffect, useState, useMemo } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Layout from "../Layout";
import Label from "../Component/Label";
import TextInput from "../Component/TextInput";
import PrimaryButton from "../Component/PrimaryButton";
import Select from "../Component/Select";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setSuccess, setErrors, setPersist } from "../store/alertSlice";
import { fetchAllRecords, fetchRecords } from "../store/apiGenerationSlice";
import {
  API_CREATE_MODEL_URI,
  API_DELETE_MODEL_URI,
  API_UPDATE_MODEL_URI
} from "../store/Constants";

const ApiForm = () => {
  const {
    currentModel,
    selectedRecord,
    currentRecord,
    selectedFields,
    selectedMethod: action,
    fetching,
    fields,
    selectedConfig,
    fieldType,
    requiredFields,
    models
  } = useSelector((state) => state.apiGeneration);
  const { currentConfig } = useSelector((state) => state.engineConfig);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({});
  const [chosenRecord, setChosenRecord] = useState({});
  const [allRecords, setAllRecords] = useState({});
  const [availableRecords, setAvailableRecords] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { t } = useTranslation("common");
  const navigator = useNavigate();

  const [allModelRecords, setAllModelRecords] = useState({});

  const mappedFields = useMemo(() => {
    return selectedFields.reduce((prev, f) => ({ ...prev, [f]: fields[f] }), {});
  }, [selectedFields]);

  useEffect(() => {
    dispatch(fetchAllRecords(currentModel)).then((res) => {
      setAllRecords(res);
      // setChosenRecord(res[0]);
      let options = res.map((rs) => {
        return [rs.id, rs.display_name];
      });
      setAvailableRecords(options);
    });
  }, [mappedFields]);

  useEffect(() => {
    if (currentRecord) {
      setFormValues(
        Object.keys(mappedFields).reduce(
          (prev, field) => ({ ...prev, [field]: currentRecord[field] }),
          {}
        )
      );
    }
  }, [currentRecord, mappedFields]);

  useEffect(() => {
    const models = Object.values(mappedFields)
      .filter(({ type }) => ["one2one", "many2one", "one2many", "many2many"].includes(type))
      .map(({ relation }) => relation);
    Promise.all(models.map((model) => dispatch(fetchRecords(model)))).then((all) => {
      setAllModelRecords(
        models.reduce(
          (prev, model, index) => ({
            ...prev,
            [model]: all[index].map(({ id, display_name }) => [id, display_name])
          }),
          {}
        )
      );
    });
  }, [mappedFields]);

  const handleFormChange = (field, value) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const renderField = useCallback(
    (name, options) => {
      const label = <Label htmlFor={name}>{options.string}</Label>;
      let input = null;
      if (options.type === "char") {
        input = (
          <TextInput
            id={name}
            required={options.required}
            type="text"
            placeholder={options.string}
            name={name}
            value={formValues[name]}
            onChange={(e) => handleFormChange(name, e)}
          />
        );
      } else if (options.type === "datetime") {
        input = (
          <TextInput
            id={name}
            required={options.required}
            type="datetime-local"
            placeholder={options.string}
            name={name}
            value={formValues[name]}
            onChange={(e) => handleFormChange(name, e)}
          />
        );
      } else if (options.type === "boolean") {
        input = (
          <input
            id={name}
            required={options.required}
            type="checkbox"
            placeholder={options.string}
            name={name}
            value={formValues[name]}
            onChange={(e) => handleFormChange(name, e)}
          />
        );
      } else if (options.type === "date") {
        input = (
          <TextInput
            id={name}
            required={options.required}
            type={options.type}
            placeholder={options.string}
            name={name}
            value={formValues[name]}
            onChange={(e) => handleFormChange(name, e)}
          />
        );
      } else if (options.type === "float") {
        input = (
          <TextInput
            id={name}
            required={options.required}
            type="number"
            step="0.01"
            placeholder={options.string}
            name={name}
            value={formValues[name]}
            onChange={(e) => handleFormChange(name, e)}
          />
        );
      } else if (options.type === "integer") {
        input = (
          <TextInput
            id={name}
            required={options.required}
            type="number"
            placeholder={options.string}
            name={name}
            value={formValues[name]}
            onChange={(e) => handleFormChange(name, e)}
          />
        );
      } else if (options.type === "selection") {
        input = (
          <Select
            id={name}
            name={name}
            value={formValues[name] || ""}
            onChange={(e) => handleFormChange(name, e)}
            required={options.required}
            options={options.selection}
          />
        );
      } else if (options.type === "binary") {
        input = (
          <TextInput
            id={name}
            required={options.required}
            type="file"
            placeholder={options.string}
            name={name}
            value={formValues[name]}
            onChange={(e) => handleFormChange(name, e)}
          />
        );
      } else if (options.type === "one2one" || options.type === "many2one") {
        input = (
          <Select
            id={name}
            required={options.required}
            name={name}
            value={
              (Array.isArray(formValues[name])
                ? [...formValues[name]].shift()
                : formValues[name]) || ""
            }
            onChange={(e) => {
              handleFormChange(name, e);
            }}
            options={allModelRecords?.[options.relation] || []}
          />
        );
      } else if (options.type === "one2many" || options.type === "many2many") {
        // checkbox or multiselect
        input = (
          <Select
            multiple={true}
            id={name}
            required={options.required}
            placeholder={options.string}
            name={name}
            value={formValues[name] || []}
            onChange={(e) => handleFormChange(name, e)}
            options={allModelRecords?.[options.relation] || []}
          />
        );
      } else {
        input = (
          <TextInput
            id={name}
            required={options.required}
            type="text"
            placeholder={options.string}
            name={name}
            value={formValues[name]}
            onChange={(e) => handleFormChange(name, e)}
          />
        );
      }
      return (
        <>
          {label}
          {input}
        </>
      );
    },
    [formValues, allModelRecords]
  );

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let p = {
        configName: selectedConfig,
        model: currentModel,
        serviceValidation: true,
        required: requiredFields, // ["x_name", "x_address"],
        inputFields: selectedFields,
        properties: fieldType,
        input: formValues
      };
      const resp = await axios.post(API_CREATE_MODEL_URI, p);
      console.log(resp);
      dispatch(setSuccess( "Data created!"));
      dispatch(setPersist(true));
      navigator("/api-generator/view");
    } catch (e) {
      dispatch(setErrors(e.message));
      throw new Error(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let p = {
        configName: selectedConfig,
        model: currentModel,
        serviceValidation: true,
        required: requiredFields, // ["x_name", "x_address"],
        inputFields: selectedFields,
        properties: fieldType,
        input: formValues,
        id: selectedRecord ? selectedRecord : t("YOUR_RECORD_ID")
      };

      const resp = await axios.post(API_UPDATE_MODEL_URI, p);
      console.log(resp);
      dispatch(setSuccess("Data updated!"));
      dispatch(setPersist(true));
      navigator("/api-generator");
    } catch (e) {
      dispatch(setErrors(e.message));
      throw new Error(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRecordChange = async (id) => {
    // handle record change
    // console.log(e, allRecords);
    let matched = allRecords.find((res) => id == res.id);
    setChosenRecord(matched);
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const resp = await axios.post(API_DELETE_MODEL_URI, {
        configName: currentConfig.name,
        model: currentModel,
        id: selectedRecord
      });
      console.log(resp);
      dispatch(setSuccess("Data deleted!"));
      dispatch(setPersist(true));
      navigator("/api-generator");
    } catch (e) {
      dispatch(setErrors(e.message));
      throw new Error(e.message);
    } finally {
      setSubmitting(false);
    }
  };
  if (!(currentModel && action)) {
    return <Navigate to="/api-generator" replace />;
  }

  const model = useMemo(() => {
    return models.find(({ model }) => model === currentModel);
  }, [currentModel]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-start h-full">
        <Link to="/api-generator/view">
          <PrimaryButton type="button">{t("Go Back")}</PrimaryButton>
        </Link>
        <form className="border rounded p-6 shadow mt-6 bg-white relative w-full">
          <h3 className="text-gray-700 font-semibold text-xl text-center mb-6 uppercase">
            {action} ({model?.display_name})
          </h3>
          {fetching ? <p className="text-center text-gray-700">Fetching record...</p> : ""}

          {["view"].includes(action) ? (
            <Select
              id="record"
              required={true}
              placeholder="Select Record"
              name="record"
              onChange={(e) => handleRecordChange(e)}
              options={availableRecords}
            />
          ) : null}

          <div className="flex lg:flex-row flex-col flex-wrap">
            {[("delete", "view")].includes(action) ? (
              <div className="w-full overflow-auto">
                <table className="w-full text-left">
                  <tbody>
                    {Object.entries(chosenRecord || {}).map(([name, value]) => (
                      <tr key={name}>
                        <th className="p-2 border">{fields[name]?.string}</th>
                        <td className="p-2 border">
                          {Array.isArray(value) ? value.join(",") : value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              Object.entries(mappedFields).map(([name, options]) => (
                <div key={name} className="flex flex-col space-y-2 lg:w-1/2 w-full lg:px-4 py-4">
                  {JSON.stringify(options)}
                  {renderField(name, options)}
                </div>
              ))
            )}
            <div className="flex justify-center w-full mt-4">
              {action === "create" ? (
                <PrimaryButton type="button" onClick={handleCreateSubmit} disabled={submitting}>
                  {t("Create")}
                </PrimaryButton>
              ) : action === "delete" ? (
                <PrimaryButton type="button" onClick={handleDeleteSubmit} disabled={submitting}>
                  {t("Delete")}
                </PrimaryButton>
              ) : action === "update" ? (
                <PrimaryButton type="button" onClick={handleUpdateSubmit} disabled={submitting}>
                  {t("Update")}
                </PrimaryButton>
              ) : (
                ""
              )}
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default ApiForm;
