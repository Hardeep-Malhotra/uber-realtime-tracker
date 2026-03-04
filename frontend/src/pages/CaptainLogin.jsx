import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [CaptainData, setCaptainData] = useState({
      email: '',
      password: ''
    })
   
  
    const submitHandler = (e) => {
      e.preventDefault()
      // state updates are asynchronous, so logging `userData` right after
      // setuserData will still show the previous value. Instead, create a
      // local object to represent the credentials and log/use that directly.
      const credentials = { email, password }
  
      console.log('logging credentials on submit:', credentials)
  
      // now update state if you need to store it for later use
      setCaptainData(credentials)
  
      // clear form fields
      setemail('')
      setpassword('')
    }
    
  return (
    <div className='p-7 flex justify-between flex-col h-screen w-full'>
        <div>
            <img className='w-16 mb-10'  src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber logo" />

            <form onSubmit={(e)=>submitHandler(e)} >
              <h3 className='text-lg font-medium mb-2'>What's your email</h3>
              <input 
              required type="email" 
              value={email} onChange={(e) => setemail(e.target.value)}
              className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              name="email" id="email" 
              placeholder='email@domain.com'
              />

              <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
              <input 
              required type="password" 
              value={password} onChange={(e) => setpassword(e.target.value)}
              className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              name="password" id="password" 
              placeholder='Enter Password'/>

              <button
              className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'
              >login</button>
            </form>
            <p className='text-center text-sm text-gray-500 mt-4'>
                Join the fleet? 
               <Link to="/UserSignup" className='text-blue-500 hover:underline'> Register as a Captain</Link>
              </p>
        </div>
        <div>
          <Link to="/UserLogin" 
          className='flex items-center justify-center w-full bg-gray-200 text-black py-3 rounded mt-5'>
            Login as User 
          </Link>
        </div>
    </div>
  )
}

export default CaptainLogin