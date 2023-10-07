export default function getSubCategoryState(subcategory,articleId){
    return subcategory.articles.find(article=>article.id===articleId) !== undefined
}
