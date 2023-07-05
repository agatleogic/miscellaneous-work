import React from "react";
import { Route, Routes } from "react-router-dom";
import EngineConfig from "../Pages/EngineConfig";
import EngineConfigList from "../Pages/EngineConfigList";

const EngineConfigStack = () => {
  return (
    <Routes>
      <Route path="/" element={<EngineConfigList />} />
      <Route path="/create" element={<EngineConfig />} />
      <Route path="/:id/edit/" element={<EngineConfig />} />
    </Routes>
  );
};

export default EngineConfigStack;
