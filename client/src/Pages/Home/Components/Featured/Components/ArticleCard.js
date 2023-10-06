import { Link } from 'react-router-dom'
import './ArticleCard.css'
import convertDate from 'Utility/convertDate'

export default function ArticleCard({article}) {
  return (
    <Link to={`/shared-article/${article.id}`} className='article-card'>
        <h2 className='article-card-title'>{article.title}</h2>
        <p className='article-card-description'>{article.description}</p>
        <p className='article-card-footer'>Created at {convertDate(article.createdAt)} By {article.author}</p>
    </Link>

  )
}
