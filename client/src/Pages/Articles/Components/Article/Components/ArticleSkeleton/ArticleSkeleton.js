import './ArticleSkeleton.css'

export default function ArticleSkeleton() {
  return (
    <>
        <section className='article-skeleton-header-container'>
          <div>
            <div className='article-skeleton-title'></div>
            <div className='article-skeleton-info'></div>
          </div>
          <div className='article-skeleton-button-container'>
            <div className='article-skeleton-button'></div>
            <div className='article-skeleton-button'></div>
          </div>
        </section>
        <section className='markdown-skeleton-container'>
            <div className='markdown-skeleton-title'></div>
            <div className='markdown-skeleton-text'></div>
        </section>
      </>
  )
}
