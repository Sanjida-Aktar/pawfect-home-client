import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Spinner from './Spinner';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // wait for firebase to restore the session, otherwise a reload kicks the user to login
  if (loading) return <Spinner full />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
