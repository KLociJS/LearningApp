import { deleteUser } from '_Constants'

export default function deleteUserFetch(id,setUsers) {
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
