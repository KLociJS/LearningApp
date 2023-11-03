import { Modal, ModalTriggerElement, RoleBasedRender } from "Components";
import ArticleAuthorData from "Components/ArticleAuthorData/ArticleAuthorData";
import CustomRolesRender from "Components/CustomRolesRender/CustomRolesRender";
import DropDownMenu from "Components/DropDownMenu/DropDownMenu";
import MarkdownPreview from "Components/MarkdownEditor/MarkdownPreview/MarkdownPreview";
import TableOfContents from "Components/TableOfContents/TableOfContents";
import useGetSharedArticle from "Pages/SharedArticleDashBoard/Hooks/useGetSharedArticle";
import { BsThreeDots } from "react-icons/bs";
import "../../../Articles/Articles.css";
import useGetHeadingIds from "../Hooks/useGetHeadingIds";
import ReportArticleModalContent from "../ReportArticleModalContent/ReportArticleModalContent";
import SharedArticleSkeleton from "../SharedArticleSkeleton/SharedArticleSkeleton";
import UnpublishByModModalContent from "../UnpublishByModModalContent/UnpublishByModModalContent";

export default function SharedArticle() {
  const { article, isArticleLoading } = useGetSharedArticle();
  const { headings, setHeadings } = useGetHeadingIds(isArticleLoading);

  if (isArticleLoading) {
    return (
      <section className="article-container">
        <SharedArticleSkeleton />
      </section>
    );
  }

  return (
    <>
      <section className="article-container">
        <section className="article-header">
          <div>
            <h1 className="article-title">{article.title}</h1>
            <ArticleAuthorData article={article} />
          </div>
          <DropDownMenu icon={<BsThreeDots className="edit-icon" />}>
            <CustomRolesRender
              allowedRoles={["User", "Author"]}
              disAllowedRoles={["Admin", "Moderator"]}>
              <Modal
                triggerElement={
                  <ModalTriggerElement text="Report article" className="menu-item last-child" />
                }
                modalContent={<ReportArticleModalContent />}
              />
            </CustomRolesRender>
            <RoleBasedRender allowedRoles={["Admin", "Moderator"]}>
              <Modal
                triggerElement={
                  <ModalTriggerElement text="Unpublish article" className="menu-item last-child" />
                }
                modalContent={<UnpublishByModModalContent articleId={article.id} />}
              />
            </RoleBasedRender>
          </DropDownMenu>
        </section>
        <MarkdownPreview markdown={article.markdown} setHeadings={setHeadings} />
      </section>
      <TableOfContents headings={headings} />
    </>
  );
}
