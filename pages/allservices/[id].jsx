import { Grid, Stack, TextField, Checkbox, FormGroup, FormControlLabel, RadioGroup, Radio, FormLabel, FormControl, Button, } from "@mui/material";
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BaseCard from "../../src/components/baseCard/BaseCard";
import mongoose from 'mongoose'
import Services from "../../server/models/servicesSchema";

const UpdateData = ({ service }) => {

    const [id, setId] = useState(service._id)
    const [title, setTitle] = useState(service.title)
    const [image, setImage] = useState(service.image)
    const [description, setDescription] = useState(service.description)

    const router = useRouter()

    useEffect(() => {
      const token = localStorage.getItem("admin")
      if (!token) {
        router.push("/adminlogin")
      }
    }, [])
  
    const handleSubmit = async () => {
        if (!title || !image || !description) {
            toast.warn('please fill data !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        else {
            const service = await fetch("http://localhost:3000/api/updateservice", {
                method: "PUT",
                body: JSON.stringify({ _id: id, title, image, description }),
                headers: {
                    "content-type": "application/json"
                }
            })
            if (service) {
                toast.success('services updated successfully !', {
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
                    <BaseCard title="Update service">
                        <Stack spacing={3}>
                            <TextField
                                id="title"
                                label="title"
                                variant="outlined"
                                value={title} onChange={(e) => setTitle(e.target.value)}
                            />
                            <TextField
                                id="image"
                                label="image path"
                                type="text"
                                variant="outlined"
                                value={image} onChange={(e) => setImage(e.target.value)}
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
                            Update service
                        </Button>
                    </BaseCard>
                </Grid>
                <ToastContainer />
            </Grid>
        </>
    )
}


export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        const MONGODB_URI = process.env.MONGODB_URI
        await mongoose.connect(MONGODB_URI)
    }
    let service = await Services.findOne({ _id: context.query.id })

    return {
        props: { service: JSON.parse(JSON.stringify(service)) },
    }
}

export default UpdateData