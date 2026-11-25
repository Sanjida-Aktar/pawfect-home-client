import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';
import GoogleButton from '../components/GoogleButton';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setSubmitting(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error('Wrong email or password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body">
          <h1 className="text-3xl font-extrabold">Login</h1>
          <p className="opacity-70 text-sm">Log in to send adoption requests and manage your pets.</p>

          <form onSubmit={handleLogin} className="mt-4 space-y-4">
            <label className="form-control">
              <span className="label-text mb-1">Email</span>
              <input name="email" type="email" className="input input-bordered w-full" placeholder="you@example.com" required />
            </label>
            <label className="form-control">
              <span className="label-text mb-1">Password</span>
              <input name="password" type="password" className="input input-bordered w-full" placeholder="Your password" required />
            </label>
            <button disabled={submitting} className="btn btn-primary w-full">
              {submitting ? <span className="loading loading-spinner loading-sm"></span> : 'Login'}
            </button>
          </form>

          <div className="divider text-sm">or</div>
          <GoogleButton redirectTo={from} />

          <p className="text-sm text-center mt-4">
            New to PawHome?{' '}
            <Link to="/register" state={location.state} className="link link-primary font-semibold">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
