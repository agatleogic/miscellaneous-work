import { Grid, Stack, TextField, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseCard from "../../src/components/baseCard/BaseCard";
import mongoose from "mongoose";
import Portfolios from "../../server/models/casestudiesSchema";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const UpdateData = ({ portfolio }) => {
  const [id, setId] = useState(portfolio._id);
  const [title, setTitle] = useState(portfolio.title);
  const [image, setImage] = useState(portfolio.image);
  const [shortdescription, setShortDescription] = useState(
    portfolio.shortdescription
  );
  const [description, setDescription] = useState(portfolio.description);
  const [texteditor, setTexteditor] = useState(portfolio.texteditor);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin");
    if (!token) {
      router.push("/adminlogin");
    }
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    // setImageInput(file);
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      setImage(e.target.result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!title || !shortdescription || !image || !description || !texteditor) {
      toast.warn("please fill data !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const portfolio = await fetch("/api/updateportfolio", {
        method: "PUT",
        body: JSON.stringify({
          _id: id,
          title,
          shortdescription,
          image,
          description,
          texteditor,
        }),
        headers: {
          "Content-Type": "application/json",
            "Accept": "application/json",
        },
      });
      if (portfolio) {
        toast.success("services updated successfully !", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("something went wrong !", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Update Portfolio">
            <Stack spacing={3}>
              <TextField
                id="title"
                label="title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-100 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="file"
                id="formFileDisabled"
                name="photo"
                onChange={handleImage}
                multiple
              />

              <TextField
                id="shortdescription"
                label="shortdescription path"
                type="text"
                variant="outlined"
                value={shortdescription}
                onChange={(e) => setShortDescription(e.target.value)}
              />

              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Stack>
            <br />
            <QuillNoSSRWrapper
              theme="snow"
              onChange={(e) => setTexteditor(e)}
            />
            <Button variant="contained" mt={2} onClick={handleSubmit}>
              Update Portfolio
            </Button>
          </BaseCard>
        </Grid>
        <ToastContainer />
      </Grid>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    const MONGODB_URI = "mongodb://localhost:27017/admin-template";
    await mongoose.connect(MONGODB_URI);
  }
  let portfolio = await Portfolios.findOne({ _id: context.query.id });

  return {
    props: { portfolio: JSON.parse(JSON.stringify(portfolio)) },
  };
}

export default UpdateData;
