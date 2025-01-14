import React, { useEffect } from 'react'
import {signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { onAuthStateChanged } from "firebase/auth";
import { LOGO, SUPPORT_LANGUAGE, USER_LOGO } from '../utils/constant';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store)=> store.user)
  const showGptSearch = useSelector(store=> store.gpt.showGptSearch)


  const handleSignOut =()=>{
    signOut(auth).then(() => {
  navigate("/")
   }).catch((error) => {
  navigate("/error")
   });
  }

  const handleGptButton =()=>{

    dispatch(toggleGptSearchView())
  }
  useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const {uid, email, displayName, photoURL} = user;
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
            navigate("/browse")
            // ...
          } else {
            // User is signed out
            // ...
            dispatch(removeUser())
            navigate("/")
          }
        });
        
        return()=>{
          unsubscribe();
        }
      },[])

      const handleLanguageChange =(e)=>{
       dispatch(changeLanguage(e.target.value))
      }
  
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-gray z-10 flex justify-between'>
       <img className='w-44 '
       alt='logo'
       src={LOGO}/>
       {/*if user is present then go ahead */}
       {user && (
        <div className='flex p-2 m-2'>
         { showGptSearch &&( <select className='p-2 m-2 bg-gray-800 text-white' onChange={handleLanguageChange}>
          {SUPPORT_LANGUAGE.map((lang)=> {<option key={lang.identifier} value={lang.identifier}> {lang.name} </option>})}
        
        <option value="en"> English </option>
        <option value="de"> Deutch </option>
        <option value="es"> Spanish </option>
      </select> )}
        <button className='py-2 px-4 m-2 text-white bg-purple-800 rounded-lg mx-4 my-2' onClick={handleGptButton}>
          {showGptSearch ?"homepage" : "GPT Search"}</button>
        <img className=' w-12 h-12'
        alt=''
        src= {USER_LOGO}/>

        <button onClick={handleSignOut} className='text-white'>🔽</button>
        </div>
        )}

    
    </div>
  )
}

export default Header;