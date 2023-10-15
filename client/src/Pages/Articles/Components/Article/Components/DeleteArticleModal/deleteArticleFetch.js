import { deleteArticle } from "_Constants/fetchUrl";
import filterDeletedArticle from "./Utility/filterDeletedArticle";

export default function deleteArticleFetch(setSidebarContent, id, navigate) {
  fetch(`${deleteArticle}${id}`, { method: "DELETE", credentials: "include" })
    .then((res) => res.json())
    .then(() => {
      setSidebarContent((content) => filterDeletedArticle(id, content));
      navigate("/article");
    })
    .catch((err) => console.log(err));
}
