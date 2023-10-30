// import MarkdownPreview from "Components/MarkdownEditor/MarkdownPreview/MarkdownPreview";
import SharedArticleSkeleton from "./Components/SharedArticleSkeleton";
import useGetSharedArticle from "./Hooks/useGetSharedArticle";
import useGetSharedSidebarContent from "./Hooks/useGetSharedSidebarContent";

import { Sidebar } from "Components";
import MarkdownPreview from "Components/MarkdownEditor/MarkdownPreview/MarkdownPreview";
import convertDate from "Utility/convertDate";
import { useEffect, useRef, useState } from "react";
import "../Articles/Articles.css";
import TableOfContents from "./Components/TableOfContents";

export default function SharedArticle() {
  const { article, isArticleLoading } = useGetSharedArticle();
  const { sidebarContent, isSidebarLoading } = useGetSharedSidebarContent();

  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState(null);

  const observer = useRef(null);

  useEffect(() => {
    if (isArticleLoading) return;
    const ids = Array.from(document.querySelectorAll(".custom-heading")).map((heading) => ({
      id: heading.id,
      isVisible: false
    }));
    setHeadings(ids);
  }, [isArticleLoading]);

  return (
    <>
      <Sidebar
        sidebarContent={sidebarContent}
        isLoading={isSidebarLoading}
        linkTo={"/shared-article/"}
      />
      <section className="article-container" ref={observer}>
        {isArticleLoading ? (
          <SharedArticleSkeleton />
        ) : (
          <>
            <section className="article-header">
              <div>
                <h1 className="article-title">{article.title}</h1>
                <p className="article-info">
                  Created by {article.author} at {convertDate(article.createdAt)} Updated at{" "}
                  {article.updatedAt != null ? convertDate(article.updatedAt) : null}
                </p>
              </div>
            </section>
            <MarkdownPreview markdown={article.markdown} setHeadings={setHeadings} />
          </>
        )}
      </section>
      <TableOfContents headings={headings} />
    </>
  );
}

/*
    const observeOptions = {
      root: document.querySelector(".article-container"),
      threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHeading(entry.target.id);
          entry.target.classList.add("highlighted");
        } else {
          entry.target.classList.remove("highlighted");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observeOptions);

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      ids.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };*/
