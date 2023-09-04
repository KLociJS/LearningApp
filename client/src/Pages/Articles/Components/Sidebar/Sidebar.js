import React from 'react'
import ArtilceLink from './ArticleLink/ArtilceLink'
import Category from './Category/Category'

export default function Sidebar({ content }) {
  
  return (
    <aside className='sidebar'>
        <ul className='category-list'>
            {content.categories.map(c=>(<Category key={c.id} category={c} />))}
            <ArtilceLink articles={content.articles} />
        </ul>
    </aside>
  )
}
