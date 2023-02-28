import React from "react";
import Router from "next/router";

export default function Index() {
  React.useEffect(() => {
    Router.push("/admin/dashboard");
  });

  return <div />;
}

// const router = useRouter()

// useEffect(() => {
//   const token = localStorage.getItem("admin")
//   if (!token) {
//     router.push("/adminlogin")
//   }
// }, [])