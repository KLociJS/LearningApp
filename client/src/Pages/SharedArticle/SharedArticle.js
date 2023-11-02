// import MarkdownPreview from "Components/MarkdownEditor/MarkdownPreview/MarkdownPreview";
import SharedArticleSkeleton from "./Components/SharedArticleSkeleton";
import useGetSharedArticle from "./Hooks/useGetSharedArticle";
import useGetSharedSidebarContent from "./Hooks/useGetSharedSidebarContent";

import { Modal, ModalTriggerElement, Sidebar } from "Components";
import MarkdownPreview from "Components/MarkdownEditor/MarkdownPreview/MarkdownPreview";
import convertDate from "Utility/convertDate";
import { Link } from "react-router-dom";
import "../Articles/Articles.css";
import useGetHeadingIds from "./Components/Hooks/useGetHeadingIds";
import ReportArticleModalContent from "./Components/ReportArticleModalContent/ReportArticleModalContent";
import TableOfContents from "./Components/TableOfContents";
import "./SharedArticle.css";

export default function SharedArticle() {
  const { article, isArticleLoading } = useGetSharedArticle();
  const { sidebarContent, isSidebarLoading } = useGetSharedSidebarContent();
  const { headings, setHeadings } = useGetHeadingIds(isArticleLoading);

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
                  Created by{" "}
                  <Link to={`/profile/${article.author}`} className="author-link">
                    {article.author}
                  </Link>{" "}
                  at {convertDate(article.createdAt)} | Updated at{" "}
                  {article.updatedAt != null ? convertDate(article.updatedAt) : null}
                </p>
              </div>
              <Modal
                triggerElement={
                  <ModalTriggerElement text="report" className="report-article-button" />
                }
                modalContent={<ReportArticleModalContent />}
              />
            </section>
            <MarkdownPreview markdown={article.markdown} setHeadings={setHeadings} />
          </>
        )}
      </section>
      <TableOfContents headings={headings} />
    </>
  );
}
