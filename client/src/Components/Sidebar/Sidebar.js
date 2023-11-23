import ArtilceLink from "./ArticleLink/ArtilceLink";
import Category from "./Category/Category";
import SidebarSkeleton from "./SidebarSkeleton/SidebarSkeleton";

import "./Sidebar.css";

import { useState } from "react";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function Sidebar({ sidebarContent, isLoading, children, linkTo }) {
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <>
      <aside className={`sidebar ${isOpen ? "active" : ""}`}>
        <div className={`sidebar-icon-container ${isOpen ? "active" : ""}`}>
          {isOpen ? (
            <MdKeyboardDoubleArrowLeft className="sidebar-icon" onClick={() => setIsOpen(false)} />
          ) : (
            <MdKeyboardDoubleArrowRight className="sidebar-icon" onClick={() => setIsOpen(true)} />
          )}
        </div>
        {children}
        <ul className="category-list">
          {sidebarContent.categories.map((c) => (
            <Category key={c.id} category={c} linkTo={linkTo} />
          ))}
          <ArtilceLink articles={sidebarContent?.articles} linkTo={linkTo} />
        </ul>
      </aside>
    </>
  );
}
