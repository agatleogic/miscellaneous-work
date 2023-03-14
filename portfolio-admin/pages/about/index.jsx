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
import "react-toastify/dist/ReactToastify.css";
import BaseCard from "../../src/components/baseCard/BaseCard";
import mongoose from "mongoose";
import About from "../../server/models/aboutSchema";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";

const viewabout = ({ about }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin");
    if (!token) {
      router.push("/adminlogin");
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/deleteabout`, {
        method: "DELETE",
        body: JSON.stringify({ _id: id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(about)
      if (res.status === 200) {
        toast.success("About deleted successfully !", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("something went wrong !", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="All about">
            <Link href={`/addabout`} className="flex justify-end">
              <Button variant="contained" style={{ float: "right" }}>
                Add About
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
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      seotitle
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      seodescription
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      title
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      heading
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      image
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      years
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      feedback
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      shortdescription
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
                {about.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell align="center">
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "600",
                        }}
                      >
                        {product.seotitle}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">
                        {product.seodescription}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">
                        {product.title}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">
                        {product.heading}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>
                        <Image
                          src={product.image}
                          width="150"
                          height="100"
                          alt=""
                        />
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">
                        {product.years}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">
                        {product.feedback}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      className="flex flex-wrap overflow-hidden"
                    >
                      <Typography variant="h6">
                        {product.shortdescription}...
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Link href={`/about/${product._id}`}>
                        <Button
                          variant="contained"
                          mt={2}
                          className="bg-green-500"
                        >
                          Edite
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        mt={2}
                        onClick={() => handleDelete(product._id)}
                      >
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
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    const MONGODB_URI = "mongodb://localhost:27017/admin-template";
    await mongoose.connect(MONGODB_URI);
  }
  let about = await About.find({});

  return {
    props: { about: JSON.parse(JSON.stringify(about)) },
  };
}

export default viewabout;
