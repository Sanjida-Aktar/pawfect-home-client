import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export default function GoogleButton({ redirectTo }) {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success('Logged in with Google');
      navigate(redirectTo, { replace: true });
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        toast.error('Google login failed. Please try again.');
      }
    }
  };

  return (
    <button type="button" onClick={handleGoogle} className="btn btn-outline w-full gap-2">
      <FcGoogle size={22} /> Continue with Google
    </button>
  );
}
