import { Outlet, useParams } from 'react-router-dom'

import './Articles.css'

import Sidebar from './Components/Sidebar/Sidebar'
import { useEffect, useState } from 'react'


export default function Articles() {
    const { id } = useParams()
    const [article,setArticle] = useState([])
    const [sidebarContent, setSidebarContent] = useState()

    useEffect(()=>{
      fetch('http://localhost:5000/api/Article',{
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

    if(sidebarContent === undefined) return null

    return (
      <>
        <Sidebar content={sidebarContent} />
        <section className='article-container'>
            <Outlet context={{article}}/>
        </section>
      </>
      
    )
}
