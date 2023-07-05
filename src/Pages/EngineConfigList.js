import React, { useEffect, useMemo, useState } from "react";
import Layout from "../Layout";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../Component/PrimaryButton";
import { useTranslation } from "react-i18next";
import Select from "./../Component/Select";
import TextInput from "../Component/TextInput";
import PageTitle from "../Component/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAttributes } from "../store/authSlice";
import { clearFilters, setCurrentConfig, setFilters } from "../store/engineConfigSlice";

const EngineConfigList = () => {
  const { list, filters } = useSelector((state) => state.engineConfig);
  const {
    userAttributes: { length: userAttrLength }
  } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    let execute = async () => {
      if (userAttrLength === 0) {
        try {
          setFetching(true);
          dispatch(fetchUserAttributes());
        } finally {
          setFetching(false);
        }
      }
    };
    execute();
  }, []);

  const open = ({ id }) => {
    navigate(`/engine-config/${id}/edit`, { replace: true });
  };

  const goToCreate = () => {
    dispatch(setCurrentConfig(null));
    navigate("/engine-config/create", { replace: true });
  };

  const engineOptions = useMemo(() => {
    return list
      .map(({ type }) => type)
      .filter((v, i, a) => a.indexOf(v) === i)
      .map((e) => [e, e]);
  }, [list]);

  const versionOptions = useMemo(() => {
    return list
      .map(({ version }) => version)
      .filter((v, i, a) => a.indexOf(v) === i)
      .map((e) => [e, e]);
  }, [list]);

  const urlOptions = useMemo(() => {
    return list
      .map(({ url }) => url)
      .filter((v, i, a) => a.indexOf(v) === i)
      .map((e) => [e, e]);
  }, [list]);

  const databaseOptions = useMemo(() => {
    return list
      .map(({ database }) => database)
      .filter((v, i, a) => a.indexOf(v) === i)
      .map((e) => [e, e]);
  }, [list]);

  const updateFilterValue = (key, value) => {
    dispatch(setFilters({ ...filters, [key]: value }));
  };

  const filteredList = useMemo(() => {
    return list.filter(({ name, type, version, url, database }) => {
      return (
        new RegExp(filters.search, "gi").test(name) &&
        (!filters.type || type === filters.type) &&
        (!filters.version || version === filters.version) &&
        (!filters.url || url === filters.url) &&
        (!filters.database || database === filters.database)
      );
    });
  }, [list, filters]);

  return (
    <Layout>
      <div className="flex flex-col space-y-6 flex-auto">
        <div>
          <PageTitle>{t("Engine Configuration")}</PageTitle>
          <div className="flex flex-col lg:flex-row lg:justify-center items-center lg:space-x-4 space-y-4 lg:space-y-0">
            {list.length < 10 && <PrimaryButton onClick={goToCreate}>{t("+")}</PrimaryButton>}
            <PrimaryButton type="button" onClick={() => dispatch(clearFilters({ ...filters }))}>
              {t("Clear")}
            </PrimaryButton>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col space-y-4 lg:space-y-0 items-center justify-evenly lg:space-x-4 lg:px-8">
          <Select
            options={engineOptions}
            value={filters.type}
            onChange={(v) => updateFilterValue("type", v)}
            placeholder="Engine"
            id="type"
          />
          <Select
            options={versionOptions}
            value={filters.version}
            onChange={(v) => updateFilterValue("version", v)}
            placeholder="Version"
            id="version"
          />
          <Select
            options={urlOptions}
            value={filters.url}
            onChange={(v) => updateFilterValue("url", v)}
            placeholder="Url"
            id="url"
          />
          <Select
            options={databaseOptions}
            value={filters.database}
            onChange={(v) => updateFilterValue("database", v)}
            placeholder="Database"
            id="database"
          />
          <TextInput
            value={filters.search}
            onChange={(v) => updateFilterValue("search", v)}
            type="search"
            placeholder="Search..."
            id="search"
          />
        </div>
        {fetching ? (
          <div className="flex justify-evenly flex-wrap flex-auto items-center">
            <h3 className="text-lg font-medium text-gray-700">Fetching...</h3>
          </div>
        ) : null}
        {filteredList.length ? (
          <div className="flex justify-start flex-wrap lg:space-y-0 space-y-4">
            {/* Card */}
            {filteredList.map((engineConfig) => (
              <div
                className="lg:w-1/3 w-full lg:p-4 group"
                key={engineConfig.id}
                onClick={() => open(engineConfig)}>
                <div className="flex py-4 border rounded-md shadow-md overflow-hidden group-hover:bg-blue-900 group-hover:bg-opacity-5 cursor-pointer bg-white">
                  <div className="w-24 border-r flex flex-col items-center justify-center">
                    <h4 className="text-lg font-medium">{engineConfig.type}</h4>
                    <p className="text-sm text-gray-600">{engineConfig.version}</p>
                  </div>
                  <div className="flex flex-col flex-auto border-l px-4 space-y-2">
                    <div>
                      <p className="text-xs text-gray-600">{t("Name")}:</p>
                      <p className="text-base">{engineConfig.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">{t("Username")}:</p>
                      <p className="text-base">{engineConfig.username}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">{t("Database")}:</p>
                      <p className="text-base">{engineConfig.database}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">{t("URL")}:</p>
                      <p className="text-xs">{engineConfig.url}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {!fetching ? (
          <div className="flex justify-evenly flex-wrap flex-auto items-center">
            {list.length === 0 ? (
              <h3 className="text-lg font-medium text-gray-700">
                There is no configuration here...
              </h3>
            ) : filteredList.length === 0 ? (
              <h3 className="text-lg font-medium text-gray-700">
                The engine configuration you're looking for couldn't be found!
              </h3>
            ) : null}
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default EngineConfigList;
