import React from "react";
import { Route, Routes } from "react-router-dom";
import ApiGeneration from "../Pages/ApiGeneration";
import ApiForm from "../Pages/ApiForm";
import ApiView from "../Pages/ApiView";

const ApiGenerationStack = () => {
  return (
    <Routes>
      <Route path="/" element={<ApiGeneration />} />
      <Route path="/form" element={<ApiForm />} />
      <Route path="/view" element={<ApiView />} />
    </Routes>
  );
};

export default ApiGenerationStack;
