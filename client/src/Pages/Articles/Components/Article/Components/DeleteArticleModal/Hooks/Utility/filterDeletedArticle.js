export default function filterDeletedArticle(id, sidebarContent) {
  return {
    ...sidebarContent,
    articles: sidebarContent.articles.filter((article) => article.id !== id),
    categories: sidebarContent.categories
      .map((category) => ({
        ...category,
        articles: category.articles.filter((a) => a.id !== id),
        subcategories: category.subcategories
          .map((subcategory) => ({
            ...subcategory,
            articles: subcategory.articles.filter((article) => article.id !== id)
          }))
          .filter((subcategory) => subcategory.articles.length > 0)
      }))
      .filter((category) => category.articles.length > 0 || category.subcategories.length > 0)
  };
}
