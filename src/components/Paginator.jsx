import Car from "./Car.jsx";
import {useEffect, useState} from "react";
import {FaArrowLeft, FaArrowRight, FaSadTear} from "react-icons/fa";

const Paginator = ({cars, t}) => {
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const pages = new Array(Math.round(cars.length / recordsPerPage)).fill(0).map((_, i) => i + 1);
    const [currentPage, setCurrentPage] = useState(1);

    const lastCarIndex = currentPage * recordsPerPage;
    const firstCarIndex = lastCarIndex - recordsPerPage;
    const slicedCars = cars.slice(firstCarIndex, lastCarIndex);

    useEffect(() => {
        setCurrentPage(1);
    }, [cars]);


    useEffect(() => {
        scrollTo(0, 0);
    }, [currentPage, recordsPerPage])

    function handlePrevPage() {
        setCurrentPage((prevCurrentPage) => prevCurrentPage - 1 <= 0 ? 1 : prevCurrentPage - 1);
    }

    function handleNextPage() {
        setCurrentPage((prevCurrentPage) => prevCurrentPage + 1 >= pages.length ? pages.length : prevCurrentPage + 1);
    }

    return (
        <div className={'py-10'}>
            {slicedCars !== undefined && slicedCars.length > 0 &&
                <div>
                    <div className={'flex flex-col gap-3 xl:flex-row xl:justify-between xl:items-center'}>
                        <div className={'flex gap-4 items-center h-full text-sm'}>
                            <div className={'font-semibold'}>{t('recordsPerPage')}:</div>
                            <button
                                onClick={() => setRecordsPerPage(10)}
                                className={`px-2 py-1.5 ${recordsPerPage === 10 ? 'bg-indigo-400 text-white font-semibold ' : 'bg-indigo-100 text-indigo-600 '} rounded`}>10
                            </button>
                            <button
                                onClick={() => setRecordsPerPage(20)}
                                className={`px-2 py-1.5 ${recordsPerPage === 20 ? 'bg-indigo-400 text-white font-semibold ' : 'bg-indigo-100 text-indigo-600 '} rounded`}>20
                            </button>
                            <button
                                onClick={() => setRecordsPerPage(30)}
                                className={`px-2 py-1.5 ${recordsPerPage === 30 ? 'bg-indigo-400 text-white font-semibold ' : 'bg-indigo-100 text-indigo-600 '} rounded`}>30
                            </button>
                        </div>
                        <p className='flex items-center justify-center xl:justify-end gap-3  px-2 py-1.5 rounded-lg bg-indigo-600 text-white'>
                            <span className={'font-semibold'}>  {t('found')}:</span>{cars.length}
                        </p>
                    </div>

                    {slicedCars.map((car, index) => <Car car={car} key={index} t={t}/>)}
                    {pages.length > 1 && <div className={'flex justify-center gap-2 py-6'}>
                        <button
                            onClick={handlePrevPage}

                            className={`p-2 mr-3 bg-indigo-400 text-white font-semibold rounded w-8 h-8 text-sm flex items-center justify-center`}>
                            <FaArrowLeft/>

                        </button>
                        {pages.slice(currentPage - 3 < 0 ? currentPage - 1 : currentPage - 3, currentPage + 3).map(page =>
                            <button
                                onClick={() => setCurrentPage(page)}
                                key={page}
                                className={`p-2 ${currentPage === page ? 'bg-indigo-400 text-white ' : 'bg-indigo-100 text-indigo-600 '}  font-semibold rounded w-8 h-8 text-sm flex items-center justify-center`}>
                                {page}

                            </button>
                        )}
                        <button
                            onClick={handleNextPage}

                            className={`p-2 ml-3 bg-indigo-400 text-white font-semibold rounded w-8 h-8 text-sm flex items-center justify-center`}>
                            <FaArrowRight/>

                        </button>
                    </div>}
                </div>

            }
            {slicedCars.length === 0 && <div className={'w-full xl:w-[400px] flex flex-col items-center justify-center gap-6 mx-auto px-6 py-4 border-2 rounded-lg font-semibold text-indigo-600  text-center text-lg'}>{t('notFound')} <FaSadTear className={'text-4xl'}/></div>}

        </div>
    );
};

export default Paginator;