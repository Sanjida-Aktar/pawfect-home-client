import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-base-100 text-base-content">
      <div className="text-8xl mb-2">🐕‍🦺</div>
      <h1 className="text-6xl font-extrabold text-primary">404</h1>
      <h2 className="text-2xl font-bold mt-2">This page ran away</h2>
      <p className="mt-2 opacity-70 max-w-md">
        We looked everywhere but could not find the page you wanted. It may have been moved or the link is wrong.
      </p>
      <Link to="/" className="btn btn-primary mt-6">Back to Home</Link>
    </div>
  );
}
