import React, { useEffect, useState } from 'react'

import './Users.css'

import { getUsers, deleteUser } from '_Constants'

import Modal from './Components/RolesModal/Modal'
import RolesModalContent from './Components/RolesModal/RolesModalContent'
import UsersSkeleton from './Components/Skeleton/UsersSkeleton'


export default function Users() {

  const [users, setUsers] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(()=>{
    fetch( getUsers ,{
      credentials: 'include'
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        setUsers(data.userDtos)
        setIsLoaded(true)
    })
    .catch(err=>console.log(err))
  },[])

  const handleUserDelete = (id) => {
    fetch(`${deleteUser}${id}`,{
      method: 'DELETE',
      credentials: 'include'
    })
    .then(response=>{
      if (response.ok) {
        return response.json()
      } else {
        throw response
      }
    })
    .then(r=>{
      setUsers(users=>users.filter(u=>u.id!==id))
    })
    .catch(error=>{
      error.json()
      .then(msg=>console.log(msg))
    })
  }

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
                      <button onClick={()=>handleUserDelete(u.id)} className='warning-button ml-2'>
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
