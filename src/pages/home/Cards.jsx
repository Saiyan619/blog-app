import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({item}) => {
  // Truncate the content if it's longer than 100 characters
  const truncatedContent = item.content.length > 100 
    ? `${item.content.substring(0, 100)}...` 
    : item.content;
    
  return (
    <div className="card bg-base-100 w-80 shadow-sm">
      <figure className="p-5">
        <img
          src={item.image}
          alt="Shoes"
          className="rounded-xl w-70" />
      </figure>
      <div className="card-body text-left">
        <span className='bg-blue-100 text-blue-700 font-semibold w-22 flex items-center p-1 rounded-sm'>Technology</span>
        <h2 className="card-title">{item.title}</h2>
        <p>{truncatedContent}</p>
        <div className="card-actions flex items-center justify-between">
          <div className='flex items-center gap-2'>
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div>
              <span>Jason Fransisco</span>
            </div>
          </div>
          <div>
            <span>August 20, 2022</span>
          </div>
        </div>
      </div>
      <Link to={`/blog/${item.id}`} className="btn btn-primary">Read More</Link>
    </div>
  )
}

export default Cards