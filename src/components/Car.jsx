import {motion} from "framer-motion";

function Car({car, t}) {
    return (
        <motion.div
            initial={{opacity: 0, scale: 0}}
            animate={{opacity: 1, scale: [1, 1.02, 1]}}
            transition={{duration: 0.4}}
            className='flex flex-col xl:flex-row gap-4 justify-between my-3 px-2 py-3 xl:px-6 xl:py-4 border rounded shadow-sm'>
            <div className={'w-full xl:w-3/4'}>
                <div className={'grid grid-rows-3 xl:grid-rows-1 grid-cols-1 xl:grid-cols-7 xl:gap-2'}>
                    <p className={'xl:col-span-1 mb-2 xl:text-center text-gray-700 xl:pr-4 xl:border-r-2'}>ID: {car.car_id}</p>
                    <p className={'xl:col-span-5 font-semibold text-indigo-600 text-lg'}>{car.title}, {car.year}</p>
                    <div className={'flex items-center gap-4 col-span-1 text-gray-400'}>
                        <div
                            className={'border border-gray-400 w-5 h-5 rounded-full'}
                            style={{backgroundColor: car.color}}>
                        </div>
                        {car.color}

                    </div>
                </div>
            </div>
            <div className='w-full xl:w-1/4'>
                <div className={'flex gap-4 items-center justify-between xl:justify-end h-full text-[12px]'}>
                    <div className={'w-1/3 text-center border-2 px-2 py-1 border-red-500 text-red-600 rounded-full'}>
                        <p><span>{t('busy')}:</span> {car.busy}</p>
                    </div>
                    <div
                        className={'w-1/3 text-center border-2 px-2 py-1 border-green-400 text-green-600 rounded-full'}>
                        <p><span>{t('free')}:</span> {car.total - car.busy}</p>
                    </div>
                    <div
                        className={'w-1/3 text-center border-2 px-2 py-1 border-indigo-500 text-indigo-600 rounded-full'}>
                        <p>
                            <span>{t('total')}:</span> {car.total}
                        </p>
                    </div>
                </div>
            </div>


        </motion.div>

    );
}

export default Car;