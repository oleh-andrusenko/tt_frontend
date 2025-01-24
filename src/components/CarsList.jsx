import SearchBar from "./SearchBar.jsx";
import Paginator from "./Paginator.jsx";
import {useState} from "react";


function CarsList({cars, t, loading}) {
  const [search, setSearch] = useState("");

  const filteredCars = cars.filter(function (car) {
    const query = car.title.concat(car.car_id);
    return query.toLowerCase().includes(search);
  });

  return (
    <>
      <SearchBar t={t} setSearch={setSearch} />
      {!loading && <Paginator cars={filteredCars} t={t} />}
    </>
  )
}

export default CarsList