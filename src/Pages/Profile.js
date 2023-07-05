import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";
import PrimaryButton from "../Component/PrimaryButton";
import TextInput from "../Component/TextInput";
import Select from "../Component/Select";
import Layout from "../Layout";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOdooProfile, searchOdooProfile, updateOdooProfile } from "../store/authSlice";
import { setErrors, setPersist, setSuccess } from "../store/alertSlice";
import { API_GET_MODELS_URI, DEFAULT_CONFIG } from "../store/Constants";

const Profile = () => {
  const { t } = useTranslation("common");
  const [formValues, setFormValues] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [countries, setCountries] = useState([]);
  const checkboxRef = useRef();
  const [states, setStates] = useState([]);
  const { profile, user } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const currentLanguage = useState(localStorage.getItem("lang") || "en");
  const navigate = useNavigate();
  useEffect(() => {
    if (profile) {
      const values = [
        "name",
        "email",
        "phone",
        "mobile",
        "street",
        "country_id",
        "state_id",
        "city",
        "zip",
        "website",
        "vat",
        "is_company",
        "x_userlanguage"
      ].reduce(
        (prev, field) => ({
          ...prev,
          [field]: Array.isArray(profile[field]) ? [...profile[field]].shift() : profile[field]
        }),
        {}
      );
      setFormValues(values);
    } else {
      setFormValues({ ...formValues, email: user.attributes.email });
    }
  }, [profile]);

  const fetchCountries = async () => {
    const fields = ["display_name", "id"];
    return axios
      .post(API_GET_MODELS_URI, {
        configName: DEFAULT_CONFIG,
        model: "res.country",
        fields: [["id", ">", 0]],
        outputrecords: { fields, limit: 1000 }
      })
      .then((resp) => {
        setCountries(resp.data);
        return resp.data;
      });
  };

  const fetchStates = async (country_id) => {
    const fields = ["display_name", "id"];
    return axios
      .post(API_GET_MODELS_URI, {
        configName: DEFAULT_CONFIG,
        model: "res.country.state",
        fields: [["country_id", "=", country_id]],
        outputrecords: { fields, limit: 1000 }
      })
      .then((resp) => {
        setStates(resp.data);
        return resp.data;
      });
  };

  useEffect(() => {
    let execute = async () => {
      dispatch(updateOdooProfile(profile.id, { x_userlanguage: currentLanguage[0] }));
    };
    execute();
  });

  useEffect(() => {
    let execute = async () => {
      await fetchCountries();
    };
    execute();
  }, []);

  useEffect(() => {
    let execute = async () => {
      const { country_id } = formValues;
      if (country_id) {
        await fetchStates(country_id);
      }
    };
    execute();
  }, [formValues.country_id]);

  const handleFormChange = (field, value) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const handleCheckBox = () => {
    setFormValues({ ...formValues, is_company: checkboxRef.current.checked });
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSubmitting(true);
      try {
        if (profile) {
          dispatch(updateOdooProfile(profile.id, formValues));
          dispatch(setSuccess( "Profile updated successfully!" ));
        } else {
          dispatch(createOdooProfile(formValues));
          dispatch(searchOdooProfile(formValues.email));
          dispatch(setSuccess("Profile created successfully!"));
          dispatch(setPersist(true));
          navigate("/home");
        }
      } catch (e) {
        dispatch(setErrors(e.message));
      } finally {
        setSubmitting(false);
      }
    },
    [profile, formValues]
  );

  const countryOptions = useMemo(() => {
    return countries.map(({ id, display_name }) => [id, display_name]);
  }, [countries]);

  const stateOptions = useMemo(() => {
    return states.map(({ id, display_name }) => [id, display_name]);
  }, [states]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-start h-full w-full">
        <h1 className="text-xl font-medium mb-6">
          {profile ? t("Edit Profile") : t("Create Profile")}
        </h1>
        <div className="flex justify-evenly space-x-4 w-full max-w-screen-lg overflow-hidden">
          <form className="border rounded p-6 shadow bg-white w-full" onSubmit={handleSubmit}>
            <div className="grid gap-6 grid-cols-2">
              <div>
                <label>{t("Name")}</label>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formValues["name"]}
                  onChange={(e) => handleFormChange("name", e)}
                />
              </div>
              <div>
                <label>{t("Email")}</label>
                <TextInput
                  id="email"
                  type="text"
                  placeholder="Email"
                  name="email"
                  disabled
                  value={formValues["email"]}
                  onChange={(e) => handleFormChange("email", e)}
                />
              </div>
              <div>
                <label>{t("Phone")}</label>
                <TextInput
                  id="phone"
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  value={formValues["phone"]}
                  onChange={(e) => handleFormChange("phone", e)}
                />
              </div>
              <div>
                <label>{t("Mobile")}</label>
                <TextInput
                  id="mobile"
                  type="text"
                  placeholder="Mobile"
                  name="mobile"
                  value={formValues["mobile"]}
                  onChange={(e) => handleFormChange("mobile", e)}
                />
              </div>
              <div>
                <label>{t("Country")}</label>
                <Select
                  id="country"
                  name="country"
                  value={formValues["country_id"]}
                  onChange={(e) => handleFormChange("country_id", parseInt(e))}
                  options={countryOptions}
                />
              </div>
              <div>
                <label>{t("State")}</label>
                <Select
                  id="state"
                  name="state"
                  value={formValues["state_id"]}
                  onChange={(e) => handleFormChange("state_id", parseInt(e))}
                  options={stateOptions}
                />
              </div>
              <div>
                <label>{t("City")}</label>
                <TextInput
                  id="city"
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formValues["city"]}
                  onChange={(e) => handleFormChange("city", e)}
                />
              </div>
              <div>
                <label>{t("Street")}</label>
                <TextInput
                  id="street"
                  type="text"
                  placeholder="Street"
                  name="street"
                  value={formValues["street"]}
                  onChange={(e) => handleFormChange("street", e)}
                />
              </div>
              <div>
                <label>{t("Zip")}</label>
                <TextInput
                  id="zip"
                  type="text"
                  placeholder="Zip"
                  name="zip"
                  value={formValues["zip"]}
                  onChange={(e) => handleFormChange("zip", e)}
                />
              </div>
              <div>
                <label>{t("Website Link")}</label>
                <TextInput
                  id="website"
                  type="text"
                  placeholder="Website Link"
                  name="website"
                  value={formValues["website"]}
                  onChange={(e) => handleFormChange("website", e)}
                />
              </div>
              <div>
                <label>{t("Vat")}</label>
                <TextInput
                  id="vat"
                  type="text"
                  placeholder="Vat"
                  name="vat"
                  value={formValues["vat"]}
                  onChange={(e) => handleFormChange("vat", e)}
                />
              </div>
              <div className="flex items-center">
                <label>{t("Company")}</label>
                <input
                  id="is_company"
                  type="checkbox"
                  className="ml-5"
                  name="is_company"
                  checked={formValues["is_company"] ? true : false}
                  ref={checkboxRef}
                  onChange={(e) => handleCheckBox("is_company", e)}
                />
              </div>
              <div className="col-span-2 flex justify-center">
                <PrimaryButton type="submit" disabled={submitting}>
                  {t("Save")}
                </PrimaryButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
