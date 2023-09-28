import { Link, useParams } from 'react-router-dom'
import { RiDeleteBinLine} from 'react-icons/ri'
import { AiOutlineEdit } from 'react-icons/ai'
import MarkdownPreview from 'Components/MarkdownEditor/MarkdownPreview/MarkdownPreview'

import DeleteArticleModalContent from './Components/DeleteArticleModal/DeleteArticleModalContent'
import Modal from './Components/DeleteArticleModal/Modal'
import ArticleSkeleton from './Components/ArticleSkeleton/ArticleSkeleton'
import { useGetArticle } from 'Hooks'

export default function Article() {
    const { id } = useParams()
    const { 
      markdown,  
      title, 
      createdAt,
      author,
      isLoading 
    } = useGetArticle(id)
    
    if(isLoading){
      return <ArticleSkeleton />
    } 

    return (
      <>
        <section className='article-header'>
          <div>
            <h1 className='article-title'>{title}</h1>
            <p className='article-info'>Created by {author} at {createdAt.slice(0,10)}</p>
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
        <MarkdownPreview markdown={markdown}/>
      </>
    )
}
