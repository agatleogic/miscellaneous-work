import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import user_profile from "./../Icons/user_profile.png";
import Dropdown from "../Component/Dropdown";
import { ReactComponent as LanguageIcon } from "./../Icons/language.svg";
import { useTranslation } from "react-i18next";
import Switch from "react-switch";
import { useDispatch, useSelector } from "react-redux";
import { setSwitchToolTip } from "../store/toolTipSlice";
import { setSelectedLang } from "../store/languageSlice";
import { LANG_OPTIONS } from "../store/Constants";

const Sidebar = ({ show, onClose, navItems }) => {
  const { userAttributes, user } = useSelector((state) => state.authUser);
  const { selectedLang } = useSelector((state) => state.language);
  const { switchToolTip } = useSelector((state) => state.toolTip);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  useEffect(() => {
    setEmail(
      userAttributes.reduce((prev, curr) => ({ ...prev, [curr.Name]: curr.Value }), {})?.email
    );
  }, [userAttributes]);

  return show ? (
    <div className="absolute inset-0 z-20">
      <div className="absolute inset-0 bg-black bg-opacity-40" onClick={onClose}></div>
      <div className="relative max-w-xs h-full bg-white overflow-hidden flex flex-col">
        <button
          className="absolute right-2 top-2 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:shadow-xl"
          onClick={onClose}>
          <span className="font-medium text-2xl">&times;</span>
        </button>
        <div className="py-2 px-8 flex space-x-2 items-center border-b">
          <div>
            <img className="h-7 w-7" src={user_profile} />
          </div>
          <div className="flex-auto">
            <h4 className="text-gray-700 font-medium text-sm">{email}</h4>
            <p className="text-gray-500 text-xs">{username}</p>
          </div>
        </div>
        <nav className="flex-auto overflow-auto p-2 bg-gray-100">
          <ul className="flex flex-col space-y-2">
            {Object.entries(navItems).map(([name, url]) => (
              <li key={url}>
                <Link to={url} onClick={onClose}>
                  <div
                    className={`py-2 px-8 rounded outline-none font-medium uppercase whitespace-nowrap ${
                      url === location.pathname
                        ? "bg-blue-800 text-white font-semibold"
                        : "text-slate-500 hover:bg-blue-800 hover:text-white"
                    }`}>
                    {t(name)}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col space-y-2 p-2 border-t">
          <div className="flex items-center justify-between">
            <label className="text-gray-600 text-sm">Language</label>
            <Dropdown
              up
              trigger={
                <button>
                  <LanguageIcon className="w-6 h-6 fill-current text-slate-500" />
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
          <div className="flex items-center justify-between">
            <label className="text-gray-600 text-sm">Tooltip</label>
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
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

Sidebar.propTypes = {
  navItems: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func
};

export default Sidebar;
