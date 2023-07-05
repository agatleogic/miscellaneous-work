import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const PasswordHelp = ({ children }) => {
  const { t } = useTranslation("common");
  return (
    <>
      <div className="group relative overflow-visible flex flex-col justify-center">
        {children || (
          <span className="bg-gray-500 font-medium text-sm text-white rounded-full w-4 h-4 flex justify-center items-center">
            ?
          </span>
        )}
        <div className="prose-sm group-hover:block hidden absolute p-4 bg-slate-900 text-white rounded ml-6 whitespace-nowrap">
          <div>
            <label>{t("Password minimum length")}: </label>
            <span>{t("8 character(s)")}</span>
          </div>

          <label>{t("Password requirements")}:</label>
          <ul className="list-disc">
            <li>{t("Contains at least 1 number")}</li>
            <li>
              {t("Contains at least 1 special character")} <br />
              (^ $ * . [ ] {} ( ) ? - " ! @ # % & / \ , &gt; &lt; ' : ; | _ ~ \` + =)
            </li>
            <li>{t("Contains at least 1 uppercase letter")}</li>
            <li>{t("Contains at least 1 lowercase letter")}</li>
          </ul>
        </div>
      </div>
    </>
  );
};

PasswordHelp.propTypes = {
  children: PropTypes.node
};

export default PasswordHelp;
