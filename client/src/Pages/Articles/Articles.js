import { Outlet, useParams } from 'react-router-dom'

import './Articles.css'

import Sidebar from './Sidebar/Sidebar'

const dummyData = {
  articles:[
    {name:"article name", id:1},
    {name:"article name", id:2},
    {name:"article name", id:3}
  ],
  categories: [
    {
      name: "category name",
      id:1,
      articles:[
        {name:"article name", id:4},
        {name:"article name", id:5},
        {name:"article name", id:6}
      ],
      subcategories:[
          { 
            id:1,
            name: "subcategory", 
            articles: [
              {name:"article name", id:7},
              {name:"article name", id:8},
              {name:"article name", id:9}
            ]
          },
          { 
            id:2,
            name: "subcategory", 
            articles: [
              {name:"article name", id:7},
              {name:"article name", id:8},
              {name:"article name", id:9}
            ]
          }
      ]
    },
    {
      name: "category name",
      id:2,
      articles:[
        {name:"article name", id:4},
        {name:"article name", id:5},
        {name:"article name", id:6}
      ],
      subcategories:[
          { 
            id:3,
            name: "subcategory",
             articles: [
              {name:"article name", id:7},
              {name:"article name", id:8},
              {name:"article name", id:9}
            ]
          },
          {       
            id:4,
            name: "subcategory",
             articles: [
              {name:"article name", id:7},
              {name:"article name", id:8},
              {name:"article name", id:9}
            ]
          }
      ]
              
    }]
}

export default function Articles() {
    const { id } = useParams()
  return (
    <main className='article-page-container'>
        <Sidebar content={dummyData} />
        <section className='article-container'>
            <Outlet />
        </section>
    </main>
  )
}
