import { addTrailerMovies } from '../utils/movieSlice';
import { API_OPTION } from '../utils/constant'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
const useMovieTrailer = (movieId)=>{

        const dispatch = useDispatch()
         //fetch trailer video and updating store with tailer video data
        const getMovieVideos = async()=>{
            const data = await fetch("https://api.themoviedb.org/3/movie/"+ movieId+ "/videos?language=en-US", API_OPTION)
            const json = await data.json()
            //console.log(json);
    
            const filteredTrailers = json.results.filter((video)=> video.type === "Trailer")
            const trailer = filteredTrailers.length ? filteredTrailers[0] : json.results[0];
           // console.log(trailer)
            dispatch(addTrailerMovies(trailer))
    
        } 
    
        useEffect(()=>{
             getMovieVideos();
        },[])

}

export default useMovieTrailer;