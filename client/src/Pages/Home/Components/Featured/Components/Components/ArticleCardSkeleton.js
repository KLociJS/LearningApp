import './ArticleCardSkeleton.css'

export default function ArticleCardSkeleton() {
  return (
    <aside className='featured'>
        <h2 className='featured-label'>Featured</h2>
        <div className='article-card-skeleton'></div>
        <div className='article-card-skeleton'></div>
        <div className='article-card-skeleton'></div>
        <div className='article-card-skeleton'></div>
    </aside>
  )
}
