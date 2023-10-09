import { useParams } from "react-router-dom";

import { RiDeleteBinLine } from "react-icons/ri";

import MarkdownPreview from "Components/MarkdownEditor/MarkdownPreview/MarkdownPreview";

import ArticleContext from "Context/ArticleProvider";
import { useGetArticle } from "Hooks";

import "./Components/DropdownMenu.css";

import { RoleBasedRender } from "Components";
import Modal from "../../../../Components/Modal/Modal";
import ModalTriggerElement from "../../../../Components/Modal/ModalTriggerElement";
import ArticleSkeleton from "./Components/ArticleSkeleton/ArticleSkeleton";
import DeleteArticleModalContent from "./Components/DeleteArticleModal/DeleteArticleModalContent";
import EditDropDownMenu from "./Components/EditDropDownMenu/EditDropDownMenu";
import PublishDropDownMenu from "./Components/PublishDropDownMenu/PublishDropDownMenu";

export default function Article() {
  const { id } = useParams();
  const {
    markdown,
    setMarkdown,
    title,
    setTitle,
    createdAt,
    author,
    isLoading,
    isPublished,
    setIsPublished,
    description,
    tags,
    setTags,
    category,
    subCategory
  } = useGetArticle();

  console.log(isPublished);

  if (isLoading) {
    return <ArticleSkeleton />;
  }

  return (
    <ArticleContext.Provider
      value={{
        markdown,
        setMarkdown,
        title,
        setTitle,
        createdAt,
        author,
        isLoading,
        isPublished,
        setIsPublished,
        description,
        tags,
        category,
        subCategory,
        setTags
      }}>
      <section className="article-header">
        <div>
          <h1 className="article-title">{title}</h1>
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
      <MarkdownPreview markdown={markdown} />
    </ArticleContext.Provider>
  );
}
