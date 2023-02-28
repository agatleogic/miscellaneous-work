import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.js";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import mongoose from "mongoose";
import Services from "../../server/models/servicesSchema";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

function TableList({ services }) {
  const [tc, setTC] = useState(false);
  const [notificatio, setNotificatio] = useState(null);
  const useStyles = makeStyles(styles);
  const classes = useStyles();

    const router = useRouter();
  
    useEffect(() => {
      const token = localStorage.getItem("admin");
      if (!token) {
        router.push("/adminlogin");
      }
    }, []);
  
    const handleDelete = async (id) => {
      try {
        const sevice = await fetch(`http://localhost:3000/api/${id}`, {
          method: "DELETE",
        });
        console.log(sevice);
        if (sevice.status === 200) {
          setTC(true);
          setNotificatio("success")
          setTimeout(function () {
            setTC(false);
          }, 2000);
            router.push("/admin/allservices")
        } else {
          setTC(true);
          setNotificatio(null)
          setTimeout(function () {
            setTC(false);
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader
            color="primary"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h4 className={classes.cardTitleWhite}>All Services</h4>
              <p className={classes.cardCategoryWhite}>
                Here is a subtitle for this table
              </p>
            </div>
            <Link href={`/addservice`} className="flex justify-end">
              <Button variant="contained">Add Services</Button>
            </Link>
          </CardHeader>
          <CardBody>
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
                      Title
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      Image
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      Shortdescription
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
                    <TableCell align="center">
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "600",
                        }}
                      >
                        {product.title}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>
                        <Image
                          src={product.image}
                          width="100"
                          height="70"
                          alt=""
                        />
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
                      <Link href={`/service/${product._id}`}>
                        <Button
                          variant="contained"
                          mt={2}
                          className="bg-green-500"
                        >
                          Edit
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
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
          <Snackbar
            place="tc"
            // color="info"
            // color="primary"
            color={(notificatio==="success")?"success":"danger"}

            icon={AddAlert}
            message={(notificatio==="success")?"services deleted successfully !":"something went wrong !"}
            open={tc}
            closeNotification={() => setTC(false)}
            close
          />
        </GridItem>
          </GridContainer>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    const MONGODB_URI = "mongodb://localhost:27017/admin-template";
    await mongoose.connect(MONGODB_URI);
  }
  let services = await Services.find({});

  return {
    props: { services: JSON.parse(JSON.stringify(services)) },
  };
}

TableList.layout = Admin;

export default TableList;
