import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black/50 backdrop-blur-sm text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-yellow-500 mb-4">PrimeCapital</h3>
            <p className="text-gray-300">Your trusted partner in investment and wealth management.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/investments" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Investments
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Email: support@primecapital.com</li>
              <li className="text-gray-300">Phone: +1 (555) 123-4567</li>
              <li className="text-gray-300">Address: 123 Wall Street, New York, NY</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gray-300 hover:text-yellow-500 transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} PrimeCapital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 