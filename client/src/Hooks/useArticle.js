import { createContext, useContext } from "react";

export const ArticleContext = createContext(null);

const useArticleContext = () => useContext(ArticleContext);

export default useArticleContext;
