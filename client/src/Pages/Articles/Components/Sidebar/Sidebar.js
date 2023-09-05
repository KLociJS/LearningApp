import { useEffect, useState } from 'react'

import { getSidebarContentUrl } from '_Constants/fetchUrl'

import ArtilceLink from './ArticleLink/ArtilceLink'
import Category from './Category/Category'

import { MdOutlinePostAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const [sidebarContent, setSidebarContent] = useState(null)

    useEffect(()=>{
      fetch( getSidebarContentUrl ,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        })
        .then(res=>res.json())
        .then(data=>{
          console.log(data)
          setSidebarContent(data)
        })
        .catch(err=>console.log(err))
    },[])

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
