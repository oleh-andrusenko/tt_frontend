import ReactCountryFlag from "react-country-flag"

function LanguageSwitcher({t, i18n}) {
  
  return (
    <div
      className={
        "w-full xl:w-1/3  px-2 py-1.5  flex flex-col xl:flex-row gap-4 items-center my-4"
      }
    >
      <p className={"text-sm w-1/3"}>{t("language")}:</p>
      <button
        className={`w-full xl:w-1/3 px-2 py-1 rounded-lg flex gap-2 items-center justify-center ${
          i18n.resolvedLanguage === "en"
            ? "bg-indigo-400 font-semibold text-white"
            : "bg-indigo-200 text-indigo-800"
        }`}
        onClick={() => i18n.changeLanguage("en")}
      >
        <ReactCountryFlag countryCode="US" svg />
        {t("en")}
      </button>
      <button
        className={`w-full xl:w-1/3 px-2 py-1 rounded-lg flex gap-2 items-center justify-center ${
          i18n.resolvedLanguage === "ua"
            ? "bg-indigo-400 font-semibold text-white"
            : "bg-indigo-200 text-indigo-800"
        }`}
        onClick={() => i18n.changeLanguage("ua")}
      >
        <ReactCountryFlag countryCode="UA" svg />
        {t("ua")}
      </button>
    </div>
  );
}

export default LanguageSwitcher;
