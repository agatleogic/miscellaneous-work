import { useState } from "react";
import axios from "axios";
import { auth } from "../firebase/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const data = {
        // username,
        email,
        password,
        // confirmPassword,
      };

      try { 
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast.success("Success Notification !");
      } catch (error) {
        toast.error("Error Notification !");
      }
      // axios
      //   .post("/api/hello", data)
      //   .then((response) => {
      //     // handle successful sign up
      //   })
      //   .catch((error) => {
      //     setErrors(error.response.data);
      //   });
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let newErrors = {};

    // if (!username) {
    //   formIsValid = false;
    //   newErrors["username"] = "Username is required";
    // }

    if (!email) {
      formIsValid = false;
      newErrors["email"] = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      newErrors["email"] = "Invalid email format";
    }

    if (!password) {
      formIsValid = false;
      newErrors["password"] = "Password is required";
    } else if (password.length < 6) {
      formIsValid = false;
      newErrors["password"] = "Password must be at least 6 characters";
    }

    // if (!confirmPassword) {
    //   formIsValid = false;
    //   newErrors["confirmPassword"] = "Confirm password is required";
    // } else if (password !== confirmPassword) {
    //   formIsValid = false;
    //   newErrors["confirmPassword"] = "Passwords do not match";
    // }

    setErrors(newErrors);
    return formIsValid;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign Up to create account
          </h2>
        </div>
        <form
          className="bg-white p-6 rounded shadow-lg"
          onSubmit={handleSubmit}
        >
          {/* <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors["username"] ? "border-red-500" : ""
            }`}
            id="username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          {errors["username"] && (
            <p className="text-red-500 text-xs italic">{errors["username"]}</p>
          )}
        </div> */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors["email"] ? "border-red-500" : ""
              }`}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors["email"] && (
              <p className="text-red-500 text-xs italic">{errors["email"]}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors["password"] ? "border-red-500" : ""
              }`}
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors["password"] && (
              <p className="text-red-500 text-xs italic">
                {errors["password"]}
              </p>
            )}
          </div>
          {/* <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors["confirmPassword"] ? "border-red-500" : ""
            }`}
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors["confirmPassword"] && (
            <p className="text-red-500 text-xs italic">
              {errors["confirmPassword"]}
            </p>
          )}
        </div> */}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
