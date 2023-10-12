import deleteUserFetch from "../../Api/deleteUserFetch"

export default function DeleteUserModalContent({user, setUsers, setShow }) {
    
  return (
    <div className='modal' onClick={e=>e.stopPropagation()}>
      <div>
        <h1 className='modal-header warning'>Delete user</h1>
        <p className='mb-1'>Deleting a user is irreversible!</p>
      </div>
      <button onClick={()=>deleteUserFetch(user.id, setUsers)} className='warning-button'>
          Delete
      </button>
      <button onClick={()=>setShow(false)} className='secondary-button'>Close</button>
    </div>
  )
}
