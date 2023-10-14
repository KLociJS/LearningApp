import ArticleContext from "Context/ArticleProvider";
import useSynchArticle from "Pages/Articles/Hooks/useSynchArticle";
import { Outlet } from "react-router-dom";

export default function ArticleContextWrapper() {
  const { state, dispatch } = useSynchArticle();
  return (
    <ArticleContext.Provider value={{ state, dispatch }}>
      <Outlet />
    </ArticleContext.Provider>
  );
}
