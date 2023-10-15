import { ArticleContext } from "Hooks/useArticle";
import useSynchArticle from "Hooks/useSynchArticle";
import { Outlet } from "react-router-dom";

export default function ArticleContextWrapper() {
  const { state, dispatch } = useSynchArticle();
  return (
    <ArticleContext.Provider value={{ state, dispatch }}>
      <Outlet />
    </ArticleContext.Provider>
  );
}
