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
    .then(()=>{
        setUsers(users=>users.filter(u=>u.id!==id))
    })
    .catch(error=>{
        if(error instanceof Response){
            error.json()
            .then(msg=>console.log(msg))
        }else{
            console.log(error)
        }
    })    
}
