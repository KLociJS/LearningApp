import React, { useEffect, useState } from 'react'

import './Users.css'
import { Link } from 'react-router-dom'

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
                    </tr>
                </thead>
                <tbody>
                    {users.map(u=>(
                    <tr className='table-row' key={u.id}>
                        <td className='table-data'>{u.userName}</td>
                        <td className='table-data'>{u.roles.join(', ')}</td>
                        <td className='table-data'>{u.email}</td>
                        <td className='table-data'><Link to={`/user/${u.id}`}>Update</Link></td>
                    </tr>))}
                </tbody>
            </table>
    </main>
  )
}
