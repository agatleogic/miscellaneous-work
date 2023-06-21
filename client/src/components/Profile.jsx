import { useQuery } from "@apollo/client";
import React from "react";
import { GET_MY_PROFILE } from "../gqlOperations/queries";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { data, loading, error } = useQuery(GET_MY_PROFILE);
  const navigate = useNavigate();

  if(!localStorage.getItem("token")){
    navigate("/login")
  }
  
  if (loading) {
    return <h1 className="text-center mt-5">Loading</h1>;
  }
  if (error) {
    console.log(error.message);
  }
  return (
    <div className="container">
      <div className="text-center">
        <img
          src={`https://robohash.org/${data.user.firstName}.png`}
          className="rounded-circle border border-dark"
          alt=""
        />
        <h5>
          {data.user.firstName} {data.user.lastName}
        </h5>
        <h5>Email - {data.user.email}</h5>
      </div>
      <h3 className="text-center border-bottom pb-2 mb-3">your quotes</h3>
      {data.user.quotes.map((quote, i) => (
        <blockquote key={i}>
          <h6 className="mx-5">{quote.name}</h6>
        </blockquote>
      ))}
    </div>
  );
};

export default Profile;
