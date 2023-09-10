import './Users.css'

import Modal from './Components/RolesModal/Modal'
import RolesModalContent from './Components/RolesModal/RolesModalContent'
import UsersSkeleton from './Components/Skeleton/UsersSkeleton'
import { deleteUserFetch } from 'Api'
import { useGetUsers } from 'Hooks'


export default function Users() {

  const {
    users,
    setUsers,
    isLoaded
  } = useGetUsers()

  if(!isLoaded){
    return <UsersSkeleton />
  }

  return (
    <>
      <table className='table mt-2'>
          <thead>
              <tr className='table-row'>
                  <th className='table-heading'>Name</th>
                  <th className='table-heading table-hidden'>Roles</th>
                  <th className='table-heading table-hidden'>Email</th>
                  <th className='table-heading'></th>
              </tr>
          </thead>
          <tbody>
              {users.map(u=>(
              <tr className='table-row' key={u.id}>
                  <td className='table-data'>{u.userName}</td>
                  <td className='table-data table-hidden'>{u.roles.join(', ')}</td>
                  <td className='table-data table-hidden'>{u.email}</td>
                  <td className='table-data'>
                    <div className='table-button-container'>
                      <Modal modalButtonText='Edit role'>
                        <RolesModalContent user={u} setUsers={setUsers} />
                      </Modal>
                      <button onClick={()=>deleteUserFetch(u.id, setUsers)} className='warning-button ml-2'>
                        Delete
                      </button>
                    </div>
                  </td>
              </tr>))}
          </tbody>
      </table>
    </>
  )
}
