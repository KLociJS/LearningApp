import ArtilceLink from './ArticleLink/ArtilceLink'
import Category from './Category/Category'
import SidebarSkeleton from './SidebarSkeleton/SidebarSkeleton'

import './Sidebar.css'

import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft, MdOutlinePostAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Sidebar({sidebarContent, isLoading}) {

  const [isOpen, setIsOpen] = useState(true)

  if(isLoading){
    return <SidebarSkeleton />
  }

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'active' : ''}`}>
      <div className={`sidebar-icon-container ${isOpen ? 'active' : ''}`}>
        {isOpen ? 
        <MdKeyboardDoubleArrowLeft className='sidebar-icon' onClick={()=>setIsOpen(false)}/> :
        <MdKeyboardDoubleArrowRight className='sidebar-icon' onClick={()=>setIsOpen(true)}/>
        }
      </div>
          <Link to='/create-article' className='create-article-link'>
            New Note
            <MdOutlinePostAdd  className='add-icon'/>
          </Link>
          <ul className='category-list'>
              {sidebarContent && sidebarContent.categories.map(c=>(<Category key={c.id} category={c} />))}
              <ArtilceLink articles={sidebarContent?.articles || []} />
          </ul>
      </aside>
    </>
  )
}
