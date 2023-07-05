import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAttributes } from "../store/authSlice";

const Home = () => {
  const { list } = useSelector((state) => state.engineConfig);
  const MyApiVal = useSelector((state) => state.myApi);
  const MyApiList = MyApiVal.list;
  const {
    userAttributes: { length: userAttrLength }
  } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  // const navigate = useNavigate();
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
  return (
    <Layout>
      <div>
        {fetching ? (
          <div className="flex justify-evenly flex-wrap flex-auto items-center">
            <h3 className="text-lg font-medium text-gray-700">Fetching...</h3>
          </div>
        ) : null}
        <h3 className="font-bold text-xl">{t("Dashboard")}</h3>
        <div className="flex flex-row h-full mt-10 ">
          {/* <div className="flex justify-evenly space-x-4">
            <h1 className="text-2xl font-medium">Welcome to R3API</h1>
          </div> */}
          <div className="box-content h-20 w-36 p-4 rounded-lg  bg-white  ...">
            <h2>{t("My Apis Count")} - </h2>
            <h3 className="font-bold text-2xl">{MyApiList.length}</h3>
          </div>
          <div className="box-content h-20 w-36 p-4 rounded-lg bg-white ml-20 ...">
            <h2>{t("Engine Config")} -</h2>
            <h3 className="font-bold text-2xl">{list.length}</h3>
          </div>
          <div className="box-content h-20 w-36 p-4 rounded-lg bg-white ml-20 ...">
            <h2>{t("Web Api Use")} -</h2>
            <h3 className="font-bold text-2xl">10</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
