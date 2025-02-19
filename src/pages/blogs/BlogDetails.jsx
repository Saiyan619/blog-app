import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Nav from '../../globalComponents/Nav'

const BlogDetails = () => {
    const { id } = useParams()
    const [blogDetails, setBlogDetails] = useState({})

    console.log(id)

    useEffect(() => {
        fetchSinglePost(id)
    }, [id])
    

    const fetchSinglePost = async (id) => {
        try {
            const response = await axios.get(`/api/posts/mutate/${id}`)
            console.log(response.data)
            setBlogDetails(response.data)
        } catch (error) {
            console.error(error)
        }
    };

  return (
      <div>
          <Nav />
          
          <div className='flex flex-col justify-center'>
          <div className=''>
              <h1 className='text-4xl font-bold capitalize'>{blogDetails.title}</h1>

              <div className='flex items-center gap-4'>
                  <div><span>Posted By:</span></div>

                  <div>
                  <div className="avatar avatar-placeholder">
  <div className="bg-neutral text-neutral-content w-8 rounded-full">
    <span className="text-sm">D</span>
  </div>
</div>
                      <span>Olaniyi Ebenezer</span>
            </div>
              </div>
                       </div>

          <div className='flex items-center justify-center'>
              <img src={blogDetails.image} alt="image" />
          </div>
        </div>


          <div>          <p>{blogDetails.content}</p>
          </div>

          </div>
          
  )
}

export default BlogDetails
