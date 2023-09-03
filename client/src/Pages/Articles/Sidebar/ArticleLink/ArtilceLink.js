import { NavLink } from 'react-router-dom'

export default function ArtilceLink({articles}) {
  return (
    <>
      { articles.map(a=> 
        (<li key={a.id}><NavLink to={`${a.id}`}>{a.name}</NavLink></li>)
      )}
    </>
  )
}
