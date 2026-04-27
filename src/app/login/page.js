'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [displayCode, setDisplayCode] = useState('');
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

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendVerificationCode = (userEmail) => {
    const code = generateVerificationCode();
    setGeneratedCode(code);
    console.log(`Verification code for ${userEmail}: ${code}`);
    
    // Show simple verification modal
    setShowCodeModal(true);
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (verificationCode === generatedCode) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', pendingUser.email);
      router.push('/dashboard');
    } else {
      setError('Invalid verification code');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
  
    const validUsers = [
      { email: 'npugh87531@gmail.com', password: 'Miracles!02469' },
      { email: 'test@gmail.com', password: 'test12345' },
      { email: 'Dantonio@gmail.com', password: 'Dantonio12345' },

    ];
  
    const userExists = validUsers.some(
      (user) => user.email === email && user.password === password
    );
  
    if (userExists) {
      const foundUser = validUsers.find(user => user.email === email && user.password === password);
      
      // Skip 2FA for test@gmail.com, require it for all other valid emails
      if (email === 'test@gmail.com') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        router.push('/dashboard');
      } else {
        // Require 2FA for other valid emails
        setPendingUser(foundUser);
        sendVerificationCode(email);
        setShowVerification(true);
      }
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 text-white border-b outline-none pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-300 font-semibold"
            >
              Login
            </button>
          </form>
          {showVerification && (
            <div className="mt-6 p-6 bg-white/10 backdrop-blur-sm rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">
                Enter Verification Code
              </h3>
              <p className="text-gray-300 text-sm mb-4 text-center">
                A 6-digit code has been sent to {pendingUser?.email}
              </p>
              <form onSubmit={handleVerificationSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full px-4 py-2 text-white border-b outline-none text-center text-lg tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-yellow-500 text-black py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-300 font-semibold"
                  >
                    Verify
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowVerification(false);
                      setVerificationCode('');
                      setPendingUser(null);
                      setError('');
                    }}
                    className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300 font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              <button
                type="button"
                onClick={() => sendVerificationCode(pendingUser?.email)}
                className="mt-3 w-full text-yellow-500 hover:text-yellow-400 text-sm transition-colors duration-300"
              >
                Resend Code
              </button>
            </div>
          )}
          <p className="mt-4 text-center text-sm text-white">
            Do not have an account?{' '}
            <Link href="/signup" className="text-yellow-500 hover:text-yellow-600">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      
      {/* Sleek Verification Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4 border border-white/20">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Enter Your Code</h3>
              <p className="text-gray-200 mb-6 text-sm">
                Input your one-time login code to continue
              </p>
              
              <div className="mb-6">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full px-4 py-3 text-center text-xl font-bold text-white bg-white/10 border-2 border-white/30 rounded-xl focus:outline-none focus:border-yellow-500 focus:bg-white/20 tracking-widest backdrop-blur-sm transition-all duration-300"
                  placeholder="000000"
                  maxLength={6}
                  pattern="[0-9]{6}"
                  autoFocus
                />
              </div>
              
              <div className="flex space-x-3 mb-4">
                <button
                  onClick={() => {
                    if (verificationCode.length === 6) {
                      localStorage.setItem('isLoggedIn', 'true');
                      localStorage.setItem('userEmail', pendingUser.email);
                      router.push('/dashboard');
                    } else {
                      setError('Please enter a 6-digit code');
                    }
                  }}
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white py-2 px-4 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Verify
                </button>
                <button
                  onClick={() => {
                    setShowCodeModal(false);
                    setShowVerification(false);
                    setVerificationCode('');
                    setPendingUser(null);
                    setError('');
                  }}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-xl font-semibold text-sm transition-all duration-300 border border-white/20 backdrop-blur-sm"
                >
                  Cancel
                </button>
              </div>
              
              <button
                onClick={() => {
                  const newCode = generateVerificationCode();
                  setGeneratedCode(newCode);
                  console.log(`New verification code: ${newCode}`);
                }}
                className="text-yellow-400 hover:text-yellow-300 text-xs font-medium transition-colors duration-300"
              >
                Resend Code
              </button>
              
              {error && (
                <div className="mt-3 p-3 bg-red-500/20 border border-red-500/30 text-red-200 rounded-lg text-xs backdrop-blur-sm">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}