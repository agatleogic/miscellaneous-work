import { Grid, Stack, TextField, Checkbox, FormGroup, FormControlLabel, RadioGroup, Radio, FormLabel, FormControl, Button, } from "@mui/material";
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BaseCard from "../src/components/baseCard/BaseCard";

const AddPortfolio = () => {

  const [title, setTitle] = useState('')
  const [image, setImage] = useState([])
  const [shortdes, setShortdes] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("admin")
    if (!token) {
      router.push("/adminlogin")
    }
  }, [])

  const handleSubmit = async () => {
    if (!title || !shortdes || !description) {
      toast.warn('please fill data !', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    else {
      const portfolio = await fetch("http://localhost:3000/api/addportfolio", {
        method: "post",
        body: JSON.stringify({ title, shortdescription: shortdes, description }),
        headers: {
          "content-type": "application/json"
        }
      })
      if (portfolio) {
        toast.success('services ADD successfully !', {
          position: toast.POSITION.TOP_CENTER
        });
      } else {
        toast.error('something went wrong !', {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }
  }

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Add a Portfolio">
            <Stack spacing={3}>
              <TextField
                id="title"
                label="title"
                variant="outlined"
                value={title} onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                id="shortdes"
                label="shortdes path"
                type="text"
                variant="outlined"
                value={shortdes} onChange={(e) => setShortdes(e.target.value)}
              />
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                value={description} onChange={(e) => setDescription(e.target.value)}
              />
            </Stack>
            <br />
            <Button variant="contained" mt={2} onClick={handleSubmit}>
              Add Portfolio
            </Button>
          </BaseCard>
        </Grid>
        <ToastContainer />
      </Grid>
    </>
  );
};

export default AddPortfolio;
