import { useEffect, useRef, useState } from "react";

import { AiOutlineShareAlt } from "react-icons/ai";

import { Modal, ModalTriggerElement } from "Components";
import { useArticle } from "Hooks";
import PublishArticleModalContent from "./PublishArticleModalContent/PublishArticleModalContent";
import PublishUpdateModal from "./PublishUpdateModalContent/PublishUpdateModal";
import UnpublishArticleModal from "./PublishUpdateModalContent/UnpublishArticleModal";

export default function Publish() {
  const [show, setShow] = useState(false);
  const { state } = useArticle();

  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="menu-container" ref={menuRef}>
      <AiOutlineShareAlt className="edit-icon" onClick={() => setShow((prev) => !prev)} />
      {show ? (
        <div className="dropdown-menu">
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
        </div>
      ) : null}
    </div>
  );
}
