import { Link, Outlet } from 'react-router-dom';

import './Articles.css';

import { Sidebar } from 'Components';
import SidebarContext from 'Context/SideBarProvider';
import { useGetSidebarContent } from 'Hooks';
import { MdOutlinePostAdd } from 'react-icons/md';

export default function Articles() {
  const { isLoading, sidebarContent, setSidebarContent } = useGetSidebarContent();

  return (
    <>
      <SidebarContext.Provider value={{ isLoading, sidebarContent, setSidebarContent }}>
        <Sidebar sidebarContent={sidebarContent} isLoading={isLoading} linkTo={'/article/'}>
          <Link to="/create-article" className="create-article-link">
            New Note
            <MdOutlinePostAdd className="add-icon" />
          </Link>
        </Sidebar>
        <section className="article-container">
          <Outlet context={{ setSidebarContent }} />
        </section>
      </SidebarContext.Provider>
    </>
  );
}
