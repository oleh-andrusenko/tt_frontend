import { useState, useEffect } from "react";
import axios from "axios";
function Finder({ t, setCars, setLoading }) {

    const [dates, setDates] = useState({
    startDate: "2023-01-01",
    endDate: "2023-02-01",
  });

  
  async function fetchCars() {
    setLoading(true);
    let formData = new FormData();
    formData.append("startDate", dates.startDate);
    formData.append("endDate", dates.endDate);

    const response = await axios.post("http://carsapi/cars.php", formData);
    setCars(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <form className="xl:w-1/2 xl:mx-auto border border-indigo-500/50 rounded-lg flex flex-col xl:flex-row items-center justify-between px-10 py-4">
      <div className="w-full flex gap-4 justify-between my-3 xl:border-r-2 xl:border-indigo-500 xl:pr-6 xl:mx-2 xl:text-[14px]">
        <p className="uppercase font-semibold text-indigo-600">
          {t("startDate")}
        </p>
        <input
          type="date"
          name={"startDate"}
          id={"startDate"}
          onChange={(e) => {
            setDates({ ...dates, startDate: e.target.value });
          }}
          defaultValue={dates.startDate}
        />
      </div>
      <div className="w-full flex gap-4 justify-between my-3  xl:pr-6 xl:text-[14px]">
        <p className="uppercase font-semibold text-indigo-600">
          {t("endDate")}
        </p>

        <input
          type="date"
          name={"endDate"}
          id={"endDate"}
          onChange={(e) => {
            setDates({ ...dates, endDate: e.target.value });
          }}
          defaultValue={dates.endDate}
        />
      </div>

      <button
        className="w-full my-2 px-2 py-1 rounded-lg bg-indigo-600 text-white xl:w-1/4"
        onClick={async (e) => {
          e.preventDefault();
          await fetchCars();
        }}
      >
        {t("find")}
      </button>
    </form>
  );
}

export default Finder;
