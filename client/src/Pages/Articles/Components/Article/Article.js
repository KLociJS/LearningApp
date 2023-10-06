import { Link, useParams } from 'react-router-dom'
import { RiDeleteBinLine} from 'react-icons/ri'
import { AiOutlineEdit, AiOutlineShareAlt } from 'react-icons/ai'
import MarkdownPreview from 'Components/MarkdownEditor/MarkdownPreview/MarkdownPreview'

import DeleteArticleModalContent from './Components/DeleteArticleModal/DeleteArticleModalContent'
import Modal from './Components/DeleteArticleModal/Modal'
import ArticleSkeleton from './Components/ArticleSkeleton/ArticleSkeleton'
import { useGetArticle } from 'Hooks'
import PublishArticleModalContent from './Components/PublishArticleModal/PublishArticleModalContent'
import { RoleBasedRender } from 'Components'
import Edit from './Components/Edit/Edit'

export default function Article() {
    const { id } = useParams()
    const { 
      markdown,  
      title, 
      isLoading 
    } = useGetArticle()
    
    if(isLoading){
      return <ArticleSkeleton />
    } 

    return (
      <>
        <section className='article-header'>
          <div>
            <h1 className='article-title'>{title}</h1>
          </div>
          <div className='action-btn'>
            <RoleBasedRender allowedroles={['Author']}>
              <Modal icon={<AiOutlineShareAlt className='share-icon'/>}>
                <PublishArticleModalContent id={id} />
              </Modal>
            </RoleBasedRender>
            <Edit/>
            <Modal icon={<RiDeleteBinLine className='delete-icon'/>}>
              <DeleteArticleModalContent id={id}/>
            </Modal>
          </div>
        </section>
        <MarkdownPreview markdown={markdown}/>
      </>
    )
}
