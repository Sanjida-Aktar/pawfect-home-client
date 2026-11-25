import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="text-2xl font-extrabold flex items-center gap-2">🐾 PawHome</h3>
          <p className="mt-3 text-sm opacity-80 max-w-xs">
            We connect loving people with pets that are waiting for a home. Every adoption makes room for another rescue.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li className="flex items-center gap-2"><MdLocationOn /> House 12, Road 5, Dhanmondi, Dhaka</li>
            <li className="flex items-center gap-2"><MdPhone /> +880 1700-000000</li>
            <li className="flex items-center gap-2"><MdEmail /> hello@pawhome.com</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick links</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li><Link to="/pets" className="hover:underline">Browse pets</Link></li>
            <li><Link to="/dashboard/add-pet" className="hover:underline">List a pet</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
          </ul>
          <div className="flex gap-3 mt-5">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="btn btn-circle btn-sm btn-outline"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="btn btn-circle btn-sm btn-outline"><FaInstagram /></a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" className="btn btn-circle btn-sm btn-outline"><FaXTwitter /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="btn btn-circle btn-sm btn-outline"><FaYoutube /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-sm opacity-70">
        © {new Date().getFullYear()} PawHome. All rights reserved.
      </div>
    </footer>
  );
}
