import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { AiOutlineEdit } from "react-icons/ai";

import { Modal, ModalTriggerElement } from "Components";
import EditModalContent from "./CategoryModalContent/EditModalContent";

export default function Edit() {
  const { id } = useParams();
  const [show, setShow] = useState(false);
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
      <AiOutlineEdit className="edit-icon" onClick={() => setShow((prev) => !prev)} />
      {show ? (
        <div className="dropdown-menu">
          <Link to={`/update-article/${id}`} className="menu-item">
            Edit markdown
          </Link>
          <Modal
            modalContent={<EditModalContent />}
            triggerElement={
              <ModalTriggerElement className="menu-item last-child" text="Change Category" />
            }
          />
        </div>
      ) : null}
    </div>
  );
}
