import { Grid, Stack, TextField, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseCard from "../../src/components/baseCard/BaseCard";
import mongoose from "mongoose";
import About from "../../server/models/aboutSchema";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const UpdateData = ({ about }) => {
  const [id, setId] = useState(about._id);
  const [seotitle, setSeoTitle] = useState(about.seotitle);
  const [seodescription, setSeoDescription] = useState(about.seodescription);
  const [seoTags, setSeoTags] = useState(about.seoTags);
  const [title, setTitle] = useState(about.title);
  const [heading, setHeading] = useState(about.heading);
  const [image, setImage] = useState(about.image);
  const [years, setYears] = useState(about.years);
  const [feedback, setFeedback] = useState(about.feedback);
  const [feedbackProvider, setFeedbackProvider] = useState(
    about.feedbackProvider
  );
  const [designation, setDesignation] = useState(about.designation);
  const [shortdescription, setShortdescription] = useState(
    about.shortdescription
  );
  const [description, setDescription] = useState(about.description);
  const [texteditor, setTexteditor] = useState(about.texteditor);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin");
    if (!token) {
      router.push("/adminlogin");
    }
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      setImage(e.target.result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (
      !seotitle ||
      !seodescription ||
      !seoTags ||
      !title ||
      !heading ||
      !image ||
      !years ||
      !feedback ||
      !feedbackProvider ||
      !designation ||
      !shortdescription ||
      !description
    ) {
      toast.warn("please fill data !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const portfolio = await fetch("/api/updateabout", {
        method: "PUT",
        body: JSON.stringify({
          _id: id,
          seotitle,
          seodescription,
          seoTags,
          title,
          heading,
          image,
          years,
          feedback,
          feedbackProvider,
          designation,
          shortdescription,
          description,
          texteditor,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (portfolio) {
        toast.success("About Updated Successfully !", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("Something Went Wrong !", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="About">
            <Stack spacing={3}>
              <TextField
                id="seotitle"
                label="seotitle"
                variant="outlined"
                value={seotitle}
                onChange={(e) => setSeoTitle(e.target.value)}
              />
              <TextField
                id="seodescription"
                label="seodescription"
                variant="outlined"
                value={seodescription}
                onChange={(e) => setSeoDescription(e.target.value)}
              />
              <TextField
                id="seotags"
                label="seotags"
                variant="outlined"
                value={seoTags}
                onChange={(e) => setSeoTags(e.target.value)}
              />
              <TextField
                id="title"
                label="title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                id="heading"
                label="heading"
                variant="outlined"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
              />
              <Stack spacing={3} direction="row">
                <input
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-100 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="file"
                  id="formFileDisabled"
                  name="photo"
                  onChange={handleImage}
                  // multiple
                />
                <TextField
                  id="years"
                  label="years"
                  variant="outlined"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                />
              </Stack>
              <TextField
                id="feedback"
                label="feedback"
                variant="outlined"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <Stack spacing={3} direction="row">
                <TextField
                  id="feedbackprovider"
                  label="feedbackprovider"
                  variant="outlined"
                  value={feedbackProvider}
                  onChange={(e) => setFeedbackProvider(e.target.value)}
                />
                <TextField
                  id="designation"
                  label="designation"
                  variant="outlined"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
              </Stack>
              <TextField
                id="shortdescription"
                label="shortdescription path"
                type="text"
                variant="outlined"
                value={shortdescription}
                onChange={(e) => setShortdescription(e.target.value)}
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
              Update About
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
  let about = await About.findOne({ _id: context.query.id });

  return {
    props: { about: JSON.parse(JSON.stringify(about)) },
  };
}

export default UpdateData;
