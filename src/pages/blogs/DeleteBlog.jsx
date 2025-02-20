import axios from 'axios'
import React from 'react'
import { useAuth } from '../../utils/Context'

const DeleteBlog = ({id}) => {

  const { DeleteNotify, loader, setloader } = useAuth();

    const deleteBlog = async () => {
      setloader(true)
        try {
          const response = await axios.delete(`/api/posts/mutate/${id}`)
          DeleteNotify()
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }
    
  return (
    <div>
      
      {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn btn-error" onClick={()=>document.getElementById('my_modal_6').showModal()}>Delete Blog</button>
<dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Are you sure you want to delete?</h3>
    <p className="py-4">You will not be able to retrieve it back.</p>
                  <div className="modal-action">
            <button onClick={deleteBlog} className="btn btn-error">
            <span className={`${loader ? "loading" : ''} loading-spinner`}></span>
              Delete
            </button>
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Cancel</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
  )
}

export default DeleteBlog
