import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Label from "../Component/Label";
import PrimaryButton from "../Component/PrimaryButton";
import TextInput from "../Component/TextInput";
import { useTranslation } from "react-i18next";
import Layout from "../Layout";
import PasswordHelp from "../Component/PasswordHelp";
import { login } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { submitting } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        dispatch(
          login({
            username,
            password
          })
        );
      } catch (e) {
        if (e.code === "UserNotConfirmedException") {
          navigate("/verify", { state: { email: username } });
        }
      }
    },
    [username, password]
  );

  return (
    <Layout>
      <div className="flex flex-col items-center justify-start h-full">
        <h1 className="text-xl font-medium mb-6">{t("Login")}</h1>
        <form className="border rounded p-6 shadow space-y-6 bg-white" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="username">{t("Email")}</Label>
            <TextInput value={username} onChange={setUsername} name="email" id="username" />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2">
              <Label htmlFor="password">{t("Password")}</Label>
              <PasswordHelp />
            </div>
            <TextInput
              value={password}
              onChange={setPassword}
              name="password"
              id="password"
              type="password"
            />
          </div>
          <div className="flex justify-end">
            <PrimaryButton disabled={submitting}>{t("Login")}</PrimaryButton>
          </div>
          <div className="flex flex-row">
            <Link to="/forgot-password">
              <p>{t("Forgot Password")}?</p>
            </Link>
            <Link to="/register">
              <p className="ml-10">{t("New user?Register")}</p>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
