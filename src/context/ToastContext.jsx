import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { X, CheckCircle, Info, AlertCircle } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        removeToast(toasts[0].id);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toasts, removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className="animate-in slide-in-from-right-8 zoom-in-95 fade-in duration-300 pointer-events-auto flex items-center gap-3 bg-white/90 backdrop-blur-xl px-4 py-3.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 min-w-[300px]"
          >
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-brand-500 flex-shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
            <span className="text-sm font-bold text-slate-800 flex-1">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-lg transition-colors flex-shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
