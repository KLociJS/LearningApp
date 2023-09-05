
import ArtilceLink from './ArticleLink/ArtilceLink'
import Category from './Category/Category'

import { MdOutlinePostAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function Sidebar({sidebarContent}) {
  return (
    <aside className='sidebar'>
        <Link to='/create-article' className='create-article'>
          New Note
          <MdOutlinePostAdd  className='add-icon'/>
        </Link>
        <ul className='category-list'>
            {sidebarContent && sidebarContent.categories.map(c=>(<Category key={c.id} category={c} />))}
            <ArtilceLink articles={sidebarContent?.articles || []} />
        </ul>
    </aside>
  )
}
