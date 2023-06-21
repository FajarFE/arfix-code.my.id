import { Link } from 'react-router-dom';
import useAuth from './useAuth';

function LandingPage() {
  const { user } = useAuth();
  const isLogin = user !== null;

  return (
    <div>
      <h1>Welcome to My Website</h1>
      {isLogin ? (
        <p>You are already logged in.</p>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}

export default LandingPage;
