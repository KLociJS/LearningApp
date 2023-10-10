import { useParams } from "react-router-dom";

import { RiDeleteBinLine } from "react-icons/ri";

import MarkdownPreview from "Components/MarkdownEditor/MarkdownPreview/MarkdownPreview";

import ArticleContext from "Context/ArticleProvider";

import "./Components/DropdownMenu.css";

import { RoleBasedRender } from "Components";
import Modal from "Components/Modal/Modal";
import ModalTriggerElement from "Components/Modal/ModalTriggerElement";
import useSynchArticle from "Pages/Articles/Hooks/useSynchArticle";
import ArticleSkeleton from "./Components/ArticleSkeleton/ArticleSkeleton";
import DeleteArticleModalContent from "./Components/DeleteArticleModal/DeleteArticleModalContent";
import EditDropDownMenu from "./Components/EditDropDownMenu/EditDropDownMenu";
import PublishDropDownMenu from "./Components/PublishDropDownMenu/PublishDropDownMenu";

export default function Article() {
  const { id } = useParams();
  const { state, dispatch } = useSynchArticle();

  if (state.isLoading) {
    return <ArticleSkeleton />;
  }

  return (
    <ArticleContext.Provider value={{ state, dispatch }}>
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
    </ArticleContext.Provider>
  );
}
