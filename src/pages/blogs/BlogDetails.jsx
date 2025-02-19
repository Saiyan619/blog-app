import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../globalComponents/Nav";
import UpdateModal from "./UpdateModal";
import DeleteBlog from "./DeleteBlog";

const BlogDetails = () => {
  const { id } = useParams();
  const [blogDetails, setBlogDetails] = useState({});

  console.log(id);

  useEffect(() => {
    fetchSinglePost(id);
  }, [id]);

  const fetchSinglePost = async (id) => {
    try {
      const response = await axios.get(`/api/posts/mutate/${id}`);
      console.log(response.data);
      setBlogDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Nav />

          <div className="flex items-center justify-center flex-col w-2/3 m-auto mt-10">
              
          <div className="flex flex-col justify-center m-auto gap-7">
              
              <div className="flex flex-col justify-start">
                  
                  <div>
                  <div className="badge badge-primary">Primary</div>
                  </div>
    
                  <div className="mt-1">
                      <h1 className="text-4xl font-bold capitalize">{blogDetails.title}</h1>
                      {/* <h1 className="text-4xl font-bold capitalize">The impact of technology on the workplace: How technology is changing</h1> */}
                  </div>
    
                  <div className="mt-3">
                      
                      <div className="avatar avatar-placeholder">
      <div className="bg-neutral text-neutral-content w-8 rounded-full ">
        <span className="text-xs">UI</span>
      </div>
                      </div>
                      
                          <span className="ml-2">Olaniyi Ebenezer</span>
                          
                          <span className="ml-5">August 20, 2030</span>
                  </div>
    
              </div>

                  <div>
                      <UpdateModal id={id} />
                      <DeleteBlog />
                  </div>
    
                  <div>
                      <img className="rounded-2xl" src={blogDetails.image} alt="blog image" />
                  </div>
    
              </div>

              <div className="flex flex-col justify-center m-auto">
              <p className="mt-5">{blogDetails.content}</p>
              <p className="flex flex-col justify-center m-auto gap-7 ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non doloribus, eos in officiis laborum voluptas dignissimos minima aliquid ea, atque deleniti rerum, maxime accusamus sequi temporibus natus voluptatum quas nemo.
              </p>
          </div>
              
          </div>
          
        
    </div>
  );
};

export default BlogDetails;
