import useAuth from "Hooks/useAuth";

export default function RoleBasedRender({ children, allowedRoles }) {
  const { user } = useAuth();

  const hasAllowedRoles = user?.roles?.some((r) => allowedRoles?.includes(r));

  if (!hasAllowedRoles) {
    return null;
  }

  return <>{children}</>;
}
