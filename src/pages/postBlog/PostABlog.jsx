import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Nav from '../../globalComponents/Nav'
import { useAuth } from '../../utils/Context'
import { Bounce, ToastContainer } from 'react-toastify'



const PostABlog = () => {
    const {loader, setloader, postNotify, postNotifyError} = useAuth()
   // Separate useState hooks for each field
const [title, setTitle] = useState('');
const [excerpt, setExcerpt] = useState('');
const [content, setContent] = useState('');
const [category, setCategory] = useState(1);
const [status, setStatus] = useState('');
const [image, setImage] = useState(null);

// Separate handler functions
const handleTitle = (e) => {
    setTitle(e.target.value);
};

const handleExcerpt = (e) => {
    setExcerpt(e.target.value);
};

const handleContent = (e) => {
    setContent(e.target.value);
};

// const handleCategory = (e) => {
//     setCategory(1);
//     // setCategory(e.target.value);
// };

const handleStatus = (e) => {
    setStatus(e.target.value);
};

const handleImage = (e) => {
    setImage(e.target.files[0]);
};

    const postBlog = async () => {
        setloader(true)
        try {
            // Create FormData object
            const formData = new FormData();
            formData.append('title', title);
            formData.append('excerpt', excerpt);
            formData.append('content', content);
            formData.append('category', category);
            formData.append('status', status);
            formData.append('image', image);
    
            const response = await axios.post('/api/posts/mutate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            console.log(response.data);
            postNotify()
            setloader(false)
        } catch (error) {
            console.error(error);
            postNotifyError()
            setloader(false)
        }
    };

  return (
    <div>

          <Nav />
          <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
          />
          
          <h3 className='text-center text-2xl font-bold mt-5'>Create your Blog</h3>
          <div className='flex justify-center items-center w-full'>
          <div >
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
  <input value={category} disabled type="number" className="input" placeholder="Type here" />
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


                  <button onClick={postBlog} className="btn w-full btn-primary mt-5">
                  <span className={`${loader ? "loading" : ''} loading-spinner`}></span>
                      Post
                  </button>

  </div>
       </div>
          
    </div>
  )
}

export default PostABlog
