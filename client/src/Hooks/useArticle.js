import { useContext } from "react"
import ArticleContext from "Context/ArticleProvider"

const useArticle = () => useContext(ArticleContext)

export default useArticle