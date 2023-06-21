// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ALL_QUOTES } from "../gqlOperations/queries";
import { Link } from "react-router-dom";

const Home = () => {
  // const [allTodos, setAllTodos] = useState([]);
  // const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_ALL_QUOTES);
  
    if (loading) {
      return <h1 className="text-center mt-5">Loading</h1>;
    }

  if (error) {
    console.log(error.message);
  }
  //without apollo client
  // const getTodos = async () => {
  //   try {
  //     const response = await fetch("http://localhost:4000", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         query: `query getallquetes{
  //           quotes{
  //             name,
  //             by
  //           }
  //         }`,
  //       }),
  //     });
  //     const { data } = await response.json();
  //     console.log(data.quotes);
  //     setAllTodos(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getTodos();
  // }, []);

  return (
    <div className="container">
      {data.quotes && data.quotes.length !== 0 ? (
        data.quotes.map((quote, i) => (
          <blockquote key={i}>
            <h6>{quote.name}</h6>
            <p className="text-right"><Link to={`/profile/${quote.by}`}>{quote.by}</Link></p>
          </blockquote>
        ))
      ) : (
        <h3 className="text-center mt-5">No Quotes Available</h3>
      )}
    </div>
  );
};

export default Home;
