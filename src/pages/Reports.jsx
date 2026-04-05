import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download, Share2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

// Mock Data
const paymentData = [
  { name: 'Paid in Full', value: 850, color: '#10b981' }, 
  { name: 'Partial Payment', value: 200, color: '#f59e0b' },
  { name: 'Unpaid (Overdue)', value: 195, color: '#ef4444' }
];

const attendanceData = [
  { name: 'Week 1', Present: 1200, Absent: 30, Late: 15 },
  { name: 'Week 2', Present: 1180, Absent: 45, Late: 20 },
  { name: 'Week 3', Present: 1210, Absent: 20, Late: 15 },
  { name: 'Week 4', Present: 1230, Absent: 10, Late: 5 },
];

export default function Reports() {
  const { showToast } = useToast();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Reports & Analyticals</h1>
          <p className="text-slate-500 mt-1 font-medium">Deep-dive into payment status overviews and attendance summaries.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => showToast('Copying dashboard deep-link to clipboard...', 'success')} className="bg-white border border-slate-200 text-slate-700 p-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm active:scale-95">
             <Share2 className="w-5 h-5"/>
          </button>
          <button onClick={() => showToast('Preparing comprehensive PDF Report...', 'info')} className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] flex items-center active:scale-95">
             <Download className="w-4 h-4 mr-2"/> Download Complete Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4 mb-4">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-3xl p-8 text-white shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)] transform hover:-translate-y-1.5 transition-all duration-300 cursor-default border border-emerald-400/30">
           <p className="text-emerald-100 font-black uppercase tracking-[0.2em] text-[10px] mb-3 opacity-90">Total Revenue Collected</p>
           <p className="text-5xl font-black tracking-tight drop-shadow-sm">$850,000</p>
           <div className="mt-6 flex items-center text-sm bg-black/10 w-fit px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
             <div className="w-2 h-2 rounded-full bg-emerald-300 mr-2 animate-pulse"></div>
             <span className="text-emerald-50 font-bold">+15.4% from last semester</span>
           </div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 text-white shadow-[0_10px_40px_-10px_rgba(245,158,11,0.5)] transform hover:-translate-y-1.5 transition-all duration-300 cursor-default border border-amber-400/30">
           <p className="text-amber-100 font-black uppercase tracking-[0.2em] text-[10px] mb-3 opacity-90">Pending Invoices</p>
           <p className="text-5xl font-black tracking-tight drop-shadow-sm">$395,000</p>
           <div className="mt-6 flex items-center text-sm bg-black/10 w-fit px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
             <div className="w-2 h-2 rounded-full bg-red-300 mr-2 animate-pulse"></div>
             <span className="text-amber-50 font-bold">Action required for 195 entries</span>
           </div>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-8 text-white shadow-[0_10px_40px_-10px_rgba(37,99,235,0.5)] transform hover:-translate-y-1.5 transition-all duration-300 cursor-default border border-blue-400/30">
           <p className="text-blue-100 font-black uppercase tracking-[0.2em] text-[10px] mb-3 opacity-90">Weekly Institutional Attendance</p>
           <p className="text-5xl font-black tracking-tight drop-shadow-sm">94.8%</p>
           <div className="mt-6 flex items-center text-sm bg-black/10 w-fit px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
             <div className="w-2 h-2 rounded-full bg-blue-300 mr-2 animate-pulse"></div>
             <span className="text-blue-50 font-bold">Peak performance: 10th Grade</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Payment Status Pie Chart */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-100 hover:shadow-xl transition-shadow min-h-[450px] flex flex-col">
          <h2 className="text-xl font-black text-slate-900">Payment Status Overview</h2>
          <p className="text-sm text-slate-500 mb-8 font-medium">Distribution of tuition fees collected vs outstanding.</p>
          
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {paymentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }}
                />
                <Legend iconType="circle" verticalAlign="bottom" height={36} wrapperStyle={{ fontWeight: 700, fontSize: '14px', color: '#64748b' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Bar Chart */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-100 hover:shadow-xl transition-shadow min-h-[450px] flex flex-col">
          <h2 className="text-xl font-black text-slate-900">Attendance Status Overview</h2>
          <p className="text-sm text-slate-500 mb-8 font-medium">Weekly tracking of present, absent, and late entries.</p>
          
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 700}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontWeight: 700, fontSize: '14px', color: '#64748b', paddingTop: '20px' }} />
                <Bar dataKey="Present" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="Late" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="Absent" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
