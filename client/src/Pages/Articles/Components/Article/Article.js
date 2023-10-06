import { useParams } from 'react-router-dom'

import { RiDeleteBinLine} from 'react-icons/ri'

import MarkdownPreview from 'Components/MarkdownEditor/MarkdownPreview/MarkdownPreview'

import ArticleContext from 'Context/ArticleProvider'
import { useGetArticle } from 'Hooks'

import ArticleSkeleton from './Components/ArticleSkeleton/ArticleSkeleton'
import Edit from './Components/EditMenu/Edit'
import Modal from './Components/DeleteArticleModal/Modal'
import PublishArticleModalContent from './Components/PublishMenu/PublishArticleModal/PublishArticleModalContent'
import DeleteArticleModalContent from './Components/DeleteArticleModal/DeleteArticleModalContent'
import { RoleBasedRender } from 'Components'
import Publish from './Components/PublishMenu/Publish'

export default function Article() {
    const { id } = useParams()
    const { 
      markdown, 
      setMarkdown, 
      title, 
      setTitle, 
      createdAt,
      author,
      isLoading,
      isPublished,
    } = useGetArticle()
    
    if(isLoading){
      return <ArticleSkeleton />
    } 

    return (
      <ArticleContext.Provider value={{ 
        markdown, 
        setMarkdown, 
        title, 
        setTitle, 
        createdAt,
        author,
        isLoading,
        isPublished,
      }}>
        <section className='article-header'>
          <div>
            <h1 className='article-title'>{title}</h1>
          </div>
          <div className='action-btn'>
            <RoleBasedRender allowedroles={['Author']}>
            <Publish/>
            </RoleBasedRender>
            <Edit/>
            <Modal icon={<RiDeleteBinLine className='delete-icon'/>}>
              <DeleteArticleModalContent id={id}/>
            </Modal>
          </div>
        </section>
        <MarkdownPreview markdown={markdown}/>
      </ArticleContext.Provider>
      
    )
}
