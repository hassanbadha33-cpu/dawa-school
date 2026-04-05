import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { School, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:w-1/2 xl:w-5/12 mx-auto">
        <div className="w-full max-w-sm mx-auto lg:w-96">
          <div className="flex items-center gap-3 text-brand-600 mb-8">
            <div className="p-3 bg-brand-50 rounded-2xl">
              <School className="w-8 h-8" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              Dawa <span className="text-brand-600">Secondary</span>
            </span>
          </div>
          
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            Please sign in to your administrator account
          </p>

          <div className="mt-8">
            <form className="space-y-6 bg-white p-8 rounded-2xl shadow-soft border border-slate-100" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50/50 border border-red-200 text-red-600 p-4 rounded-xl text-sm flex items-start gap-3 backdrop-blur-sm animate-in fade-in slide-in-from-top-2">
                  <ShieldCheck className="w-5 h-5 flex-shrink-0 text-red-500" />
                  <p>{error}</p>
                </div>
              )}
              
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all sm:text-sm bg-slate-50/50 focus:bg-white"
                    placeholder="admin@gmail.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all sm:text-sm bg-slate-50/50 focus:bg-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-brand-600 focus:ring-brand-500/50 border-slate-300 rounded transition-colors cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-slate-600 cursor-pointer">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                    Forgot details?
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all active:scale-[0.98] group"
                >
                  Sign into dashboard
                  <ArrowRight className="ml-2 w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </form>
            

          </div>
        </div>
      </div>
      
      {/* Right side - Image/Graphic */}
      <div className="hidden lg:block relative w-0 flex-1 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/95 to-slate-900/95 mix-blend-multiply z-10" />
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Students learning together"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 lg:p-16 xl:p-24">
          <blockquote className="space-y-6">
            <p className="text-3xl font-semibold text-white max-w-2xl leading-tight">
              "Dawa School transformed how we manage our institution. Everything from student tracking to daily attendance is seamless, intuitive, and beautifully designed."
            </p>
            <footer className="flex flex-col mt-4">
              <p className="text-xl font-black text-white tracking-widest uppercase">Hassan Siraad</p>
              <p className="text-emerald-300 font-bold text-lg mt-1 tracking-wide">Principal, Dawa Academy</p>
            </footer>
          </blockquote>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-brand-400 opacity-20 blur-3xl z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-indigo-500 opacity-20 blur-3xl z-10 pointer-events-none" />
      </div>
    </div>
  );
}
