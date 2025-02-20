import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../utils/Context'
import Nav from '../../globalComponents/Nav'
import { Link } from 'react-router-dom'

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">
                  First name
                </label>
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="First name"
                  value={userData.first_name}
                  onChange={handleFirstName}
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Last name
                </label>
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Last name"
                  value={userData.last_name}
                  onChange={handleLastName}
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={userData.email}
                onChange={handleEmail}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={userData.password}
                onChange={handlePassword}
              />
            </div>
           
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to={'/Login'} className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </div>
      </div>
    </div>

    </div>
  )
}

export default SignUp
