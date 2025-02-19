import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Nav from '../../globalComponents/Nav'


const PostABlog = () => {
    const [blogData, setBlogData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        status: '',
        image: ''
    })
    const handleTitle = (e) => {
        setBlogData({ ...blogData, title: e.target.value })   
    }
    const handleExcerpt = (e) => {      
        setBlogData({ ...blogData, excerpt: e.target.value })
    }
    const handleContent = (e) => {
        setBlogData({ ...blogData, content: e.target.value })
    }
    const handleCategory = (e) => {
        setBlogData({ ...blogData, category: e.target.value })
    }
    const handleStatus = (e) => {
        setBlogData({ ...blogData, status: e.target.value })    
    }   
    const handleImage = (e) => {
        setBlogData({ ...blogData, image: e.target.files[0].name });
    }

    const postBlog = async () => {
        try {
            // Create FormData object
            const formData = new FormData();
            formData.append('title', blogData.title);
            formData.append('excerpt', blogData.excerpt);
            formData.append('content', blogData.content);
            formData.append('category', blogData.category);
            formData.append('status', blogData.status);
            formData.append('image', blogData.image);
    
            const response = await axios.post('/api/posts/mutate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    console.log(blogData)
  return (
    <div>

          <Nav />
          
          <div>
          <fieldset className="fieldset">
  <legend className="fieldset-legend">Title</legend>
  <input onChange={handleTitle} type="text" className="input" placeholder="Type here" />
  <p className="fieldset-label">Optional</p>
          </fieldset>
          
          <fieldset className="fieldset">
  <legend className="fieldset-legend">Excerpt</legend>
  <input onClick={handleExcerpt} type="text" className="input" placeholder="Type here" />
  <p className="fieldset-label">Optional</p>
          </fieldset>
          
          <fieldset className="fieldset">
  <legend className="fieldset-legend">Your Content</legend>
  <textarea onChange={handleContent} className="textarea h-24" placeholder="content"></textarea>
  <div className="fieldset-label">Optional</div>
</fieldset>
          
          <fieldset className="fieldset">
  <legend className="fieldset-legend">Category</legend>
  <input onClick={handleCategory} type="number" className="input" placeholder="Type here" />
  <p className="fieldset-label">Optional</p>
          </fieldset>

          <fieldset className="fieldset">
  <legend className="fieldset-legend">Status</legend>
  <select onChange={handleStatus} defaultValue="published" className="select">
    <option disabled={true}>Pick a browser</option>
    <option value={"draft"}>draft</option>
    <option value={"published"}>published</option>
  </select>
  <span className="fieldset-label">Optional</span>
          </fieldset>
          

          <fieldset className="fieldset">
  <legend className="fieldset-legend">Pick a image</legend>
  <input onChange={handleImage} type="file" className="file-input" />
  <label className="fieldset-label">Max size 2MB</label>
</fieldset>


<button onClick={postBlog} className="btn">Post</button>

  </div>
          
    </div>
  )
}

export default PostABlog
