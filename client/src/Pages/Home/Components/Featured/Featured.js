import ArticleCard from './Components/ArticleCard'
import './Featured.css'
import ArticleCardSkeleton from './Components/Components/ArticleCardSkeleton'
import useGetFeaturedArticles from './Hooks/useGetFeaturedArticles'

export default function Featured() {

    const {
        articles,
        isLoading
    } = useGetFeaturedArticles()

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
