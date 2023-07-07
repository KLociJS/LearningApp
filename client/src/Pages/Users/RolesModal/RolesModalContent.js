import React, { useState } from 'react'

import './RolesModalContent.css'

export default function RolesModalContent({user,setUsers,setShow}) {
    const [roles,setRoles] = useState([])
    const [error, setError] = useState([])

    const handleChange = (role) => {
        if(roles.includes(role)){
            setRoles(roles=>roles.filter(r=>r!==role))
        }else{
            setRoles(roles=>[...roles, role])
        }
    }

    const handleSubmit = () => {
        console.log(roles)
        fetch(`https://localhost:7120/api/User/ChangeRole/${user.id}`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({roles})
        })
        .then(response=>{
            if (response.ok) {
            return response.json()
            } else {
            throw response
            }
        })
        .then(response=>{
            console.log(response)
            setUsers(users=>{
                let updatedUser = users.find(u=>u.id===user.id)
                user.roles=roles
                return [...users.filter(u=>u.id!==user.id), updatedUser ]
            })
            setShow(false)
        })
        .catch(error=>{
            if (error instanceof Response) {
              error.json().then(errorData => {
                console.log(errorData)
              })
            } else {
              console.error('Error:', error)
            }
          })
    }

    return (
            <div className='modal' onClick={e=>e.stopPropagation()}>
                <h1 className='mb-1'>Change Roles</h1>
                <p>Username: {user.userName}</p>
                <p className='mb-1'>Current roles: {user.roles.join(', ')}</p>

                <div className='role-inputs mb-3'>
                    <div>
                        <input type="checkbox" id="admin" onChange={()=>handleChange('Admin')} />
                        <label htmlFor="admin">Admin</label>
                    </div>
                    <div>
                        <input type="checkbox" id="moderator" onChange={()=>handleChange('Moderator')} />
                        <label htmlFor="moderator">Moderator</label>
                    </div>
                    <div>
                        <input type="checkbox" id="author" onChange={()=>handleChange('Author')}/>
                        <label htmlFor="author">Author</label>
                    </div>
                    <div>
                        <input type="checkbox" id="user" onChange={()=>handleChange('User')}/>
                        <label htmlFor="user">User</label>
                    </div>
                </div>
                <button onClick={handleSubmit} className='primary-button center'>Save</button>
                <button onClick={e=>setShow(false)} className='secondary-button center mt-1'>Close</button>

            </div>
    )
}
