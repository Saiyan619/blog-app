import React, { useState, useEffect } from 'react'
import axios from "axios"
import Nav from '../../globalComponents/Nav'
import Footer from '../../globalComponents/Footer'
import Cards from './Cards'
import { useAuth } from '../../utils/Context'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
  const { isAuthenticated, loading, fetchUserData, user } = useAuth()

  const navigate = useNavigate()

  const [posts, setPosts] = useState([])

  // Fetch user data when the user is authenticated
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     fetchUserData()
  //   }
  // }, [isAuthenticated])


  useEffect(() => {
    fetchPosts()
    fetchUserData()
    const timeout = setTimeout(() => {
      if (user) {
        console.log("user is authenticated!")
      } else {
        navigate('/SignUp')
      }
    }, 10000); // 5 seconds delay
  
    return () => clearTimeout(timeout);

  }, [isAuthenticated])


  function checkAuth() {
    if (user) {
      console.log("user is authenticated!")
    } else {
      navigate('/SignUp')
    }
  }

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      if (!token) {
        console.error("No authentication token found")
        return
      }
      const response = await axios.get('/api/posts/mutate', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(response.data)
      setPosts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchSinglePost = async () => {
    try {
      const response = await axios.get(`/api/posts/${"the-is-my-post-for-today"}`)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      if (!token) {
        console.error("No authentication token found")
        return
      }
      const response = await axios.get('/api/posts/categories', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchData = async() => {
    await fetchUserData()
  }
  console.log(user)

  return (
    <div>
      <Nav />

      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}>
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello {user ? user.name : 'there'}</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      <div className='p-5 flex gap-5 flex-wrap items-center justify-center'>
        {posts.map((item, index) => (
          <div key={index}>
            <Cards item={item} />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  )
}

export default Homepage
