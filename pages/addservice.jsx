import { Grid, Stack, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GridItem from "components/Grid/GridItem.js";
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.js";
import Admin from "layouts/Admin.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { makeStyles } from "@material-ui/core/styles";

import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import axios from "axios";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};
const Addservice = () => {
  const [tc, setTC] = useState(false);
  const [notificatio, setNotificatio] = useState(null);

  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [shortdescription, setShortdescription] = useState("");
  const [description, setDescription] = useState("");
  const [texteditor, setTexteditor] = useState("");
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
    if (!title || !shortdescription || !image || !description || !texteditor) {
      setTC(true);
      setNotificatio("empty")
      setTimeout(function () {
        setTC(false);
      }, 2000);
    } else {
      let formdata = {
        title,
        shortdescription,
        image,
        description,
        texteditor,
      };

      const service = await axios.post(`/api/addservices`, formdata, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      if (service.status === 201) {
        setTC(true);
      setNotificatio("success")
      setTimeout(function () {
        setTC(false);
      }, 2000);

      } else {
        setTC(true);
      setNotificatio("error")
      setTimeout(function () {
        setTC(false);
      }, 2000);
      }
    }
  };

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add a Service</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <Stack spacing={3}>
                <TextField
                  id="title"
                  type={"text"}
                  // multiline
                  // rows={2}
                  style={{ margin: "0.7rem 1rem" }}
                  label="title"
                  variant="standard"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <input
                  type="file"
                  style={{
                    border: "1px solid black",
                    width: "70vw",
                    margin: "0.7rem 1rem",
                    padding: "0.4rem 1rem",
                    borderRadius: "1rem",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                  }}
                  id="formFileDisabled"
                  name="photo"
                  onChange={handleImage}
                />

                <TextField
                  id="shortdescription"
                  label="shortdescription path"
                  type="text"
                  style={{ margin: "0.7rem 1rem" }}
                  variant="standard"
                  value={shortdescription}
                  onChange={(e) => setShortdescription(e.target.value)}
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  style={{ margin: "0.7rem 1rem" }}
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Stack>
              <br />
              <QuillNoSSRWrapper
                theme="snow"
                style={{ margin: "0.7rem 1rem" }}
                onChange={(e) => setTexteditor(e)}
              />
            </CardBody>
            <CardFooter>
              <Button color="primary" mt={2} onClick={handleSubmit}>
                Add Service
              </Button>
            </CardFooter>
          </Card>
        </Grid>
        <GridItem xs={12} sm={12} md={4}>
          <Snackbar
            place="tc"
            // color="info"
            // color="primary"
            color={(notificatio==="empty")?"warning":(notificatio==="success")?"success":(notificatio==="error")?"danger":null}

            icon={AddAlert}
            message={(notificatio==="empty")?"please fill data !":(notificatio==="success")?"Service ADD successfully !":(notificatio==="error")?"invalid user !":null}
            open={tc}
            closeNotification={() => setTC(false)}
            close
          />
        </GridItem>     
     </Grid>
    </>
  );
};

Addservice.layout = Admin;
export default Addservice;
