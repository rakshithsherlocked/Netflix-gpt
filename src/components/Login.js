import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValidate } from '../utils/validate';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { BG_URL } from '../utils/constant';


const Login = () => {
  const [isSignForm, setIsSignForm] = useState(true);
  const [errorMessage, setErrorMessage]= useState("");
  const navigate = useNavigate();
  const dispatch= useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick =()=>{

   //console.log(name.current.value)
   //console.log(email.current.value);
   //console.log(password.current.value);

   const message = checkValidate(email.current?.value, password.current?.value)
   //console.log(message);
   setErrorMessage(message)
   if(message) return;

   if(!isSignForm){
    //SignUP Logic
    createUserWithEmailAndPassword(auth, email.current?.value, password.current?.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + errorMessage);
  
  });

   }
   else{
    signInWithEmailAndPassword(auth, email.current?.value, password.current?.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name?.current?.value, photoURL:"https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
      //after login first the profile will update then navigate to browser.
      const {uid, email, displayName, photoURL} = auth.currentUser;
      dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
      navigate("/browse")
    }).catch((error) => {
      setErrorMessage(errorMessage);
    });
    //console.log(user);
    navigate("/browse")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + errorMessage)
  });
   }

  }

  const clickHandler = ()=>{
     setIsSignForm(!isSignForm);
  }
  return (
    <div>
        <Header/>
        <div className='absolute'> 
            <img
            alt='bg-img'
            src={BG_URL}
             />
        </div>
        <form onSubmit={(e)=> e.preventDefault()} className='w-3/12 absolute p-10 bg-black my-44 mx-auto right-0 left-0 text-white bg-opacity-80'>
            <h1 className='font-bold text-3xl py-3'> 
              {isSignForm ?"Sign In":"Sign Up" }
            </h1>

            {!isSignForm && (
              <input ref={name}
              className='p-2 my-2 w-full bg-gray-500' 
              type='text' placeholder='name'/>)
              }
            
            
            <input ref={email}
            className='p-2 my-2 w-full bg-gray-500' type='text' placeholder='email'/>
            <input ref={password}
            className='p-2 my-2 w-full bg-gray-500' type='password' placeholder='password'/>

            <p className='font-bold text-red-600'>{errorMessage}</p>

            <button className='p-2 my-2 bg-red-800 w-full' onClick={handleButtonClick}>
              {isSignForm ?"Sign In":"Sign Up"}
            </button>

            <h1 className='text-center'>OR</h1>
            <button className='p-2 my-2 bg-slate-700 w-full bg-opacity-55'>Use login code</button>
            <p className='p-2 m-2 cursor-pointer'  onClick={clickHandler}>{isSignForm ?"New to Netlix? Sign Up Now":"Already a user? Sign In Now"}</p>
        </form>
        
    </div>
  )
}

export default Login;