import React, { useCallback, useEffect, useState } from "react";
import Label from "../Component/Label";
import PrimaryButton from "../Component/PrimaryButton";
import TextInput from "../Component/TextInput";
import { useTranslation } from "react-i18next";
import Layout from "../Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { confirmSignup } from "../store/authSlice";
import { setErrors, setSuccess } from "../store/alertSlice";

const Verification = () => {
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("");
  const [resending, setResending] = useState(false);
  const { submitting } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(state?.email);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      dispatch(confirmSignup(username, code));
      dispatch(setSuccess(t("Verification done! you can login now.")));
      dispatch(setPersist(true));
      navigate("/login");
    },
    [username, code]
  );

  const resendCode = async () => {
    try {
      setResending(true);
      await Auth.resendSignUp(username);
      dispatch(setSuccess(t("Verification code has been sent to your email address.")));
    } catch (e) {
      console.log(e);
      dispatch(setErrors(e.message));
    } finally {
      setResending(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-start h-full">
        <h1 className="text-xl font-medium mb-6">{t("Verify Account")}</h1>
        <form className="border rounded p-6 shadow space-y-6 bg-white" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="username">{t("E-mail")}</Label>
            <TextInput
              disabled={!!state?.email}
              type="email"
              value={username}
              onChange={setUsername}
              name="username"
              id="username"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="code">{t("Code")}</Label>
            <TextInput value={code} onChange={setCode} name="code" id="code" type="text" />
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={resendCode} disabled={resending}>
              {resending ? t("Reseding") + "..." : t("Resend Code")}
            </button>
            <PrimaryButton disabled={submitting}>{t("Verify")}</PrimaryButton>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Verification;
