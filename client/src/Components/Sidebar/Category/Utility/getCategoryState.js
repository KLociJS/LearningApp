export default function getCategoryState(category, articleId){
    const isArticleInCategory = category.articles.find(article => article.id === articleId)
    const isArticleInSubcategory = category.subcategories.find(subcategory => subcategory.articles.find(article=>article.id === articleId))

    return isArticleInCategory || isArticleInSubcategory
}