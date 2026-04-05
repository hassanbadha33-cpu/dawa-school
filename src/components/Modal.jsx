import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 fade-in duration-300 border border-slate-100/50 flex flex-col max-h-full">
        <div className="flex justify-between items-center p-6 border-b border-slate-100/80 bg-slate-50/50 flex-shrink-0">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">{title}</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-200/50 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
