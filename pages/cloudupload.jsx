import { Button, Input } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const Home = () => {
  const [inputIimage, setInputImage] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
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
    const mediaUrl = await imageUpload();

    // Array.from(image).forEach((item) => {
    //   formdata.append("products", item);

    // });
    const formdata = {
      title,
      image: mediaUrl,
      description,
    };
    const res = await axios.post(`/api/cloudinariupload`, formdata, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    console.log(res);
    if (res.status === 200) {
      alert("image uploaded succesfully");
      setDescription("");
    } else {
      console.log("something went wrong");
    }
  };

  const imageUpload = async () => {
    let formdata = new FormData();
    formdata.append("file", image);
    formdata.append("upload_preset", "mystore");
    formdata.append("cloud_name", "ddxclcglh");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/ddxclcglh/image/upload`,
      {
        method: "POST",
        body: formdata,
      }
    );
    const res2 = await res.json();
    return res2.url;
  };
  return (
    <div style={{ margin: "0", width: "100vw" }}>
      <div style={{ margin: "5rem auto", width: "70%" }}>
        <div className="my-4">
          <h1 className="App">Home page</h1>
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
          <Input
            type="text"
            name="title"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div style={{ margin: "1rem 0" }}>
          <Button onClick={HandleUpload} variant="contained">
            upload image
          </Button>
        </div>
      </div>
      {/* {Array.from(image).map((item, i) => {
        return (
          <span key={i}>
            <img
              src={item ? URL.createObjectURL(item) : null}
              alt=""
              style={{ width: "300px", height: "200px" }}
            />
          </span>
        );
      })} */}
      {image && (
        <img src={image} alt="" style={{ width: "300px", height: "200px" }} />
      )}
    </div>
  );
};

export default Home;
