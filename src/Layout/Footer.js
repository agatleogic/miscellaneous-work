import React from "react";

const Footer = () => {
  return (
    <footer className="px-6 py-2 text-center bg-blue-800 text-white text-xs">
      Copyright {process.env.REACT_APP_WESITE_NAME} &copy;{new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
