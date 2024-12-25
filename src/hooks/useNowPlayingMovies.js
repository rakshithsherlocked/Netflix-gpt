import { useEffect } from 'react'
import { API_OPTION } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from '../utils/movieSlice';

const useNowPlayingMovies = ()=>{

    const dispatch = useDispatch();

  const getNowPlayingMovie = async()=>{
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTION)
    const json = await data.json()
    console.log(json.results);
    dispatch(addNowPlayingMovies(json.results))
  }
  useEffect(()=>{
       getNowPlayingMovie();
  },[])
  
}

export default useNowPlayingMovies;