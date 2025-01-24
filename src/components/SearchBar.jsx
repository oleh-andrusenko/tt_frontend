import React from 'react'
import { FaSearch } from "react-icons/fa";
function SearchBar({t, setSearch}) {
  return (
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
  )
}

export default SearchBar