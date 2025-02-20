import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../utils/Context";

const UpdateModal = ({ id }) => {
  const { editNotify, editNotifyError, loader, setloader } = useAuth();
  const [blogData, setBlogData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: 1,
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
    setloader(true)
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
      editNotify()
      setloader(false)

    } catch (error) {
      console.error(error);
      editNotifyError()
      setloader(false)

    }
  };

  console.log(blogData)

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

          <h3 className="text-2xl mb-5">Edit your Blog Post here</h3>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Title</legend>
            <input
              name="title"
              onChange={handleChange}
              type="text"
              className="input"
              placeholder="Type here"
            />
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
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Your Content</legend>
            <textarea
              name="content"
              onChange={handleChange}
              className="textarea h-24"
              placeholder="content"
            ></textarea>
              <p className="fieldset-label text-red-600">Required</p>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Category</legend>
            <input
              value={1}
              name="category"
              // onChange={handleChange}
              type="text"
              className="input"
              placeholder="Type here"
              disabled
            />
                          <p className="fieldset-label text-red-600">Required</p>
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
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Pick an Image</legend>
            <input onChange={handleImage} type="file" className="file-input" />
            <label className="fieldset-label">Max size 2MB</label>
            <p className="fieldset-label text-red-600">Required</p>

          </fieldset>

          <button onClick={editBlog} className="btn btn-primary mt-5">
          <span className={`${loader ? "loading" : ''} loading-spinner`}></span>
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
