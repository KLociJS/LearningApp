import { useNavigate, useOutletContext } from "react-router-dom"
import { deleteArticleFetch } from "Api"

export default function DeleteArticleModalConatent({id, setShow}) {
    const navigate = useNavigate()
    const { setSidebarContent } = useOutletContext()

    const deleteHandler = () =>{
        deleteArticleFetch(setSidebarContent, id, navigate)
    }
    
    return (
        <section className='modal'>
            <h3 className='modal-header warning'>Warning!</h3>
            <p className='modal-text mb-2'>Article Deletion Is Irreversible!</p>
            <button className='warning-button mt-1' onClick={deleteHandler}>Delete</button>
            <button className='secondary-button mt-1' onClick={()=>setShow(false)}>Cancel</button>
        </section>
    )
}
