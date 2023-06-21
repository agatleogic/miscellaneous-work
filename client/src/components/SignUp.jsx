import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SIGNUP_USER } from "../gqlOperations/mutations";

const Signup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  // const navigate = useNavigate();
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);
  
  if (loading) {
    return <h1 className="text-center mt-5">Loading</h1>;
  }

  if (error) {
    return <div className="text-danger">{error.message}</div>;
  }
  
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const userNew = { firstName: fname, lastName: lname, email, password };
      signupUser({
        variables: {
          userNew: userNew,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      {data && data.user && (
        <div className="text-success">
          {data.user.firstName} is signed up. you can login now
        </div>
      )}
      <h1 className="text-center mt-5">Signup</h1>
      <form className="m-5" onSubmit={onSubmitForm}>
        <div className="m-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter FirstName"
            value={fname}
            required
            onChange={(e) => setFname(e.target.value)}
          />
        </div>
        <div className="m-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter LastName"
            value={lname}
            required
            onChange={(e) => setLname(e.target.value)}
          />
        </div>
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
          <Link className="nav-link" to="/login">
            Already have an account ?
          </Link>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <button type="submit" className="btn btn-success">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
