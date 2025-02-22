import { useEffect } from 'react'
import { API_OPTION } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlayingMovies } from '../utils/movieSlice';

const useNowPlayingMovies = ()=>{

    const dispatch = useDispatch();
    //for memoizatiom
    const nowPlayingMovies = useSelector(store=> store.movies.nowPlayingMovies);

  const getNowPlayingMovie = async()=>{
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTION)
    const json = await data.json()
    //console.log(json.results);
    dispatch(addNowPlayingMovies(json.results))
  }
  useEffect(()=>{
    //memoization (if now playing movies is not there then make api call)
   !nowPlayingMovies && getNowPlayingMovie();
  },[])
  
}

export default useNowPlayingMovies;