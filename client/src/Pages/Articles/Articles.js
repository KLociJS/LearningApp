import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { getSidebarContentUrl } from '_Constants/fetchUrl'

import './Articles.css'

import Sidebar from './Components/Sidebar/Sidebar'


export default function Articles() {
    const [sidebarContent, setSidebarContent] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

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
          setSidebarContent(data)
          setIsLoading(false)
        })
        .catch(err=>console.log(err))
    },[])

    return (
      <>
        <Sidebar sidebarContent={sidebarContent} isLoading={isLoading}/>
        <section className='article-container'>
            <Outlet context={{setSidebarContent}}/>
        </section>
      </>
      
    )
}
