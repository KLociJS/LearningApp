import { Outlet, useParams } from 'react-router-dom'

import './Articles.css'

import Sidebar from './Components/Sidebar/Sidebar'
import { useState } from 'react'


export default function Articles() {
    const { id } = useParams()
    const [article,setArticle] = useState([])

    return (
      <>
        <Sidebar />
        <section className='article-container'>
            <Outlet context={{article}}/>
        </section>
      </>
      
    )
}
