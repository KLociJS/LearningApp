import { Link } from 'react-router-dom'
import './ArticleCard.css'

const convertDate = (dateStr) => {
    const date = new Date(dateStr)
    const year = date.getFullYear()
    const month = String(date.getMonth()+1).padStart(2,'0')
    const day = String(date.getDate()).padStart(2,'0')

    return `${year}.${month}.${day}`
}

export default function ArticleCard({article}) {
  return (
    <Link to={`/shared-article/${article.id}`} className='article-card'>
        <h2 className='article-card-title'>{article.title}</h2>
        <p className='article-card-description'>{article.description}</p>
        <p className='article-card-footer'>Created at {convertDate(article.createdAt)} By {article.author}</p>
    </Link>

  )
}
