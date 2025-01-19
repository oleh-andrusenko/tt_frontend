import axios from "axios";
import {useEffect, useState, Suspense} from "react";
import {FaSearch} from "react-icons/fa";
import Loader from "./components/Loader.jsx";
import Paginator from "./components/Paginator.jsx";
import {useTranslation} from "react-i18next";
import ReactCountryFlag from "react-country-flag"

function App() {
    const {t, i18n} = useTranslation();
    const [cars, setCars] = useState([]);
    const [dates, setDates] = useState({
        startDate: '2023-01-01',
        endDate: '2023-02-01',
    });
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    async function fetchCars() {
        setLoading(true);
        let formData = new FormData();
        formData.append('startDate', dates.startDate);
        formData.append('endDate', dates.endDate);
        const response = await axios.post('http://carsapi/cars.php', formData);
        setCars(response.data);
        setLoading(false);
    }


    useEffect(() => {
        fetchCars();
    }, []);

    const filteredCars = cars.filter(function (car) {
        const query = car.title.concat(car.car_id);
        return query.toLowerCase().includes(search)
    });
    return (
        <Suspense fallback={<Loader/>}>
            <main className='px-4 py-2 xl:px-24 xl:py-12'>
                <div className={'w-full xl:w-1/3  px-2 py-1.5  flex flex-col xl:flex-row gap-4 items-center my-4'}>
                    <p className={'text-sm w-1/3'}>{t('language')}:</p>
                    <button
                        className={`w-full xl:w-1/3 px-2 py-1 rounded-lg flex gap-2 items-center justify-center ${i18n.resolvedLanguage === 'en' ? 'bg-indigo-400 font-semibold text-white' : 'bg-indigo-200 text-indigo-800'}`}
                        onClick={() => i18n.changeLanguage('en')}>
                        <ReactCountryFlag countryCode="US" svg />
                        {t('en')}
                    </button>
                    <button
                        className={`w-full xl:w-1/3 px-2 py-1 rounded-lg flex gap-2 items-center justify-center ${i18n.resolvedLanguage === 'ua' ? 'bg-indigo-400 font-semibold text-white' : 'bg-indigo-200 text-indigo-800'}`}
                        onClick={() => i18n.changeLanguage('ua')}>
                        <ReactCountryFlag countryCode="UA" svg />
                        {t('ua')}
                    </button>
                </div>
                <form
                    className='xl:w-1/2 xl:mx-auto border border-indigo-500/50 rounded-lg flex flex-col xl:flex-row items-center justify-between px-10 py-4'>
                    <div
                        className='w-full flex gap-4 justify-between my-3 xl:border-r-2 xl:border-indigo-500 xl:pr-6 xl:mx-2 xl:text-[14px]'>
                        <p className='uppercase font-semibold text-indigo-600'>{t('startDate')}</p>
                        <input type="date"
                               name={'startDate'}
                               id={'startDate'}
                               onChange={(e) => {
                                   setDates({...dates, startDate: e.target.value});
                               }}
                               defaultValue={dates.startDate}/>
                    </div>
                    <div className='w-full flex gap-4 justify-between my-3  xl:pr-6 xl:text-[14px]'>
                        <p className='uppercase font-semibold text-indigo-600'>{t('endDate')}</p>

                        <input type="date" name={'endDate'} id={'endDate'}
                               onChange={(e) => {
                                   setDates({...dates, endDate: e.target.value});
                               }}
                               defaultValue={dates.endDate}
                        />
                    </div>

                    <button
                        className='w-full my-2 px-2 py-1 rounded-lg bg-indigo-600 text-white xl:w-1/4'
                        onClick={async (e) => {
                            e.preventDefault();
                            await fetchCars();
                        }}>
                        {t('find')}
                    </button>
                </form>
                <div
                    className='w-full xl:w-1/2 xl:mx-auto flex gap-2 items-center my-6 px-4 py-2 border-2 rounded-lg border-gray-400'>
                    <FaSearch className='text-gray-400'/>
                    <input
                        className='focus:outline-none w-full'
                        type="text"
                        name="search"
                        id="search"
                        placeholder={t('searchHint')}
                        onChange={(e) => {
                            setSearch(e.target.value.toLowerCase());
                        }}
                    />
                </div>
                {!loading && <Paginator cars={filteredCars} t={t}/>}
                {loading && <Loader/>}


            </main>
        </Suspense>
    )
}

export default App
