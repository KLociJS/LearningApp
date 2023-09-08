import {useEffect, useState } from 'react'
import { getArticleById } from '_Constants/fetchUrl'

export default function useGetArticle(id) {
    const [article,setArticle] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(()=>{
      setIsLoading(true)
      fetch(`${getArticleById}${id}`,{credentials:'include'})
      .then(res=>res.json())
      .then(res=>{
        setArticle(res.data)
        setIsLoading(false)
      })
      .catch(console.log)
      
    },[id])

    return { article, isLoading }
}
