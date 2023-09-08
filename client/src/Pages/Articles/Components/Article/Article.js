import {useState, useEffect} from 'react'
import { getArticleById } from '_Constants/fetchUrl'
import { Link, useParams } from 'react-router-dom'
import { RiDeleteBinLine} from 'react-icons/ri'
import { AiOutlineEdit } from 'react-icons/ai'
import MarkdownPreview from 'Components/MarkdownEditor/MarkdownPreview/MarkdownPreview'

import DeleteArticleModalContent from './Components/DeleteArticleModal/DeleteArticleModalContent'
import Modal from './Components/DeleteArticleModal/Modal'
import ArticleSkeleton from './Components/ArticleSkeleton/ArticleSkeleton'

export default function Article() {
    const { id } = useParams()
    const [article,setArticle] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(()=>{
      setIsLoading(true)
      fetch(`${getArticleById}${id}`,{credentials:'include'})
      .then(res=>res.json())
      .then(res=>{
        setArticle(res.data)
        setIsLoading(false)
      })
      .catch(console.log)
      
    },[id])
    
    if(isLoading){
      return <ArticleSkeleton />
    } 

    return (
      <>
        <section className='article-header'>
          <div>
            <h1 className='article-title'>{article.title}</h1>
            <p className='article-info'>Created by {article.author} at {article.createdAt.slice(0,10)}</p>
          </div>
          <div className='action-btn'>
            <Link to={`/update-article/${id}`}>
              <AiOutlineEdit className='edit-icon'/>
            </Link>
            <Modal icon={<RiDeleteBinLine className='delete-icon'/>}>
              <DeleteArticleModalContent id={id}/>
            </Modal>
          </div>
        </section>
        <MarkdownPreview markdown={article.markdown}/>
      </>
    )
}
