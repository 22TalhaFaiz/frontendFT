import React, { useState } from 'react';
import { Mail, ArrowLeft, Check, AlertCircle, Loader2 } from 'lucide-react';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    
    if (!email) {
      setError('Email address is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call to Express backend
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate Express session handling
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include session cookies
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to send reset email');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setIsSubmitted(false);
    setEmail('');
    setError('');
    setTouched(false);
  };

  const isEmailValid = email && validateEmail(email);
  const showError = touched && error;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-orange-100 animate-in fade-in duration-500">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Check className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              We've sent password reset instructions to
              <span className="block font-semibold text-orange-600 mt-1">{email}</span>
            </p>
            
            <div className="space-y-4">
              <button
                onClick={handleBackToLogin}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </button>
              
              <p className="text-sm text-gray-500">
                Didn't receive the email? Check your spam folder or 
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-orange-600 hover:text-orange-700 font-medium ml-1 underline"
                >
                  try again
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-4 bg-[url('/assets/img/hero/hero-1.jpg')] bg-cover bg-center">
      <div className="rounded-2xl shadow-2xl p-8 w-full max-w-md border  animate-in fade-in duration-500">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Mail className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
          <p className="text-gray-600">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(e);
                  }
                }}
                onBlur={() => setTouched(true)}
                placeholder="Enter your email address"
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                  showError
                    ? 'border-red-300 bg-red-50 focus:border-red-500'
                    : isEmailValid
                    ? 'border-green-300 bg-green-50 focus:border-green-500'
                    : 'border-gray-200 bg-white focus:border-orange-500'
                } ${touched && !email ? 'border-red-300 bg-red-50' : ''}`}
                disabled={isLoading}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Mail className={`h-5 w-5 ${
                  showError ? 'text-red-400' : isEmailValid ? 'text-green-400' : 'text-gray-400'
                }`} />
              </div>
              {isEmailValid && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Check className="h-5 w-5 text-green-400" />
                </div>
              )}
            </div>
            
            {showError && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm animate-in fade-in duration-200">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !email}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
              isLoading || !email
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending Reset Link...
              </>
            ) : (
              <>
                <Mail className="h-5 w-5" />
                Send Reset Link
              </>
            )}
          </button>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleBackToLogin}
            className="flex items-center justify-center gap-2 text-gray-600 hover:text-orange-600 font-medium transition-colors duration-200 mx-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-center text-sm text-gray-500">
            Remember your password?{' '}
            <button className="text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-colors duration-200">
              Sign in instead
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}