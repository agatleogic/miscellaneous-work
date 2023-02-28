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

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useEffect } from "react";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import Contact from "../../server/models/contactreq";

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

const allcontacts = ({ services }) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin");
    if (!token) {
      router.push("/adminlogin");
    }
  }, []);

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
              <h4 className={classes.cardTitleWhite}>All Contacts</h4>
              <p className={classes.cardCategoryWhite}>
                Here is a subtitle for this table
              </p>
            </div>
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
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      Email
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      Number
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      subject
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      Message
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
                        {product.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{product.email}</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      className="flex flex-wrap overflow-hidden"
                    >
                      <Typography variant="h6">{product.number}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">{product.subject}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">{product.message}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </CardBody>
        </Card>
      </GridItem>
      </GridContainer>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    const MONGODB_URI = "mongodb://localhost:27017/admin-template";
    await mongoose.connect(MONGODB_URI);
  }
  let services = await Contact.find({});

  return {
    props: { services: JSON.parse(JSON.stringify(services)) },
  };
}
allcontacts.layout = Admin;

export default allcontacts;
