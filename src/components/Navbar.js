'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 md:px-24 md:py-5 flex justify-between items-center">
      <div className="text-white text-2xl cursor-pointer">
        Prime<span className="text-yellow-500">Capital</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <Link href="/login">
          <button className="text-white hover:text-gray-200 cursor-pointer">Login</button>
        </Link>
        <Link href="/signup">
          <button className="bg-white text-black px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
} 