import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

import './Articles.css'

import Sidebar from './Components/Sidebar/Sidebar'
import { useGetSidebarContent } from 'Hooks'
import { MdOutlinePostAdd } from 'react-icons/md'


export default function Articles() {

    const { isLoading, sidebarContent, setSidebarContent } = useGetSidebarContent()

    return (
      <>
        <Sidebar sidebarContent={sidebarContent} isLoading={isLoading} linkTo={'/article/'}>
          <Link to='/create-article' className='create-article-link'>
            New Note
            <MdOutlinePostAdd  className='add-icon'/>
          </Link>
        </Sidebar>
        <section className='article-container'>
            <Outlet context={{setSidebarContent}}/>
        </section>
      </>
      
    )
}
