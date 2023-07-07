import React, { useEffect, useState } from 'react'

import './Users.css'

export default function Users() {

  const [users, setUsers] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(()=>{
    fetch('https://localhost:7120/api/User')
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        setUsers(data)
        setIsLoaded(true)
    })
    .catch(err=>console.log(err))
  },[])

  const handleUserDelete = (id) => {
    fetch(`https://localhost:7120/api/User/Delete/${id}`,{
      method: 'DELETE'
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
    return(<p>Loading...</p>)
  }

  return (
    <main className='table-container'>
            <table className='table mt-2'>
                <thead>
                    <tr className='table-row'>
                        <th className='table-heading'>Name</th>
                        <th className='table-heading'>Roles</th>
                        <th className='table-heading'>Email</th>
                        <th className='table-heading'></th>
                        <th className='table-heading'></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u=>(
                    <tr className='table-row' key={u.id}>
                        <td className='table-data'>{u.userName}</td>
                        <td className='table-data'>{u.roles.join(', ')}</td>
                        <td className='table-data'>{u.email}</td>
                        <td className='table-data'>Change roles</td>
                        <td className='table-data'><button onClick={()=>handleUserDelete(u.id)}>Delete</button></td>
                    </tr>))}
                </tbody>
            </table>
    </main>
  )
}
