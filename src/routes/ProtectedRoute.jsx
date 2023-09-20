import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    // Use useEffect to perform the navigation based on the auth status.
    if (auth) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }, [auth, navigate]);

  // Return the children (content) only if you want to render them conditionally.
  // If not, you can simply use this component to perform the redirection.
  return <>{children}</>;
}

export default ProtectedRoute;
