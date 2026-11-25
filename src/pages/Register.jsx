import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';
import GoogleButton from '../components/GoogleButton';

// returns an error message or empty string
const checkPassword = (password) => {
  if (password.length < 6) return 'Password must be at least 6 characters';
  if (!/[A-Z]/.test(password)) return 'Password needs at least one uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password needs at least one lowercase letter';
  return '';
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [passwordError, setPasswordError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    // form.elements is safer than form.name, because "name" is also a property of the form itself
    const form = e.target.elements;
    const name = form.name.value.trim();
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    const problem = checkPassword(password);
    if (problem) {
      setPasswordError(problem);
      return toast.error(problem);
    }
    if (password !== confirm) {
      setPasswordError('Passwords do not match');
      return toast.error('Password and confirm password must be the same');
    }
    setPasswordError('');

    setSubmitting(true);
    try {
      await register(name, email, password, photo);
      toast.success('Account created. Welcome to PawHome!');
      navigate(from, { replace: true });
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        toast.error('This email is already registered. Try logging in.');
      } else {
        toast.error('Could not create the account, please try again');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body">
          <h1 className="text-3xl font-extrabold">Create an account</h1>
          <p className="opacity-70 text-sm">It takes less than a minute.</p>

          <form onSubmit={handleRegister} className="mt-4 space-y-4">
            <label className="form-control">
              <span className="label-text mb-1">Name</span>
              <input name="name" className="input input-bordered w-full" placeholder="Your full name" required />
            </label>
            <label className="form-control">
              <span className="label-text mb-1">Email</span>
              <input name="email" type="email" className="input input-bordered w-full" placeholder="you@example.com" required />
            </label>
            <label className="form-control">
              <span className="label-text mb-1">Photo URL</span>
              <input name="photo" type="url" className="input input-bordered w-full" placeholder="https://i.ibb.co/your-photo.jpg" required />
            </label>
            <label className="form-control">
              <span className="label-text mb-1">Password</span>
              <input name="password" type="password" className="input input-bordered w-full" placeholder="Min 6 chars, upper + lower case" required />
            </label>
            <label className="form-control">
              <span className="label-text mb-1">Confirm password</span>
              <input name="confirm" type="password" className="input input-bordered w-full" placeholder="Type the password again" required />
              {passwordError && <span className="text-error text-sm mt-1">{passwordError}</span>}
            </label>
            <button disabled={submitting} className="btn btn-primary w-full">
              {submitting ? <span className="loading loading-spinner loading-sm"></span> : 'Register'}
            </button>
          </form>

          <div className="divider text-sm">or</div>
          <GoogleButton redirectTo={from} />

          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" state={location.state} className="link link-primary font-semibold">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
