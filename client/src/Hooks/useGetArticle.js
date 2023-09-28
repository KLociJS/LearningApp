import {useEffect, useState } from 'react'
import { getArticleById } from '_Constants/fetchUrl'
import { useParams } from 'react-router-dom'

export default function useGetArticle() {
    const { id } = useParams()

    const [markdown, setMarkdown] = useState()
    const [title, setTitle] = useState()
    const [author, setAuthor] = useState()
    const [createdAt, setCreatedAt] = useState()
    
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(()=>{
      setIsLoading(true)
      fetch(`${getArticleById}${id}`,{credentials:'include'})
      .then(res=>res.json())
      .then(({data})=>{
        setMarkdown(data.markdown)
        setTitle(data.title)
        setAuthor(data.author)
        setCreatedAt(data.createdAt)
        setIsLoading(false)
      })
      .catch(console.log)
      
    },[id])

    return { 
      markdown, 
      setMarkdown, 
      title, 
      setTitle, 
      createdAt,
      author,
      isLoading 
    }
}
