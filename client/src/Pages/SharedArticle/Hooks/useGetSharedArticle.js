import { getSharedArticle } from '_Constants/fetchUrl'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function useGetSharedArticle() {
    const { id } = useParams()
    const [article,setArticle] = useState()
    const [isArticleLoading,setIsArticleLoading] = useState(true)

    useEffect(()=>{
      setIsArticleLoading(true)
      fetch(`${getSharedArticle}${id}`,{credentials:'include'})
      .then(res=>res.json())
      .then(res=>{
        setArticle(res)
      })
      .catch(err=>console.log(err))
      .finally(_=>setIsArticleLoading(false))
    },[id])
  return {
    article,
    isArticleLoading
  }
}
