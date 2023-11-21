import { useParams } from "react-router-dom";
import "./Components/DropdownMenu.css";

import { RiDeleteBinLine } from "react-icons/ri";

import MarkdownPreview from "Components/MarkdownEditor/MarkdownPreview/MarkdownPreview";
import Modal from "Components/Modal/Modal";
import ModalTriggerElement from "Components/Modal/ModalTriggerElement";

import TableOfContents from "Components/TableOfContents/TableOfContents";
import useArticleContext from "Hooks/useArticle";
import useGetHeadingIds from "Pages/SharedArticleDashBoard/Components/Hooks/useGetHeadingIds";
import ArticleSkeleton from "./Components/ArticleSkeleton/ArticleSkeleton";
import DeleteArticleModalContent from "./Components/DeleteArticleModal/DeleteArticleModalContent";
import EditDropDownMenu from "./Components/EditDropDownMenu/EditDropDownMenu";
import PublishDropDownMenu from "./Components/PublishDropDownMenu/PublishDropDownMenu";

export default function Article() {
  const { id } = useParams();
  const { state } = useArticleContext();
  const { headings, setHeadings } = useGetHeadingIds(state.isLoading);

  if (state.isLoading) {
    return <ArticleSkeleton />;
  }

  return (
    <>
      <section className="article-container">
        <section className="article-header">
          <div>
            <h1 className="article-title">{state.article.title}</h1>
          </div>
          <div className="action-btn">
            <PublishDropDownMenu />
            <EditDropDownMenu />
            <Modal
              modalContent={<DeleteArticleModalContent id={id} />}
              triggerElement={
                <ModalTriggerElement
                  text={<RiDeleteBinLine className="delete-icon" />}
                  className="delete-icon"
                />
              }
            />
          </div>
        </section>
        <MarkdownPreview markdown={state.article.markdown} setHeadings={setHeadings} />
      </section>
      <TableOfContents headings={headings} />
    </>
  );
}
