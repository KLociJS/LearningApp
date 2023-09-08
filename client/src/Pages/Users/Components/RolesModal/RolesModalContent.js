import './Modal.css'
import { useUpdateRoles } from 'Hooks'

export default function RolesModalContent({user,setUsers,setShow}) {
    const {
        roles,
        setRoles,
        error,
        setError,
        handleSubmit
    } = useUpdateRoles(setShow)

    const handleChange = (role) => {
        if(roles.includes(role)){
            setRoles(roles=>roles.filter(r=>r!==role))
        }else{
            setRoles(roles=>[...roles, role])
        }
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
                <button onClick={()=>handleSubmit(user,setUsers)} className='primary-button center'>Save</button>
                <button onClick={e=>setShow(false)} className='secondary-button center mt-1'>Close</button>

            </div>
    )
}
