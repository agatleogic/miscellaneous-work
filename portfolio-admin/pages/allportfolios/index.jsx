import { Grid, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, } from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import mongoose from 'mongoose'
import Portfolios from "../../server/models/casestudiesSchema";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image"

const viewporfolios = ({ portfolios }) => {

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("admin")
    if (!token) {
      router.push("/adminlogin")
    }
  }, [])

  const handleDelete = async (id) => {

    try {
      const portfolio = await fetch(`/api/deleteportfolio`, {
        method: "DELETE",
        body: JSON.stringify({ _id: id }),
        headers: {
          "Content-Type": "application/json",
            "Accept": "application/json",
        },
      })
      // console.log(portfolio)
      if (portfolio.status === 200) {
        toast.success('Portfolio deleted successfully !', {
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
          <BaseCard title="All Portfolio">
            <Link href={`/addportfolio`} className="flex justify-end">
              <Button variant="contained" style={{ float: "right" }}>
                Add Portfolio
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
                {portfolios.map((product) => (
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
                      <Typography >
                        <Image src={product.image} width="100" height="70" alt="" />
                      </Typography>
                    </TableCell>
                    <TableCell align="center" className="flex flex-wrap overflow-hidden">
                      <Typography variant="h6">{product.shortdescription}...</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Link href={`/allportfolios/${product._id}`}>
                        <Button variant="contained" mt={2} className="bg-green-500">
                          Edit
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell align="center">
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
      </Grid>
    </>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    const MONGODB_URI = "mongodb://localhost:27017/admin-template";
    await mongoose.connect(MONGODB_URI)
  }
  let portfolios = await Portfolios.find({})

  return {
    props: { portfolios: JSON.parse(JSON.stringify(portfolios)) },
  }
}

export default viewporfolios