import React, { useState } from 'react';
import { forgotPasswordApi } from '../../apis/Api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await forgotPasswordApi({ email });
      toast.success(response.data.message);
      navigate('/verify-otp', { state: { email } });
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
            <h2 className="text-3xl font-bold text-amber-50">Forgot Password</h2>
            <p className="text-amber-200 mt-2 text-sm">Enter your email to receive an OTP</p>
          </div>
          <div className="p-8">
            <form onSubmit={handleForgotPassword}>
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
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-yellow-700 to-amber-800 hover:from-yellow-800 hover:to-amber-900 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;