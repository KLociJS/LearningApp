import { Sidebar } from "Components";
import MarkdownPreview from "Components/MarkdownEditor/MarkdownPreview/MarkdownPreview";
import convertDate from "Utility/convertDate";
import SharedArticleSkeleton from "./Components/SharedArticleSkeleton";
import useGetSharedArticle from "./Hooks/useGetSharedArticle";
import useGetSharedSidebarContent from "./Hooks/useGetSharedSidebarContent";

import { useEffect, useRef, useState } from "react";
import "../Articles/Articles.css";
import TableOfContents from "./Components/TableOfContents";

export default function SharedArticle() {
  const { article, isArticleLoading } = useGetSharedArticle();
  const { sidebarContent, isSidebarLoading } = useGetSharedSidebarContent();

  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState(null);

  const observer = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    if (isArticleLoading) return;
    setTimeout(() => {
      const ids = Array.from(document.querySelectorAll(".custom-heading")).map(
        (heading) => heading.id
      );
      setHeadings(ids);
      const root = document.querySelector(".article-container");
      rootRef.current = root;
    }, 500);
  }, [isArticleLoading]);

  useEffect(() => {
    if (isArticleLoading) return;

    if (rootRef) {
      const handleObserver = (entries) => {
        console.log(entries);
        let targetHeading = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            targetHeading = entry.target.id;
          }
        });

        if (targetHeading) {
          setActiveHeading(targetHeading);
        }
      };

      const options = {
        root: rootRef.current,
        threshold: 1.0,
        rootMargin: "0px"
      };

      setTimeout(() => {
        observer.current = new IntersectionObserver(handleObserver, options);

        const elements = document.querySelectorAll(".custom-heading");
        elements.forEach((elem) => {
          observer.current.observe(elem);
        });
      }, 500);
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [isArticleLoading]);

  useEffect(() => {
    console.log("Active heading changed:", activeHeading);
  }, [activeHeading]);

  return (
    <>
      <Sidebar
        sidebarContent={sidebarContent}
        isLoading={isSidebarLoading}
        linkTo={"/shared-article/"}
      />
      <section className="article-container">
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
            <MarkdownPreview markdown={article.markdown} markdownPreviewRef={rootRef} />
          </>
        )}
      </section>
      <TableOfContents headings={headings} activeHeading={activeHeading} />
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
