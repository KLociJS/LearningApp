import { useAuth } from "Hooks";
import { useParams } from "react-router-dom";

export default function UserNameBasedRender({ children }) {
  const { user } = useAuth();
  const { name } = useParams();
  if (user?.userName === name) {
    return <>{children}</>;
  }
  return null;
}
