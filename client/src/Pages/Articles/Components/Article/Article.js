import { useParams } from "react-router-dom";
import "./Components/DropdownMenu.css";

import { RiDeleteBinLine } from "react-icons/ri";

import { RoleBasedRender } from "Components";
import MarkdownPreview from "Components/MarkdownEditor/MarkdownPreview/MarkdownPreview";
import Modal from "Components/Modal/Modal";
import ModalTriggerElement from "Components/Modal/ModalTriggerElement";

import { useArticle } from "Hooks";

import ArticleSkeleton from "./Components/ArticleSkeleton/ArticleSkeleton";
import DeleteArticleModalContent from "./Components/DeleteArticleModal/DeleteArticleModalContent";
import EditDropDownMenu from "./Components/EditDropDownMenu/EditDropDownMenu";
import PublishDropDownMenu from "./Components/PublishDropDownMenu/PublishDropDownMenu";

export default function Article() {
  const { id } = useParams();
  const { state } = useArticle();
  console.log(state);

  if (state.isLoading) {
    return <ArticleSkeleton />;
  }

  return (
    <>
      <section className="article-header">
        <div>
          <h1 className="article-title">{state.article.title}</h1>
        </div>
        <div className="action-btn">
          <RoleBasedRender allowedroles={["Author"]}>
            <PublishDropDownMenu />
          </RoleBasedRender>
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
      <MarkdownPreview markdown={state.article.markdown} />
    </>
  );
}
