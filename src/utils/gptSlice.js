import { createSlice } from "@reduxjs/toolkit";

 const gptSlice = createSlice({
    name:'gpt',
    initialState:{
        showGptSearch: false,
        movieNames: null,
        movieResults: null,
    },
    reducers:{
        toggleGptSearchView: (state)=>{
            state.showGptSearch = !state.showGptSearch
        },
        // we can also create seperate action for gpt recommended movies before array eg, kgf, kgf2, abc, hgk. but we will do 
        addGptMovieResult: (state, action)=>{
            const {movieNames, movieResults} = action.payload
            state.movieNames = movieNames;
            state.movieResults= movieResults;
        },
       
        //for just single action to get only the gpt results  
        // addGptMovieResult: (state, action)=>{
        //    state.gptMovies = action.payload;
    }
 })

 export const {toggleGptSearchView, addGptMovieResult}= gptSlice.actions;
 export default gptSlice.reducer;