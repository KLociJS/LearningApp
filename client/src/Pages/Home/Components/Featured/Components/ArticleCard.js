import './ArticleCard.css'

export default function ArticleCard({article}) {
  return (
    <div className='article-card'>
        <h2 className='article-card-title'>{article.title}</h2>
        <p className='article-card-description'>{article.description}</p>
        <p className='article-card-footer'>Created at {article.createdAt} By {article.author}</p>
    </div>
  )
}
