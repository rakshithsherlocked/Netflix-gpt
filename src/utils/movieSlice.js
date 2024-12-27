import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        addNewMovies: null,
        popularMovies:null,
        topRatedMovies: null,
        upComingMovies: null,
        addTrailer: null,

    },
    reducers: {
        addNowPlayingMovies: (state, action)=>{
          state.addNewMovies = action.payload;
        },
        addPopularMovies: (state, action)=>{
          state.popularMovies = action.payload
        },
        addTopRatedMovies: (state, action)=>{
            state.topRatedMovies = action.payload
        },
        addUpComingMovies: (state, action)=>{
            state.upComingMovies = action.payload
        },  
        addTrailerMovies: (state, action)=>{
            state.addTrailer = action.payload;
        }
    }
});

export const {addNowPlayingMovies, addTrailerMovies, addPopularMovies, addTopRatedMovies, addUpComingMovies} = movieSlice.actions;
export default movieSlice.reducer;