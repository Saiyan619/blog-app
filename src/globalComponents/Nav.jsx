import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div>
     <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
    <Link className='hover:bg-gray-200 p-1 rounded capitalize' to={'/'}><li>Home</li></Link>
              <Link className='hover:bg-gray-200 p-1 rounded capitalize' to={'/post_a_blog'}><li>post Blog</li></Link>
              <Link  className='hover:bg-gray-200 p-1 rounded capitalize'to={'/SignUp'}><li>sign up</li></Link>
      </ul>
    </div>
                  <a className="btn btn-ghost text-xl">
                  <img className='w-28' src="./Logo (3).png" alt="logo" />
    </a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <Link className='hover:bg-gray-400 p-2' to={'/'}><li>Home</li></Link>
              <Link className='hover:bg-gray-400 p-2' to={'/post_a_blog'}><li>post Blog</li></Link>
              <Link  className='hover:bg-gray-400 p-2'to={'/SignUp'}><li>sign up</li></Link>
    </ul>
  </div>
  <div className="navbar-end gap-5">
                  <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                  {/* <input type="checkbox" defaultChecked className="toggle toggle-sm" /> */}
  </div>
</div>
    </div>
  )
}

export default Nav
