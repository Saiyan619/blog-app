import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../utils/Context'
import Nav from '../../globalComponents/Nav'

const SignUp = () => {
  
  const { login, register, fetchUserData, isAuthenticated, user, logout } = useAuth()

  const [userData, setUserData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    is_publisher: true
  })
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  console.log(user)
  
  // const [tokens, setTokens] = useState({
  //   access: '',
  //   refresh: ''
  // })
  
  
  
  // console.log(userData)
  // console.log(loginData)
  
  const handleEmail = (e) => {
    setUserData({...userData, email: e.target.value})
  } 
  
  const handleEmailLogin = (e) => {
    setLoginData({...loginData, email: e.target.value})
  }
  const handleFirstName = (e) => {
    setUserData({...userData, first_name: e.target.value})
  }
  const handleLastName = (e) => {
    setUserData({...userData, last_name: e.target.value})
  }
  const handlePassword = (e) => {
    setUserData({...userData, password: e.target.value})
  }
  const handlePasswordLogin = (e) => {
    setLoginData({...loginData, password: e.target.value})
  }

  const fetchUser = async () => {
    try {
    await  fetchUserData()
    } catch (error) {
      console.error(error)
      throw new Error;
    }
  }

  const handleRegistration = async () => {
    try {
      const response = await axios.post("/api/user/register", userData)
      console.log(response)
    } catch (error) {
      console.error(error)
      throw new Error;
    }
  }

  const handleLogin = async () => {
    try {
      const success = await login(loginData.email, loginData.password)
      if (success) {
        console.log('Login successful!')
      } else {
        console.error('Login failed')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <Nav />
              
          <div>
          <label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
  <input value={userData.email}  onChange={handleEmail} type="email" placeholder="mail@site.com" required/>
</label>
<div className="validator-hint hidden">Enter valid email address</div>
          </div>
          
      

          <div>
  <label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
  <input value={userData.first_name} onChange={handleFirstName} type="input" required placeholder="Username" pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" title="Only letters, numbers or dash" />
</label>
<p className="validator-hint">
  Must be 3 to 30 characters
  <br/>containing only letters, numbers or dash
</p>
          </div>
          
          <div>
  <label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
  <input value={userData.last_name}  onChange={handleLastName} type="input" required placeholder="Username" pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" title="Only letters, numbers or dash" />
</label>
<p className="validator-hint">
  Must be 3 to 30 characters
  <br/>containing only letters, numbers or dash
</p>
          </div>


          <div>
              
          <label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
  <input onChange={handlePassword} type="password" required placeholder="Password" minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
</label>
<p className="validator-hint hidden">
  Must be more than 8 characters, including
  <br/>At least one number
  <br/>At least one lowercase letter
  <br/>At least one uppercase letter
          </p>
          
      </div>
      
      <div>
        <button onClick={handleRegistration} className='btn btn-primary'>Register</button>
      </div> 
      
      <div>
        <button onClick={fetchUser} className='btn btn-primary'>get user</button>
      </div>


      {/* ///////////////////////////////////////////////////////////////// */}


      <div>
          <label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
  <input value={loginData.email} onChange={handleEmailLogin} type="email" placeholder="mail@site.com" required/>
</label>
<div className="validator-hint hidden">Enter valid email address</div>
          </div>
          


      <div>
              
              <label className="input validator">
      <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
      <input onChange={handlePasswordLogin} type="password" required placeholder="Password" minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
    </label>
    <p className="validator-hint hidden">
      Must be more than 8 characters, including
      <br/>At least one number
      <br/>At least one lowercase letter
      <br/>At least one uppercase letter
              </p>
              
          </div>

          <div>
        <button onClick={handleLogin} className='btn btn-primary'>login</button>
      </div>

    </div>
  )
}

export default SignUp
