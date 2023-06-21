import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../gqlOperations/mutations";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();
  const [signinUser, { data, loading, error }] = useMutation(LOGIN_USER);

  if (error) {
    return <div className="text-danger">{error.message}</div>;
  }

  if (loading) {
    return <h1 className="text-center mt-5">Loading</h1>;
  }

  if (data) {
    localStorage.setItem("token", data.user.token);
    navigate("/");
  }
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const userSignin = { email, password };
      signinUser({
        variables: {
          userSignin: userSignin,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <h1 className="text-center mt-5">Login</h1>
        <form className="m-5" onSubmit={onSubmitForm}>
          <div className="m-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="m-3">
            <input
              type="password"
              className="form-control"
              placeholder="##########"
              value={password}
              required
              onChange={(e) => SetPassword(e.target.value)}
            />
          </div>
          <div>
            <Link className="nav-link" to="/signup">
              Don't have an account ?
            </Link>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
