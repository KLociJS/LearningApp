import { Link, useParams } from "react-router-dom";

import { AiOutlineEdit } from "react-icons/ai";

import { Modal, ModalTriggerElement } from "Components";
import DropDownMenu from "Components/DropDownMenu/DropDownMenu";
import EditCategoryModalContent from "./CategoryModalContent/EditCategoryModalContent";

export default function Edit() {
  const { id } = useParams();

  return (
    <DropDownMenu icon={<AiOutlineEdit className="edit-icon" />}>
      <Link to={`/update-article/${id}`} className="menu-item">
        Edit markdown
      </Link>
      <Modal
        modalContent={<EditCategoryModalContent />}
        triggerElement={
          <ModalTriggerElement className="menu-item last-child" text="Change Category" />
        }
      />
    </DropDownMenu>
  );
}
