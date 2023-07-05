/* eslint-disable no-undef */
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "../Component/Dropdown";
import { useTranslation } from "react-i18next";
import ReactTooltip from "react-tooltip";
import Switch from "react-switch";
import { Auth } from "aws-amplify";
import { ReactComponent as LanguageIcon } from "./../Icons/language.svg";
import user_profile from "./../Icons/user_profile.png";
import PropTypes from "prop-types";
import PrimaryButton from "../Component/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { setShowingSidebar } from "../store/sidebarSlice";
import { setSwitchToolTip } from "../store/toolTipSlice";
import { setSelectedLang } from "../store/languageSlice";
import { LANG_OPTIONS } from "../store/Constants";
import { logout } from "../store/authSlice";

const Header = ({ navItems }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loggedIn, submitting, profile } = useSelector((state) => state.authUser);
  const { selectedLang } = useSelector((state) => state.language);
  const { switchToolTip } = useSelector((state) => state.toolTip);
  const { t } = useTranslation("common");

  useEffect(() => {
    if (profile) {
      dispatch(setSelectedLang(profile.x_userlanguage));
    }
  }, []);

  return (
    <div className="w-full bg-white shadow-lg z-10 relative">
      <header className="flex px-6 py-4 text-blue-800 items-center">
        <div className="w-4/12">
          <button
            type="button"
            onClick={() => dispatch(setShowingSidebar(true))}
            className="lg:hidden">
            <svg
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24px"
              height="24px">
              <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z" />
            </svg>
          </button>
        </div>
        <h2 className="w-4/12 text-2xl font-medium tracking-wider text-center">
          {process.env.REACT_APP_WESITE_NAME}
        </h2>
        <div className="w-4/12 flex justify-end items-center space-x-6">
          <div data-tip={switchToolTip} data-for="changeLanguage" className="hidden lg:block">
            <Dropdown
              trigger={
                <button>
                  <LanguageIcon className="w-7 h-7 fill-current text-slate-500" />
                </button>
              }>
              {LANG_OPTIONS.map(([key, value]) => (
                <div
                  key={key}
                  value={key}
                  className={`hover:bg-blue-800 hover:text-white p-2 rounded ${
                    value === selectedLang ? "bg-blue-800 text-white" : "text-gray-700"
                  }`}
                  onClick={() => dispatch(setSelectedLang(value))}>
                  {key}
                </div>
              ))}
            </Dropdown>
          </div>
          <div data-tip data-for="disabletooltip" className="hidden lg:block">
            <Switch
              onChange={(v) => dispatch(setSwitchToolTip(v))}
              checked={switchToolTip}
              onColor="#0000FF"
              handleDiameter={22}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={42}
            />
          </div>
          <div data-tip={switchToolTip} data-for="profile" className="flex-shrink-0">
            {Auth.user !== null && (
              <Link data-tip data-for="profile" to="/profile">
                <img className="h-7 w-7" src={user_profile} />
              </Link>
            )}
          </div>
        </div>
        <ReactTooltip id="disabletooltip" place="right" delayHide={100} effect="float">
          {switchToolTip ? t("disabletooltip") : t("enabletooltip")}
        </ReactTooltip>
        <ReactTooltip id="changeLanguage" disable={!switchToolTip}>
          {t("changeLanguage")}
        </ReactTooltip>
        <ReactTooltip id="profile" disable={!switchToolTip}>
          {t("Profile")}
        </ReactTooltip>
      </header>
      {loggedIn ? (
        <nav className="border hidden lg:flex justify-between">
          <ul className="flex items-center space-x-2 overflow-auto">
            {Object.entries(navItems).map(([name, url]) => (
              <li key={url}>
                <Link to={url}>
                  <div
                    className={`py-2 px-8 rounded outline-none uppercase font-semibold whitespace-nowrap ${
                      url === location.pathname
                        ? "bg-blue-800 text-white"
                        : "text-slate-500 hover:bg-blue-800 hover:text-white"
                    }`}>
                    {t(name)}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <PrimaryButton onClick={() => dispatch(logout())} disabled={submitting}>
            {t("Logout")}
          </PrimaryButton>
        </nav>
      ) : (
        <nav className="border hidden lg:block">
          <ul className="flex items-center justify-end space-x-2 overflow-auto">
            {Object.entries({ Login: "/login", Register: "/register" }).map(([name, url]) => (
              <li key={url}>
                <Link to={url}>
                  <div
                    className={`py-2 px-8 rounded outline-none uppercase font-semibold whitespace-nowrap ${
                      url === location.pathname
                        ? "bg-blue-800 text-white"
                        : "text-slate-500 hover:bg-blue-800 hover:text-white"
                    }`}>
                    {t(name)}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

Header.propTypes = {
  navItems: PropTypes.object.isRequired
};

export default Header;
