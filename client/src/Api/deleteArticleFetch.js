import { deleteArticle } from '_Constants/fetchUrl';

export default function deleteArticleFetch(setSidebarContent, id, navigate) {
  fetch(`${deleteArticle}${id}`, { method: 'DELETE', credentials: 'include' })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      setSidebarContent((content) => ({
        ...content,
        articles: content.articles.filter((article) => article.id !== id),
        categories: content.categories
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
      }));
      navigate('/article');
    })
    .catch((err) => console.log(err));
}
