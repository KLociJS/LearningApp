import React from 'react'
import ArtilceLink from './ArticleLink/ArtilceLink'
import Category from './Category/Category'

import { MdOutlinePostAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function Sidebar({ content }) {
  
  return (
    <aside className='sidebar'>
        <Link to='/create-article' className='create-article'>
          <MdOutlinePostAdd  className='add-icon'/>
        </Link>
        <ul className='category-list'>
            {content.categories.map(c=>(<Category key={c.id} category={c} />))}
            <ArtilceLink articles={content.articles} />
        </ul>
    </aside>
  )
}
