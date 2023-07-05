import React, { useCallback, useState } from "react";
import Label from "../Component/Label";
import PrimaryButton from "../Component/PrimaryButton";
import TextInput from "../Component/TextInput";
import { useTranslation } from "react-i18next";
import Layout from "../Layout";
import { Link, useNavigate } from "react-router-dom";
import PasswordHelp from "../Component/PasswordHelp";
import { useDispatch, useSelector } from "react-redux";
import { setPersist, setSuccess } from "../store/alertSlice";
import { forgotPassword, resetPassword } from "../store/authSlice";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [forgot, setForgotStatus] = useState(false);

  const { t } = useTranslation("common");
  const navigator = useNavigate();
  const { submitting } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      dispatch(forgotPassword(username));
      setForgotStatus(true);
      dispatch(
        setSuccess(t("We have sent you an email with the verification code to reset your password"))
      );
      dispatch(setPersist(true));
    },
    [username]
  );

  const resendMail = async (event) => {
    event.preventDefault();
    try {
      dispatch(forgotPassword(username));
      setForgotStatus(true);
    } catch (e) {
      alert(e);
    }
  };

  const handleSubmitReset = useCallback(
    async (event) => {
      event.preventDefault();
      dispatch(resetPassword(username, code, new_password));
      setForgotStatus(false);
      dispatch(setSuccess(t("Password reset successful. Try logging in!")));
      dispatch(setPersist(true));
      navigator("/login");
    },
    [username, code, new_password]
  );

  return (
    <Layout>
      <div className="flex flex-col items-center justify-start h-full">
        <h1 className="text-xl font-medium mb-6">
          {t(forgot ? "Reset Password" : "Forgot Password")}
        </h1>
        {!forgot ? (
          <form className="border rounded p-6 shadow space-y-6 bg-white" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="username">{t("E-mail")}</Label>
              <TextInput value={username} onChange={setUsername} name="username" id="username" />
            </div>
            <div className="flex justify-between items-center">
              <Link to="/login">{t("Login instead")}?</Link>
              <PrimaryButton disabled={submitting}>{t("Forgot")}</PrimaryButton>
            </div>
          </form>
        ) : (
          <form
            className="border rounded p-6 shadow space-y-6 bg-white"
            onSubmit={handleSubmitReset}>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="username">{t("E-mail")}</Label>
              <TextInput
                disabled
                type="username"
                value={username}
                onChange={setUsername}
                name="username"
                id="username"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="code">{t("Code")}</Label>
              <TextInput type="text" value={code} onChange={setCode} name="code" id="code" />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2">
                <Label htmlFor="new_password">{t("New Password")}</Label>
                <PasswordHelp />
              </div>
              <TextInput
                type="password"
                value={new_password}
                onChange={setNewPassword}
                name="new_password"
                id="new_password"
              />
            </div>
            <div className="flex flex-col items-center space-y-4">
              <PrimaryButton disabled={submitting} type="submit">
                {t("Reset Password")}
              </PrimaryButton>
              {forgot && (
                <p className="cursor-pointer" onClick={resendMail}>
                  {t("Resend Mail")}
                </p>
              )}
              <PrimaryButton
                disabled={submitting}
                type="button"
                onClick={() => setForgotStatus(false)}>
                {t("Back")}
              </PrimaryButton>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default ForgotPassword;
