import Login from "@/components/Login";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/router";

const login = () => {
  const router = useRouter()

  const getUser = async () =>
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/") ;
      }
    });

  useEffect(() => {
    getUser();
  }, []);

  return <><Login /></>;
};

export default login;
