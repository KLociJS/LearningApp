import React from "react";
import useDropdown from "./Hooks/useDropdown";

export default function DropDownMenu({ icon, children }) {
  const { show, setShow, menuRef } = useDropdown();

  return (
    <div className="action-btn">
      <div className="menu-container" ref={menuRef}>
        {React.cloneElement(icon, { onClick: () => setShow((prev) => !prev) })}
        {show ? <div className="dropdown-menu">{children}</div> : null}
      </div>
    </div>
  );
}
