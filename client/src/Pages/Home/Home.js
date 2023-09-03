import useAuth from 'Hooks/useAuth'
import { useEffect, useState } from 'react'

import { MarkdownPreview } from 'Components'
import { MarkdownTextArea } from 'Components'
import { Link } from 'react-router-dom'

const dummyData = {
  articles:[
    {name:"article name", id:1},
    {name:"article name", id:2},
    {name:"article name", id:3}
  ],
  categories: [
    {
      name: "category name",
      articles:[
        {name:"article name", id:4},
        {name:"article name", id:5},
        {name:"article name", id:6}
      ],
      subcategories:[
          { 
            name: "subcategory", 
            articles: [
              {name:"article name", id:7},
              {name:"article name", id:8},
              {name:"article name", id:9}
            ]
          },
          { 
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
      articles:[
        {name:"article name", id:4},
        {name:"article name", id:5},
        {name:"article name", id:6}
      ],
      subcategories:[
          { 
            name: "subcategory",
             articles: [
              {name:"article name", id:7},
              {name:"article name", id:8},
              {name:"article name", id:9}
            ]
          },
          { 
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
const Article = ({name,id}) => {
  return <Link to ={id}>{name}</Link>
}

export default function Home() {
  const [markdown, setMarkdown] = useState('')
  const { user } = useAuth()

  console.log(user)

  useEffect(()=>{
    fetch('http://localhost:5000/api/Test',{
      credentials: "include"
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
  },[])
  
  return (
    <div className='editor-container'>
      <MarkdownTextArea setMarkdown={setMarkdown} markdown={markdown} />
      <MarkdownPreview markdown={markdown} />
    </div>
  )
}
