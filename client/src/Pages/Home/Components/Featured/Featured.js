import { featuredArticle } from '_Constants/fetchUrl'
import { useEffect, useState } from 'react'
import ArticleCard from './Components/ArticleCard'
import './Featured.css'
import ArticleCardSkeleton from './Components/Components/ArticleCardSkeleton'

export default function Featured() {

    const [articles,setArticles] = useState([])
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        fetch(featuredArticle)
        .then(res=>res.json())
        .then(res=>setArticles(res.data))
        .catch(err=>console.log(err))
        .finally(_=>setIsLoading(false))
    },[])

    if(isLoading){
        return <ArticleCardSkeleton />
    }

    return (
        <aside className='featured'>
            <h2 className='featured-label'>Featured</h2>
            {articles.map(a=>(
                <ArticleCard key={a.id} article={a}/>
            ))}
        </aside>
    )
}
