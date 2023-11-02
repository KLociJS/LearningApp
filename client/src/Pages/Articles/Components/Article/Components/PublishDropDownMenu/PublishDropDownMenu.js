import { AiOutlineShareAlt } from "react-icons/ai";

import { Modal, ModalTriggerElement, RoleBasedRender } from "Components";
import DropDownMenu from "Components/DropDownMenu/DropDownMenu";
import useArticleContext from "Hooks/useArticle";
import PublishArticleModalContent from "./PublishArticleModalContent/PublishArticleModalContent";
import PublishUpdateModal from "./PublishUpdateModalContent/PublishUpdateModal";
import UnpublishArticleModal from "./PublishUpdateModalContent/UnpublishArticleModal";

export default function Publish() {
  const { state } = useArticleContext();

  return (
    <RoleBasedRender allowedroles={["Author"]}>
      <DropDownMenu icon={<AiOutlineShareAlt className="edit-icon" />}>
        {state.article.isPublished ? (
          <>
            <Modal
              triggerElement={
                <ModalTriggerElement text="Edit Publish Details" className="menu-item" />
              }
              modalContent={<PublishUpdateModal />}
            />
            <Modal
              triggerElement={
                <ModalTriggerElement text="Unpublish Article" className="menu-item last-child" />
              }
              modalContent={<UnpublishArticleModal />}
            />
          </>
        ) : (
          <>
            <Modal
              modalContent={<PublishArticleModalContent />}
              triggerElement={
                <ModalTriggerElement text="Publish Article" className="menu-item last-child" />
              }
            />
          </>
        )}
      </DropDownMenu>
    </RoleBasedRender>
  );
}
