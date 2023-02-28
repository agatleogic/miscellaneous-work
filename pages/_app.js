import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function App({ Component, pageProps }) {
  const [user1, setUser] = useState();

  const getUser = async () =>
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Navbar user={user1} />
      <Component {...pageProps} />
    </>
  );
}
