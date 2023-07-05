import React, { useEffect } from "react";
import Header from "./Header";
import PropTypes from "prop-types";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import ErrorMessage from "../Component/ErrorMessage";
import SuccessMessage from "../Component/SuccessMessage";
import { useDispatch, useSelector } from "react-redux";
import { setShowingSidebar } from "../store/sidebarSlice";
import { clearErrors, setPersist, setSuccess } from "../store/alertSlice";

const NAV_ITEMS = {
  Home: "/home",
  "Engine Config": "/engine-config",
  "API Generator": "/api-generator",
  "My APIs": "/my-apis"
};

const Layout = ({ children }) => {
  const { showingSidebar } = useSelector((state) => state.sidebar);
  const { errors, successMessage, persist } = useSelector((state) => state.alert);

  const dispatch = useDispatch();
  const handleCloseSidebar = () => {
    dispatch(setShowingSidebar(false));
  };

  // alertSlice
  useEffect(() => {
    if (errors.length) {
      if (persist) {
        dispatch(setPersist(false));
      } else {
        dispatch(clearErrors(""));
      }
    }
    if (successMessage) {
      if (persist) {
        dispatch(setPersist(false));
      } else {
        dispatch(setSuccess(""));
      }
    }
  }, [location]);

  return (
    <div className="relative flex flex-col h-screen max-w-screen-3xl mx-auto">
      <Header navItems={NAV_ITEMS} />
      <Sidebar show={showingSidebar} onClose={handleCloseSidebar} navItems={NAV_ITEMS} />
      <ErrorMessage errors={errors} />
      <SuccessMessage message={successMessage} />
      <main className="flex flex-col flex-auto overflow-hidden bg-gray-100 text-gray-700">
        <div className="flex flex-col flex-auto p-6 overflow-auto">
          <div className="flex flex-col flex-auto max-w-screen-2xl mx-auto w-full">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
