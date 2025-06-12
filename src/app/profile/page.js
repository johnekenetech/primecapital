'use client';
import { useState } from 'react';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Najee Pugh',
    email: 'npugh87531@gmail.com ',
    phone: '+1 (956)-774-3201',
    address: '**************',
    dateOfBirth: '**********',
    // ssn: '***-**-2264',
    kycStatus: 'Verified',
    accountType: 'Premium',
    // memberSince: '2021-02-23',
    twoFactorEnabled: true,
    notifications: true,
    language: 'English',
    timezone: 'America/WT'
  });
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the changes to your backend
  };

  const handleLogout = () => {
    // Implement logout functionality
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

      <div className="relative z-10 pt-32 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-yellow-500">Profile Settings</h1>
              <button
                onClick={isEditing ? handleSave : handleEdit}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  {/* <h2 className="text-xl font-semibold text-yellow-500 mb-4">Personal Information</h2> */}
                  {/* <div className="space-y-4">
                    <div>
                      <label className="block text-gray-200 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        disabled={!isEditing}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-200 mb-1">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        disabled={!isEditing}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-200 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        disabled={!isEditing}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-200 mb-1">Address</label>
                      <input
                        type="text"
                        value={profile.address}
                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                        disabled={!isEditing}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 disabled:opacity-50"
                      />
                    </div>
                  </div> */}
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-yellow-500 mb-4">Security Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-200">Two-Factor Authentication</span>
                      <button
                        onClick={() => setProfile({ ...profile, twoFactorEnabled: !profile.twoFactorEnabled })}
                        disabled={!isEditing}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                          profile.twoFactorEnabled
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-red-500 hover:bg-red-600'
                        }`}
                      >
                        {profile.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-200">Email Notifications</span>
                      <button
                        onClick={() => setProfile({ ...profile, notifications: !profile.notifications })}
                        disabled={!isEditing}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                          profile.notifications
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-red-500 hover:bg-red-600'
                        }`}
                      >
                        {profile.notifications ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-yellow-500 mb-4">Account Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-200 mb-1">Account Type</label>
                      <input
                        type="text"
                        value={profile.accountType}
                        disabled
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-200 mb-1">KYC Status</label>
                      <input
                        type="text"
                        value={profile.kycStatus}
                        disabled
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-200 mb-1">Member Since</label>
                      <input
                        type="text"
                        value={profile.memberSince}
                        placeholder='02-12-2023'
                        disabled
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white opacity-50"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-yellow-500 mb-4">Preferences</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-200 mb-1">Language</label>
                      <select
                        value={profile.language}
                        onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                        disabled={!isEditing}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 disabled:opacity-50"
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-200 mb-1">Timezone</label>
                      <select
                        value={profile.timezone}
                        onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                        disabled={!isEditing}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 disabled:opacity-50"
                      >
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

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
    </main>
  );
} 