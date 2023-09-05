import { deleteArticle } from "_Constants/fetchUrl"
import { useNavigate, useOutletContext } from "react-router-dom"

export default function DeleteArticleModal({id, setShow}) {

    const navigate = useNavigate()
    const { setSidebarContent } = useOutletContext()

    const deleteHandler = () => {
        fetch(`${deleteArticle}${id}`,{method:'DELETE', credentials:'include'})
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            setSidebarContent(content=>({
                    ...content,
                    articles : content.articles.filter(article=>article.id!==id), 
                    categories : content.categories
                        .map(category=>(
                            {
                                ...category, 
                                articles:category.articles.filter(a=>a.id!==id),
                                subcategories : category.subcategories
                                    .map(subcategory=>({...subcategory, articles : subcategory.articles.filter(article=>article.id!==id)}))
                                    .filter(subcategory=>subcategory.articles.length>0) 
                            }))
                        .filter(category=>category.articles.length > 0 || category.subcategories.length> 0)
                }))
            navigate('/article')
        })
        .catch(err=>console.log(err))
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
