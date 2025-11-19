'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleDownloadTerms = () => {
    const terms = `
PRIMECAPITAL INVESTMENT TERMS AND CONDITIONS

1. Investment Services
PrimeCapital provides investment management services to clients seeking to grow their wealth through various investment strategies.

2. Account Management
2.1. All accounts are managed in accordance with the client's risk profile and investment objectives.
2.2. Clients must maintain a minimum balance as specified in their account agreement.
2.3. Account statements will be provided on a monthly basis.

3. Fees and Charges
3.1. Management fees are calculated as a percentage of assets under management.
3.2. Performance fees may apply based on investment returns exceeding specified benchmarks.
3.3. All fees are disclosed in the client agreement and are subject to change with 30 days notice.

4. Risk Disclosure
4.1. All investments carry risk, including the potential loss of principal.
4.2. Past performance is not indicative of future results.
4.3. Clients should carefully consider their investment objectives and risk tolerance.

5. Privacy and Security
5.1. Client information is protected in accordance with applicable privacy laws.
5.2. Security measures are implemented to protect client assets and personal information.

6. Termination
6.1. Either party may terminate the agreement with 30 days written notice.
6.2. Upon termination, all fees and charges will be settled in accordance with the agreement.

7. Governing Law
7.1. These terms are governed by the laws of the jurisdiction in which PrimeCapital operates.
7.2. Any disputes shall be resolved through arbitration in accordance with the rules of the relevant jurisdiction.

8. Amendments
8.1. These terms may be amended with 30 days notice to clients.
8.2. Continued use of services after amendments constitutes acceptance of the new terms.

Last Updated: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([terms], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'PrimeCapital_Terms_and_Conditions.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
  
    const validUsers = [
      { email: 'npugh87531@gmail.com', password: 'Miracles!02469' },
      { email: 'nathanielwealth@gmail.com', password: 'nath12345' },
      { email: 'Vincentdonofrio@gmail.com', password: 'Donofrio!02469'},
     
    ];
  
    const userExists = validUsers.some(
      (user) => user.email === email && user.password === password
    );
  
    if (userExists) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      router.push('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };
  

  return (
    <main className="relative min-h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ 
          backgroundImage: 'url(/bg.jpg)',
          imageRendering: 'crisp-edges',
          WebkitImageRendering: 'crisp-edges'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="fixed top-0 left-0 right-0 z-50 p-4 md:px-24 md:py-10 flex justify-between items-center">
        <div 
          onClick={() => router.push('/')} 
          className="text-white text-2xl cursor-pointer"
        >
          Prime<span className="text-yellow-500">Capital</span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.push('/')}
            className="text-white hover:text-yellow-500 transition-colors duration-300 cursor-pointer"
          >
            Home
          </button>
          <button 
            onClick={handleDownloadTerms}
            className="text-white hover:text-yellow-500 transition-colors duration-300 cursor-pointer"
          >
            Terms
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="fixed top-20 right-4 bg-yellow-500 text-black px-4 py-2 rounded-md shadow-lg z-50 text-[10px]">
          Terms of Service downloaded successfully
        </div>
      )}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        <div className="p-8 rounded-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">Login</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-500/30 text-red-200 rounded-md text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 text-white border-b outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 text-white border-b outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-300 font-semibold"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-white">
            Do not have an account?{' '}
            <Link href="/signup" className="text-yellow-500 hover:text-yellow-600">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
} 