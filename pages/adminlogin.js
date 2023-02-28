import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import bg from "../assets/img/bg7.jpg";
import logo from "../assets/img/logo/Logo-2.jpeg";
import Snackbar from "components/Snackbar/Snackbar.js";
import GridItem from "components/Grid/GridItem.js";
import AddAlert from "@material-ui/icons/AddAlert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function adminlogin({ res }) {
  const [tc, setTC] = useState(false);
  const [notificatio, setNotificatio] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin");
    if (token) {
      router.push("/");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get("email");
    let password = data.get("password");

    if (!email || !password) {
      setTC(true);
      setNotificatio("empty");
      setTimeout(function () {
        setTC(false);
      }, 2000);
    } else {
      const user = res.result.filter((curUser) => {
        return curUser.email === email && curUser.password === password;
      });
      if (!user[0]) {
        setTC(true);
        setNotificatio("error");
        setTimeout(function () {
          setTC(false);
        }, 2000);
      } else {
        setTC(true);
        setNotificatio(email);
        setTimeout(function () {
          setTC(false);
        }, 2000);
        localStorage.setItem("admin", JSON.stringify(email));
        router.push("/");
      }
    }
  };

  return (
    <>
      <div className="App">
        <img
          src={bg}
          style={{
            position: "absolute",
            zIndex: "-1",
            width: "100vw",
            height: "110vh",
            top: "-100px",
          }}
        />
        <Container component="main" maxWidth="sm">
          <Box
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              px: 4,
              py: 6,
              backgroundColor: "white",
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="heading">
              <img src={logo} />
            </div>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
        <GridItem xs={12} sm={12} md={4}>
          <Snackbar
            place="tc"
            color={
              notificatio === "empty"
                ? "warning"
                : notificatio === "error"
                ? "danger"
                : "success"
            }
            icon={AddAlert}
            message={
              notificatio === "empty"
                ? "please fill data !"
                : notificatio === "error"
                ? "invalid user !"
                : notificatio
            }
            open={tc}
            closeNotification={() => setTC(false)}
            close
          />
        </GridItem>
      </div>
      <style jsx>
        {`
          .App {
            margin: 0px
            padding: 0px;
            font-family: sans-serif;
            position:relative;
          }
        
          .heading {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0px
            padding: 0px;
          }
          .heading img {
            width: 300px;
          }
        `}
      </style>
    </>
  );
}

export async function getServerSideProps(context) {
  const data = await fetch("http://localhost:3000/api/loginserver");
  const res = await data.json();
  return {
    props: { res },
  };
}
