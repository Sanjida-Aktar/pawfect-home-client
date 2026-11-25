import { Link, NavLink } from 'react-router-dom';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { HiMenuAlt1 } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';
import useTheme from '../hooks/useTheme';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('You have been logged out');
    } catch (err) {
      toast.error('Logout failed, try again');
    }
  };

  const linkClass = ({ isActive }) => (isActive ? 'font-bold text-primary' : '');

  const links = (
    <>
      <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
      <li><NavLink to="/pets" className={linkClass}>All Pets</NavLink></li>
      <li><NavLink to="/dashboard/my-requests" className={linkClass}>My Requests</NavLink></li>
      <li><NavLink to="/dashboard/add-pet" className={linkClass}>Add Pet</NavLink></li>
    </>
  );

  return (
    <header className="bg-base-100 border-b border-base-300 sticky top-0 z-40">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-square" aria-label="Open menu">
              <HiMenuAlt1 size={24} />
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52">
              {links}
            </ul>
          </div>
          <Link to="/" className="flex items-center gap-2 text-2xl font-heading font-extrabold text-primary">
            <span className="text-3xl">🐾</span> PawHome
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1">{links}</ul>
        </div>

        <div className="navbar-end gap-2">
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle" aria-label="Toggle theme">
            {theme === 'light' ? <MdDarkMode size={22} /> : <MdLightMode size={22} />}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user.photo || 'https://placehold.co/80x80?text=U'}
                    alt={user.name || 'User'}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-56">
                <li className="px-3 py-2">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs opacity-70 break-all">{user.email}</p>
                </li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm md:btn-md">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
