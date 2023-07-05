import React from "react";
import Layout from "../Layout";

const NoMatch = () => {
  return (
    <Layout>
      <div className="flex flex-col h-full justify-center items-center">
        <h1 className="text-2xl font-medium text-gray-700">
          The page you're looking for could not be found!
        </h1>
      </div>
    </Layout>
  );
};

export default NoMatch;
