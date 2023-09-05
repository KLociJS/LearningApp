import { NavLink } from 'react-router-dom'

export default function ArtilceLink({articles}) {
  return (
    <>
      { articles.map(a=> 
        (<li className='article-li' key={a.id}><NavLink className='article-link' to={`${a.id}`}>{a.name}</NavLink></li>)
      )}
    </>
  )
}
