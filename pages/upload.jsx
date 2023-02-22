import { Button, Input } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const Home = () => {
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState("");

  const HandleUpload = async () => {
    let formdata = new FormData();
    formdata.append("category", category);

    Array.from(image).forEach((item) => {
      formdata.append("products", item);
    });
    const res = await axios.post(`/api`, formdata, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    if (res.data.status === 201) {
      alert("image uploaded succesfully");
      setCategory("");
    } else {
      console.log("something went wrong");
    }
  };
  return (
    <div
      className="container my-5 py-5"
      style={{ backgroundColor: "lightgrey" }}
    >
      <div
        className="border rounded-3 m-auto text-center"
        style={{ width: "500px", backgroundColor: "white" }}
      >
        <div className="my-4">
          <h1 className="App">Home page</h1>
        </div>
        <div className="my-3">
          <Input
            type="text"
            name="title"
            placeholder="enter title"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="my-3">
          <input
            type="file"
            name="photo"
            onChange={(e) => setImage(e.target.files)}
            multiple
          />
        </div>
        <div className="my-3">
          <Button onClick={HandleUpload} variant="contained">
            upload image
          </Button>
        </div>
      </div>
      {Array.from(image).map((item, i) => {
        return (
          <span key={i}>
            <img
              src={item ? URL.createObjectURL(item) : null}
              alt=""
              style={{ width: "300px", height: "200px" }}
            />
          </span>
        );
      })}
    </div>
  );
};

export default Home;
