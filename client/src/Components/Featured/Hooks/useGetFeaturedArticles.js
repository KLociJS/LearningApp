import { featuredArticle } from '_Constants/fetchUrl'
import { useEffect, useState } from 'react'

export default function useGetFeaturedArticles() {

    const [articles,setArticles] = useState([])
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        fetch(featuredArticle)
        .then(res=>res.json())
        .then(res=>setArticles(res.data))
        .catch(err=>console.log(err))
        .finally(_=>setIsLoading(false))
    },[])

    return {
        articles,
        isLoading
    }
}
