import React, { use, useState } from 'react'
import { Link } from 'react-router-dom'

const Captainsignup = () => {
    const [first, setfirst] = useState('')
    const [second, setsecond] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userdata, setuserdata] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    })
    
    const submitHandler = (e) => {
      e.preventDefault()
  
      setuserdata({
        fullName:{
          firstName: first,
          lastName: second
        },
        email: email,
        password: password
      })
      setEmail('')
      setPassword('')
      setfirst('')
      setsecond('')
      
  
      // Here you would typically handle form submission, e.g., send data to your backend API
      console.log('User Data on submit:', {
        username:{
          firstName: first,
          lastName: second
        },
        email: email,
        password: password
      })
    }

  return (
    <div>
        <div className='py-5 px-5 flex justify-between flex-col h-screen w-full'>
        <div>
            <img className='w-16 mb-10'  src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber logo" />

            <form onSubmit={(e)=>submitHandler(e)} >
              <h3 className='text-lg font-medium mb-2'>What's Our Captain's Name</h3>
              <div className='flex gap-4 mb-6'>
                   <input 
                    required
                    className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base'
                    type='text' id="firstName" 
                    placeholder='First Name'
                    value={first}
                    onChange={(e) => setfirst(e.target.value)}  
                    />
                    <input 
                    className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base'
                    type='text' id="lastName" 
                    placeholder='Last Name'
                    value={second}
                    onChange={(e) => setsecond(e.target.value)}
                    />
              </div>

              <h3 className='text-lg font-medium mb-2'>What's Our Captain's email</h3>
              <input 
              className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              name="email" id="email" 
              placeholder='email@domain.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />

              <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
              <input 
              className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              name="password" id="password" 
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />

              <button
              className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'
              >Sign Up</button>
            </form>
            <p className='text-center text-sm text-gray-500 mt-4'>
                Already have an account?
               <Link to="/CaptainLogin" className='text-blue-500 hover:underline'> Login here</Link>
              </p>
        </div>
        <div>
          <p className='text-[10px] leading-tight text-gray-500 text-center mt-4'>
            This site is procted by reCAPTCHA and the <span className='underline'> Google Privacy Policy </span> and
            <span className='underline'> Terms of Service</span> apply.
          </p>
        </div>
    </div>
    </div>
  )
}

export default Captainsignup
