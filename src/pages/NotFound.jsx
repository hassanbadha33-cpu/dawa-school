import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 selection:bg-brand-500/30">
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-soft border border-emerald-100/60 p-10 sm:p-16 text-center animate-in zoom-in-95 duration-500 relative overflow-hidden">
        
        {/* Decorative background gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-200/40 to-emerald-300/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-200/40 to-brand-300/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-yellow-100 rounded-3xl flex items-center justify-center shadow-inner mb-8 transform -rotate-6">
            <span className="text-4xl font-black text-emerald-600 font-mono tracking-tighter shadow-sm">404</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            System Route Not Found
          </h1>
          <p className="text-lg text-slate-500 font-medium mb-10 max-w-md mx-auto">
            The module or page you are trying to access doesn't exist in the current Dawa Secondary database schema or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
             <button 
               onClick={() => navigate(-1)}
               className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 shadow-sm rounded-xl text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 hover:text-emerald-700 transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500"
             >
               <ArrowLeft className="w-5 h-5 mr-2" />
               Go Back
             </button>
             <button 
               onClick={() => navigate('/dashboard')}
               className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-xl shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
             >
               <Home className="w-5 h-5 mr-2" />
               Return to Dashboard
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
