import React, { useState } from 'react';
import { verifyOtpApi } from '../../apis/Api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyOtpAndResetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await verifyOtpApi({ email, otp, password });
      toast.success(response.data.message);
      navigate('/', { state: { email } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-900 to-amber-900 p-8">
            <h2 className="text-3xl font-bold text-amber-50">Reset Password</h2>
            <p className="text-amber-200 mt-2 text-sm">Enter your email, OTP, and new password</p>
          </div>
          <div className="p-8">
            <form onSubmit={handleResetPassword}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-yellow-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-amber-600 transition duration-300"
                  placeholder="you@example.com"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="otp" className="block text-sm font-medium text-yellow-900 mb-2">
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-amber-600 transition duration-300"
                  placeholder="Enter your OTP"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-yellow-900 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-amber-600 transition duration-300"
                  placeholder="Enter your new password"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-yellow-700 to-amber-800 hover:from-yellow-800 hover:to-amber-900 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Verifying...' : 'Reset Password'}
              </button>
            </form>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpAndResetPassword;