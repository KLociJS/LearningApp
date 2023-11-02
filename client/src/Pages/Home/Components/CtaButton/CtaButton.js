import { RoleBasedRender } from "Components";
import { useState } from "react";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import "./CtaButton.css";

export default function CtaButton() {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  return (
    <RoleBasedRender allowedRoles={["User"]}>
      <button
        className="landing-button"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onClick={() => navigate("/article")}>
        Get started{" "}
        <TbPlayerTrackNextFilled className={`landing-button-icon ${active ? "active" : ""}`} />
      </button>
    </RoleBasedRender>
  );
}
