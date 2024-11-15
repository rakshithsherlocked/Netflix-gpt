import React, { useState } from 'react'
import Header from './Header';

const Login = () => {
  const [isSignForm, setIsSignForm] = useState(true);
  const clickHandler = ()=>{
     setIsSignForm(!isSignForm);
  }
  return (
    <div>
        <Header/>
        <div className='absolute'> 
            <img
            alt='bg-img'
            src='https://assets.nflxext.com/ffe/siteui/vlv3/03ad76d1-e184-4d99-ae7d-708672fa1ac2/web/DE-de-20241111-TRIFECTA-perspective_aeb21217-08e4-4431-9112-c7cc550aec5c_large.jpg'
             />
        </div>
        <form className='w-3/12 absolute p-10 bg-black my-44 mx-auto right-0 left-0 text-white bg-opacity-80'>
            <h1 className='font-bold text-3xl py-3'> 
              {isSignForm ?"Sign In":"Sign Up" }
            </h1>

            {!isSignForm && (
              <input className='p-2 my-2 w-full bg-gray-500' 
              type='text' placeholder='name'/>)
              }
            
            
            <input className='p-2 my-2 w-full bg-gray-500' type='text' placeholder='email'/>
            <input className='p-2 my-2 w-full bg-gray-500' type='password' placeholder='password'/>

            <button className='p-2 my-2 bg-red-800 w-full'>
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