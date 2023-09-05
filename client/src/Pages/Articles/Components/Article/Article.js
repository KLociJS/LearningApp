import {useState, useEffect} from 'react'
import { getArticleById } from '_Constants/fetchUrl'
import { useParams } from 'react-router-dom'
import { RiDeleteBinLine} from 'react-icons/ri'
import { AiOutlineEdit } from 'react-icons/ai'
import MarkdownPreview from 'Components/MarkdownEditor/MarkdownPreview/MarkdownPreview'

export default function Article() {
    const { id } = useParams()
    const [article,setArticle] = useState(null)

    useEffect(()=>{
      fetch(`${getArticleById}${id}`,{credentials:'include'})
      .then(res=>res.json())
      .then(res=>{
        console.log(res)
        setArticle(res.data)
      })
      .catch(console.log)
    },[id])
    
    const deleteNote = () => {
      console.log('delete')
    }
    const editNote = () => {
      console.log('edit')
    }

    if(article===null) return

    return (
      <>
        <section className='article-header'>
          <div>
            <h1 className='article-title'>{article.title}</h1>
            <p className='article-info'>Created by {article.author} at {article.createdAt.slice(0,10)}</p>
          </div>
          <div className='action-btn'>
            <AiOutlineEdit className='edit-icon' onClick={editNote}/>
            <RiDeleteBinLine className='delete-icon' onClick={deleteNote}/>
          </div>
        </section>
        <MarkdownPreview markdown={article.markdown}/>
      </>
    )
}
