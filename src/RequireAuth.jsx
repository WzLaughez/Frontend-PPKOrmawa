import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function RequireAuth({ children, allowedRoles }) {
  const { auth } = useAuth();

  if (!auth.token) return <Navigate to="/login" />;
  if (!allowedRoles.includes(auth.role)) return <Navigate to="/unauthorized" />;

  return children;
}
