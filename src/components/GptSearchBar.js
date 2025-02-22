import React, { useRef } from 'react'
import { language } from '../utils/languageConstant'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai'
import { API_OPTION } from '../utils/constant'
import { addGptMovieResult } from '../utils/gptSlice'

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector(store=> store.config.lang) 
  const searchText = useRef(null);

  // for each movie, search movie in tmdb

  const searchMovieTmdb = async(movie)=>{
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+ movie+"&include_adult=false&language=en-US&page=1",
     API_OPTION);

     const json = await data.json()

     return json.results;

  };
 
  const handleGPTSearch = async()=>{
    console.log(searchText.current.value)
    //Making an api call to gpt api and get the movie results

  
    const gptQuery = "Please act like a movie recommendation system and get some movies for the query: " + searchText.current.value + ". Only give the movie names, and return exactly 5 movies as a comma-separated list (e.g., 'KGF, RRR, KGF2, Vikram, Topgun')."; 

   const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
     });
 
     if (!gptResults.choices || !gptResults.choices[0]?.message?.content) {
      console.error("Error: No results from GPT");
      return;
  }
    
     console.log(gptResults.choices?.[0]?.message?.content)
    
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",")
    //["kgf", "abc", "hgk", "kgf2", "kgf3"]
    // for each movie, will search for tmdb api

    // map function (and in data it will consist promise (promise array)))
    // and basically searchMovieTmdb will make 5 api calls since 5 movies in list
    const promiseArray = gptMovies.map((movie)=> searchMovieTmdb(movie));

    // when all the promises is resolved and they the tmdbResults will get the data finally.
    const tmdbResults = await Promise.all(promiseArray)


    console.log(tmdbResults);
    // and lets push all the movie data to the store and later we can access, that will make the jobb easy.

   // dispatch(addGptMovieResult(tmdbResults))

   //for mutiple actions for gpt movies and movie results
   dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}))

  }
  return (
    <div className='pt-[10%] flex justify-center'>
        <form className='w-1/2 bg-black grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
            <input 
            ref={searchText}
            type= "text" 
            className="p-2 m-4 col-span-9" placeholder={language[langKey].placeholder}/>
            
            <button 
            className='py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3'
            onClick={handleGPTSearch}
            >{language[langKey].Search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar