import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Login'
import Browse from './Browse'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { auth } from '../utils/firebase'
import { onAuthStateChanged } from "firebase/auth";

const Body = () => {
    const dispatch = useDispatch();
    const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login/>

    },
    {
        path: "/browse",
        element: <Browse/>
    }
])

useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const {uid, email, displayname} = user;
          dispatch(addUser({uid: uid, email: email, displayname: displayname}));
          // ...
        } else {
          // User is signed out
          // ...
          dispatch(removeUser)
        }
      });
},[])
  return (
    <div>
        <RouterProvider router={appRouter}/>
        </div>
  )
}

export default Body