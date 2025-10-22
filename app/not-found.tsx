import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gestorial-light flex items-center justify-center p-4">
      <div className="text-center">
        <Logo size="lg" className="justify-center mb-8" />
        <h1 className="text-4xl font-bold text-gestorial-dark mb-4">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for does not exist.
        </p>
        <Link 
          href="/dashboard" 
          className="gestorial-button inline-flex items-center"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}