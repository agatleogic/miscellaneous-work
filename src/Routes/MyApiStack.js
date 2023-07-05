import React from "react";
import { Route, Routes } from "react-router-dom";
import MyApis from "../Pages/MyApis";

const MyApiStack = () => {
  return (
    <Routes>
      <Route path="/" element={<MyApis />} />
    </Routes>
  );
};

export default MyApiStack;
