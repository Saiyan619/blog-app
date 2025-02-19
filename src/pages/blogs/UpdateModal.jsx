import React, { useState } from "react";
import axios from "axios";

const UpdateModal = ({ id }) => {
  const [blogData, setBlogData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    status: "",
    image: null, // Store as File, not string
  });

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setBlogData({ ...blogData, image: e.target.files[0] });
  };

  const editBlog = async () => {
    try {
      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("excerpt", blogData.excerpt);
      formData.append("content", blogData.content);
      formData.append("category", blogData.category);
      formData.append("status", blogData.status);
      formData.append("image", blogData.image); // Store file correctly

      const response = await axios.patch(
        `/api/posts/mutate/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        Edit Blog
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Title</legend>
            <input
              name="title"
              onChange={handleChange}
              type="text"
              className="input"
              placeholder="Type here"
            />
            <p className="fieldset-label">Optional</p>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Excerpt</legend>
            <input
              name="excerpt"
              onChange={handleChange}
              type="text"
              className="input"
              placeholder="Type here"
            />
            <p className="fieldset-label">Optional</p>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Your Content</legend>
            <textarea
              name="content"
              onChange={handleChange}
              className="textarea h-24"
              placeholder="content"
            ></textarea>
            <div className="fieldset-label">Optional</div>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Category</legend>
            <input
              name="category"
              onChange={handleChange}
              type="text"
              className="input"
              placeholder="Type here"
            />
            <p className="fieldset-label">Optional</p>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Status</legend>
            <select
              name="status"
              onChange={handleChange}
              defaultValue="published"
              className="select"
            >
              <option disabled={true}>Pick a status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <span className="fieldset-label">Optional</span>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Pick an Image</legend>
            <input onChange={handleImage} type="file" className="file-input" />
            <label className="fieldset-label">Max size 2MB</label>
          </fieldset>

          <button onClick={editBlog} className="btn">
            Update
          </button>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateModal;
