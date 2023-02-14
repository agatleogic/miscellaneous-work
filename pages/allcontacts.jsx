import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import mongoose from "mongoose";
import Contact from "../server/models/contactreq";
import { useRouter } from "next/router";
import { useEffect } from "react";

const allcontacts = ({ services }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin");
    if (!token) {
      router.push("/adminlogin");
    }
  }, []);

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="All Contacts">
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
          </BaseCard>
        </Grid>
      </Grid>
    </>
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

export default allcontacts;
