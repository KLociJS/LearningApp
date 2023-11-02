import { Link, Outlet } from "react-router-dom";

import "./Articles.css";

import { Sidebar } from "Components";
import SidebarContext from "Context/SideBarProvider";
import { AiOutlinePlusCircle } from "react-icons/ai";
import useGetSidebarContent from "./Hooks/useGetSidebarContent";

export default function Articles() {
  const { isLoading, sidebarContent, setSidebarContent } = useGetSidebarContent();

  return (
    <>
      <SidebarContext.Provider value={{ isLoading, sidebarContent, setSidebarContent }}>
        <Sidebar sidebarContent={sidebarContent} isLoading={isLoading} linkTo={"/article/"}>
          <Link to="/create-article" className="create-article-link">
            <AiOutlinePlusCircle className="add-icon" />
            Add Note
          </Link>
        </Sidebar>
        <Outlet context={{ setSidebarContent }} />
      </SidebarContext.Provider>
    </>
  );
}
