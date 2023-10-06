import MarkdownPreview from 'Components/MarkdownEditor/MarkdownPreview/MarkdownPreview'
import Sidebar from 'Pages/Articles/Components/Sidebar/Sidebar'
import useGetSharedSidebarContent from './Hooks/useGetSharedSidebarContent'
import useGetSharedArticle from './Hooks/useGetSharedArticle'
import SharedArticleSkeleton from './Components/SharedArticleSkeleton'
import convertDate from 'Utility/convertDate'

export default function SharedArticle() {
    const { article, isArticleLoading } = useGetSharedArticle()
    const { sidebarContent, isSidebarLoading } = useGetSharedSidebarContent()

    return (
      <>
        <Sidebar sidebarContent={sidebarContent} isLoading={isSidebarLoading} linkTo={'/shared-article/'}/>
        <section className='article-container'>

          { isArticleLoading ?
              <SharedArticleSkeleton/> :
              <>
                <section className='article-header'>
                  <div>
                    <h1 className='article-title'>{article.title}</h1>
                    <p className='article-info'>Created by {article.author} at {convertDate(article.createdAt)} Updated at {article.updatedAt != null ? convertDate(article.updatedAt) : null }</p>
                  </div>
                </section>
                <MarkdownPreview markdown={article.markdown}/>
              </>
          }
        </section>
      </>
    )
}
