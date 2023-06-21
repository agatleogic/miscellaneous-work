import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_QUOTE } from "../gqlOperations/mutations";

const CreateQuote = () => {
  const [quote, setQuote] = useState("");
  const [createQuote, { data, loading, error }] = useMutation(CREATE_QUOTE, {
    refetchQueries: ["getallquetes", "getMyProfile"],
  });
  
  if (loading) {
    return <h1 className="text-center mt-5">Loading</h1>;
  }
  
    if (error) {
      console.log(error.message);
      return <div className="text-danger">{error.message}</div>;
    }
  
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      createQuote({
        variables: {
          name: quote,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      {data && <h5 className="text-success m-3">{data.quote}</h5>}
      <form className="m-5" onSubmit={onSubmitForm}>
        <div className="m-3">
          <input
            type="text"
            className="form-control"
            placeholder="Write your thought"
            value={quote}
            required
            onChange={(e) => setQuote(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <button type="submit" className="btn btn-success">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuote;
