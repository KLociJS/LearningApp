import { Outlet, useParams } from 'react-router-dom'

import { getArticleById } from '_Constants/fetchUrl'

import './Articles.css'

import Sidebar from './Components/Sidebar/Sidebar'
import { useEffect, useState } from 'react'


export default function Articles() {
    const { id } = useParams()


    return (
      <>
        <Sidebar />
        <section className='article-container'>
            <Outlet />
        </section>
      </>
      
    )
}
