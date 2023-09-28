import { Outlet } from 'react-router-dom'

import './Articles.css'

import Sidebar from './Components/Sidebar/Sidebar'
import { useGetSidebarContent } from 'Hooks'


export default function Articles() {

    const { isLoading, sidebarContent, setSidebarContent } = useGetSidebarContent()

    return (
      <>
        <Sidebar sidebarContent={sidebarContent} isLoading={isLoading}/>
        <section className='article-container'>
            <Outlet context={{setSidebarContent}}/>
        </section>
      </>
      
    )
}
