import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BaseCard from "../../src/components/baseCard/BaseCard";
import mongoose from 'mongoose'
import Services from "../../server/models/servicesSchema";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const viewservices = ({ services }) => {

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("admin")
    if (!token) {
      router.push("/adminlogin")
    }
  }, [])

  const handleDelete = async (id) => {

    try {
      const sevice = await fetch(`http://localhost:3000/api/${id}`, {
        method: "DELETE",
      })
      console.log(sevice)
      if (sevice.status === 200) {
        toast.success('services deleted successfully !', {
          position: toast.POSITION.TOP_CENTER
        });

      } else {
        toast.error('something went wrong !', {
          position: toast.POSITION.TOP_CENTER
        });
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="All Services">
            <Link href={`/addservice`} className="flex justify-end">
              <Button variant="contained" style={{ float: "right" }}>
                Add Service
              </Button>
            </Link>
            <Table
              aria-label="simple table"
              sx={{
                mt: 3,
                whiteSpace: "wrap",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Id
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Title
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Image
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Description
                    </Typography>
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    <Typography color="textSecondary" variant="h6">
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      >
                        {product._id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "600",
                        }}
                      >
                        {product.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6"
                        sx={{
                          fontWeight: "500",
                        }}>
                        {product.image}
                      </Typography>
                    </TableCell>
                    <TableCell align="right" className="flex flex-wrap overflow-scroll overflow-x-hidden">
                      <Typography variant="h6"
                        sx={{
                          width: "150px",
                          height: "100px",
                          fontWeight: "500",
                        }}>{product.description}....</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Link href={`/allservices/${product._id}`}>
                        <Button variant="contained" mt={2} >
                          Edit
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Button variant="contained" color="secondary" mt={2} onClick={() => handleDelete(product._id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
  let services = await Services.find({})

  return {
    props: { services: JSON.parse(JSON.stringify(services)) },
  }
}

export default viewservices