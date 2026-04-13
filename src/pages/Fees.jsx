import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, ArrowUpRight, DollarSign, ReceiptText, ArrowDownToLine } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Fees() {
  const { showToast } = useToast();
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setTimeout(() => {
      if(!active) return;
      const data = [
        { id: 'STU001', name: 'Emma Wilson', grade: '10th Grade' },
        { id: 'STU002', name: 'James Thompson', grade: '11th Grade' },
        { id: 'STU003', name: 'Sophia Martinez', grade: '9th Grade' },
        { id: 'STU004', name: 'Michael Chen', grade: '12th Grade' },
        { id: 'STU005', name: 'Isabella Davis', grade: '10th Grade' },
        { id: 'STU006', name: 'William Garcia', grade: '11th Grade' },
        { id: 'STU007', name: 'Olivia Rodriguez', grade: '9th Grade' },
        { id: 'STU008', name: 'Alexander Miller', grade: '12th Grade' },
        { id: 'STU009', name: 'Ava Hernandez', grade: '10th Grade' },
        { id: 'STU010', name: 'Ethan Moore', grade: '11th Grade' },
        { id: 'STU011', name: 'Mia Taylor', grade: '9th Grade' },
        { id: 'STU012', name: 'Benjamin Anderson', grade: '12th Grade' },
        { id: 'STU013', name: 'Charlotte Thomas', grade: '10th Grade' },
        { id: 'STU014', name: 'Daniel Jackson', grade: '11th Grade' },
        { id: 'STU015', name: 'Amelia White', grade: '9th Grade' },
        { id: 'STU016', name: 'Matthew Harris', grade: '12th Grade' },
        { id: 'STU017', name: 'Harper Martin', grade: '10th Grade' },
        { id: 'STU018', name: 'Joseph Thompson', grade: '11th Grade' },
        { id: 'STU019', name: 'Evelyn Garcia', grade: '9th Grade' },
        { id: 'STU020', name: 'David Martinez', grade: '12th Grade' },
        { id: 'STU021', name: 'Abigail Robinson', grade: '10th Grade' },
        { id: 'STU022', name: 'Samuel Clark', grade: '11th Grade' },
        { id: 'STU023', name: 'Emily Rodriguez', grade: '9th Grade' },
        { id: 'STU024', name: 'Jackson Lee', grade: '12th Grade' },
        { id: 'STU025', name: 'Elizabeth Perez', grade: '10th Grade' }
      ];
      const generatedFees = data.map((s, i) => ({
        id: s.id,
        student: s.name,
        grade: s.grade,
        amountDue: 1500 + (i * 50),
        amountPaid: i % 3 === 0 ? 0 : i % 5 === 0 ? 750 : 1500 + (i * 50),
        status: i % 3 === 0 ? 'Unpaid' : i % 5 === 0 ? 'Partial' : 'Paid',
        date: i % 3 === 0 ? 'Pending' : `Mar ${Math.max(1, 28 - i)}, 2024`
      }));
      setFees(generatedFees);
      setLoading(false);
    }, 600);
    return () => { active = false; };
  }, []);

  const toggleFeeStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'Paid' ? 'Partial' : currentStatus === 'Partial' ? 'Unpaid' : 'Paid';
    setFees(fees.map(f => f.id === id ? { ...f, status: nextStatus } : f));
    showToast(`Invoice status updated to ${nextStatus}`, 'success');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 min-h-screen relative">
      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center min-h-[500px]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-200 border-t-emerald-600"></div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Fees & Payments</h1>
          <p className="text-slate-500 mt-1 font-medium">Track tuitions, manage invoices, and verify outstanding balances.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => showToast('Exporting financial report to PDF...', 'info')} className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm flex items-center group active:scale-95">
             <Download className="w-4 h-4 mr-2 text-slate-400 group-hover:text-slate-600 transition-colors"/> Export Log
          </button>
          <button onClick={() => showToast('Initiating new invoice workflow...', 'success')} className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] flex items-center active:scale-95">
             <DollarSign className="w-4 h-4 mr-1"/> Collect Payment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft hover:shadow-xl transition-shadow flex items-center gap-5">
           <div className="h-14 w-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center"><ArrowDownToLine className="w-7 h-7"/></div>
           <div><p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Revenue</p><p className="text-3xl font-black text-slate-900">$124,500</p></div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft hover:shadow-xl transition-shadow flex items-center gap-5">
           <div className="h-14 w-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center"><ReceiptText className="w-7 h-7"/></div>
           <div><p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Outstanding Balances</p><p className="text-3xl font-black text-slate-900">$12,750</p></div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft hover:shadow-xl transition-shadow flex items-center gap-5">
           <div className="h-14 w-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center"><DollarSign className="w-7 h-7"/></div>
           <div><p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Processing Fees</p><p className="text-3xl font-black text-slate-900">$840</p></div>
        </div>
      </div>

      <div className="bg-white shadow-soft rounded-3xl border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
           <div className="relative max-w-sm w-full group">
             <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
               <Search className="h-4 w-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
             </div>
             <input
               className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all sm:text-sm shadow-sm"
               placeholder="Search by student name..."
               type="search"
             />
           </div>
           
           <button 
             onClick={() => showToast('Financial Filters menu opened.', 'info')}
             className="inline-flex items-center justify-center px-4 py-2.5 border border-slate-200 rounded-xl shadow-sm text-sm font-bold text-slate-600 bg-white hover:bg-slate-50 transition-all active:scale-95"
           >
             <Filter className="w-4 h-4 mr-2 text-slate-400" />
             Filters <span className="ml-2 bg-emerald-100 text-emerald-700 py-0.5 px-2 rounded-md text-xs">2</span>
           </button>
        </div>

        <div className="overflow-x-auto min-h-[400px] custom-scrollbar pb-2">
          <table className="w-full min-w-[900px] divide-y divide-slate-100">
            <thead className="bg-slate-50/80">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Student Details</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Amount Due</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Amount Paid</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Payment Status</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Last Transaction Date</th>
                <th scope="col" className="relative px-6 py-4"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-50">
              {fees.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-tr from-yellow-400 to-emerald-500 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-inner ring-2 ring-white group-hover:ring-slate-50 transition-all">
                        {record.student.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-extrabold text-slate-900">{record.student}</div>
                        <div className="text-xs font-bold text-slate-400 mt-0.5">{record.grade}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-700">${record.amountDue.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm font-black text-emerald-600">${record.amountPaid.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <button 
                      onClick={() => toggleFeeStatus(record.id, record.status)}
                      className={`px-3 py-1.5 inline-flex text-xs font-bold rounded-lg border shadow-sm uppercase tracking-wider cursor-pointer active:scale-95 transition-all ${
                        record.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60 hover:bg-emerald-100' : 
                        record.status === 'Partial' ? 'bg-amber-50 text-amber-700 border-amber-200/60 hover:bg-amber-100' : 
                        'bg-red-50 text-red-700 border-red-200/60 hover:bg-red-100'
                      }`}
                    >
                      {record.status}
                    </button>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-semibold text-slate-500">
                    {record.date}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => showToast(`Sending invoice reminder to ${record.student}...`, 'success')} className="text-brand-600 hover:text-brand-800 transition-colors bg-brand-50 px-3 py-1.5 rounded-lg active:scale-95 font-bold text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100">
                      Send Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
