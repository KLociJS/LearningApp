import { useAuth } from "Hooks";

export default function CustomRolesRender({ allowedRoles, disAllowedRoles, children }) {
  const { user } = useAuth();

  const hasAllowedRoles = user?.roles?.some((role) => allowedRoles.includes(role));
  const hasDisallowedRoles = user?.roles?.some((role) => disAllowedRoles.includes(role));

  if (hasAllowedRoles && !hasDisallowedRoles) {
    return children;
  }

  return null;
}
