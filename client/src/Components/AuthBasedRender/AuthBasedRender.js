import useAuth from 'Hooks/useAuth';

export default function AuthBasedRender({ children }) {
  const { user } = useAuth();

  if (user !== null) {
    return null;
  }

  return <>{children}</>;
}
