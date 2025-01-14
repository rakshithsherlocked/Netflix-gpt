import React from 'react'
import { language } from '../utils/languageConstant'
import { useSelector } from 'react-redux'

const GptSearchBar = () => {
  const langKey = useSelector(store=> store.config.lang) 
  return (
    <div className='pt-[10%] flex justify-center'>
        <form className='w-1/2 bg-black grid grid-cols-12'>
            <input type= "text" 
            className="p-2 m-4 col-span-9" placeholder={language[langKey].placeholder}/>
            <button 
            className='py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3'>{language[langKey].Search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar