import { useState } from "react";
import { useTranslation } from "react-i18next";

import Loader from "./components/Loader.jsx";
import LanguageSwitcher from "./components/LanguageSwitcher.jsx";
import Finder from "./components/Finder.jsx";
import CarsList from "./components/CarsList.jsx";


function App() {
  const { t, i18n } = useTranslation();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  

  return (
    <main className="px-4 py-2 xl:px-24 xl:py-12">
      <LanguageSwitcher t={t} i18n={i18n} />
      <Finder t={t} setCars={setCars} setLoading={setLoading} />
      <CarsList cars={cars} t={t} loading={loading}/>
      {loading && <Loader />}
    </main>
  );
}

export default App;
