import {  Input } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const Home = () => {
  const [inputImage, setInputImage] = useState("");
  const [image, setImage] = useState("");
  // const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    setInputImage(file);
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      setImage(e.target.result);
    };
    fileReader.readAsDataURL(file);
  };

  const HandleUpload = async () => {
    // const formdata = new FormData();
    // formdata.append("title", title);
    // formdata.append("image", inputImage);
    const formdata = {
      title,
      image
    }
    const res = await axios.post(`/api/imgupload`, formdata, {
      headers:{
        "Content-Type":"application/json",
        // "Accept":"application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'multipart/form-data',
      }
    });
    console.log(res);
    if (res.status === 200) {
      alert("image uploaded succesfully");
    } else {
      console.log("something went wrong");
    }
  };
  return (
    <div style={{ margin: "0", width: "100vw" }}>
      <div style={{ margin: "5rem auto", width: "70%" }}>
        <div className="my-4">
          <h1 className="App">File upload page</h1>
        </div>
        <div style={{ margin: "1rem 0" }}>
          <Input
            type="text"
            name="title"
            placeholder="enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div style={{ margin: "1rem 0" }}>
          <input type="file" name="photo" onChange={handleImage} />
        </div>
      
        <div style={{ margin: "1rem 0" }}>
          <button
            onClick={HandleUpload}
            className=" mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            upload image
          </button>
        </div>
      </div>

      {image && (
        <img src={image} alt="" style={{ width: "300px", height: "200px" }} />
      )}
    </div>
  );
};

export default Home;
