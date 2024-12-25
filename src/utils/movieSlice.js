import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        addNewMovies: null,
        addTrailer: null,

    },
    reducers: {
        addNowPlayingMovies: (state, action)=>{
          state.addNewMovies = action.payload;
        },
        addTrailerMovies: (state, action)=>{
            state.addTrailer = action.payload;
        }
    }
});

export const {addNowPlayingMovies, addTrailerMovies} = movieSlice.actions;
export default movieSlice.reducer;