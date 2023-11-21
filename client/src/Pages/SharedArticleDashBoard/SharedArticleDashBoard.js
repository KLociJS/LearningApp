import { Sidebar } from "Components";
import SharedArticle from "./Components/SharedArticle/SharedArticle";
import useGetSharedSidebarContent from "./Hooks/useGetSharedSidebarContent";

export default function SharedArticleDashBoard() {
  const { sidebarContent, isSidebarLoading } = useGetSharedSidebarContent();
  return (
    <>
      <Sidebar
        sidebarContent={sidebarContent}
        isLoading={isSidebarLoading}
        linkTo={"/shared-article/"}
      />
      <SharedArticle />
    </>
  );
}
