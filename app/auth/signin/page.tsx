'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (isLogin) {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || 'Invalid email or password');
          setLoading(false);
          return;
        }

        localStorage.setItem('artisanAccessToken', data.accessToken);
        setSuccess('Signed in successfully! Redirecting...');
        setTimeout(() => {
          router.push('/');
          router.refresh();
        }, 1200);
      } catch {
        setError('An unexpected error occurred. Please try again.');
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
          })
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || 'Failed to register account');
          setLoading(false);
          return;
        }

        localStorage.setItem('artisanAccessToken', data.accessToken);
        setSuccess('Account created successfully! Redirecting...');
        setTimeout(() => {
          router.push('/');
          router.refresh();
        }, 1200);
      } catch {
        setError('An unexpected error occurred. Please try again.');
      }
    }

    setLoading(false);
  };


  return (
    <div className="min-h-screen bg-[#110B08] text-[#FAFAF9] font-['Inter'] relative flex flex-col justify-between py-12 px-6 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-950/15 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="max-w-md mx-auto w-full flex items-center justify-between mb-8 z-10">
        <Link href="/" className="font-['Playfair_Display'] text-2xl font-bold tracking-tight text-[#D4A574]">
          Artisan Coffee
        </Link>
        <Link href="/" className="text-amber-100/60 hover:text-amber-100 text-sm transition-colors">
          Home
        </Link>
      </header>

      {/* Form Card */}
      <main className="max-w-md mx-auto w-full flex-grow flex items-center justify-center z-10">
        <div className="w-full bg-[#1C120C]/65 border border-amber-900/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative">
          
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-amber-50 mb-2 text-center">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-xs text-amber-100/50 text-center mb-8">
            {isLogin ? 'Enter your credentials to enter the luxury roastery' : 'Join the elite inner circle of coffee craft'}
          </p>

          {/* Feedback alerts */}
          {error && (
            <div className="bg-red-950/40 border border-red-500/20 text-red-200 text-xs px-4 py-3 rounded-xl mb-6 text-center">
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div className="bg-emerald-950/40 border border-emerald-500/20 text-emerald-200 text-xs px-4 py-3 rounded-xl mb-6 text-center">
              ✨ {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-amber-200/60 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Kaldi Goatherd"
                  className="w-full bg-[#150D09]/50 border border-amber-900/30 rounded-xl px-4 py-3 text-sm text-amber-50 focus:outline-none focus:border-amber-500/50 transition-colors placeholder-amber-100/20"
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-amber-200/60 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@domain.com"
                className="w-full bg-[#150D09]/50 border border-amber-900/30 rounded-xl px-4 py-3 text-sm text-amber-50 focus:outline-none focus:border-amber-500/50 transition-colors placeholder-amber-100/20"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-amber-200/60 mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full bg-[#150D09]/50 border border-amber-900/30 rounded-xl px-4 py-3 text-sm text-amber-50 focus:outline-none focus:border-amber-500/50 transition-colors placeholder-amber-100/20"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-amber-200/60 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full bg-[#150D09]/50 border border-amber-900/30 rounded-xl px-4 py-3 text-sm text-amber-50 focus:outline-none focus:border-amber-500/50 transition-colors placeholder-amber-100/20"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:from-amber-500 hover:to-amber-600 transition-all shadow-lg shadow-amber-950/20 disabled:opacity-50 mt-6"
            >
              {loading ? 'Processing...' : isLogin ? 'Access Lounge' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-100/50 mb-3">Or continue with</p>
            <button
              onClick={() => signIn('google')}
              type="button"
              className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-5 py-3 rounded-2xl border border-amber-600 bg-[#1C120C]/90 text-amber-100 text-sm font-semibold hover:bg-[#1F1A16] transition-colors"
            >
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Toggle */}
          <div className="mt-8 text-center text-xs text-amber-100/40">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
                setSuccess(null);
              }}
              className="ml-1 text-amber-500 hover:text-amber-400 font-semibold focus:outline-none"
            >
              {isLogin ? 'Sign up here' : 'Sign in here'}
            </button>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-amber-100/40 mt-8 z-10">
        © {new Date().getFullYear()} Artisan Roasters Cryptographic Gateway.
      </footer>
    </div>
  );
}
