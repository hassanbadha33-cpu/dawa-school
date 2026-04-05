import React, { useState } from 'react';
import { Users, GraduationCap, School, TrendingUp, BookOpen, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Modal from '../components/Modal';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stats = [
  { name: 'Total Students', value: '1,245', change: '+12%', trend: 'up', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100/50' },
  { name: 'Total Teachers', value: '86', change: '+2%', trend: 'up', icon: GraduationCap, color: 'text-brand-600', bg: 'bg-brand-100/50' },
  { name: 'Total Classes', value: '42', change: '0%', trend: 'neutral', icon: School, color: 'text-indigo-600', bg: 'bg-indigo-100/50' },
  { name: 'Active Sessions', value: '24', change: '+18%', trend: 'up', icon: Clock, color: 'text-violet-600', bg: 'bg-violet-100/50' },
];

const yearlyChartData = {
  '2026': [
    { name: 'Jan', students: 1350 }, { name: 'Feb', students: 1420 }, { name: 'Mar', students: 1510 },
    { name: 'Apr', students: 1680 }, { name: 'May', students: 1750 }, { name: 'Jun', students: 1800 },
    { name: 'Jul', students: 1950 }, { name: 'Aug', students: 2100 }, { name: 'Sep', students: 2250 },
    { name: 'Oct', students: 2400 }, { name: 'Nov', students: 2350 }, { name: 'Dec', students: 2500 },
  ],
  '2025': [
    { name: 'Jan', students: 950 }, { name: 'Feb', students: 1000 }, { name: 'Mar', students: 1050 },
    { name: 'Apr', students: 1100 }, { name: 'May', students: 1150 }, { name: 'Jun', students: 1200 },
    { name: 'Jul', students: 1250 }, { name: 'Aug', students: 1300 }, { name: 'Sep', students: 1350 },
    { name: 'Oct', students: 1400 }, { name: 'Nov', students: 1450 }, { name: 'Dec', students: 1500 },
  ],
  '2024': [
    { name: 'Jan', students: 400 }, { name: 'Feb', students: 500 }, { name: 'Mar', students: 450 },
    { name: 'Apr', students: 600 }, { name: 'May', students: 580 }, { name: 'Jun', students: 700 },
    { name: 'Jul', students: 800 }, { name: 'Aug', students: 780 }, { name: 'Sep', students: 950 },
    { name: 'Oct', students: 1100 }, { name: 'Nov', students: 1050 }, { name: 'Dec', students: 1245 },
  ],
  '2023': [
    { name: 'Jan', students: 200 }, { name: 'Feb', students: 220 }, { name: 'Mar', students: 250 },
    { name: 'Apr', students: 280 }, { name: 'May', students: 300 }, { name: 'Jun', students: 330 },
    { name: 'Jul', students: 350 }, { name: 'Aug', students: 370 }, { name: 'Sep', students: 380 },
    { name: 'Oct', students: 400 }, { name: 'Nov', students: 420 }, { name: 'Dec', students: 450 },
  ]
};

const CustomTooltip = ({ active, payload, label, selectedYear }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 shadow-2xl rounded-2xl p-4 text-white border border-slate-700 animate-in zoom-in-95 duration-200">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label} {selectedYear}</p>
        <p className="text-xl font-black text-brand-400">
          {payload[0].value} <span className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Registrations</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2026');
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Analytics 👋</h1>
          <p className="text-slate-500 mt-1 font-medium">Live institution data, enrollments, and growth metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-sm font-semibold text-slate-500 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-200/80">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </span>
          <button 
            onClick={() => showToast('Generating custom intelligence report. Check downloads.', 'info')}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl shadow-[0_4px_14px_0_rgba(15,23,42,0.39)] hover:bg-slate-800 transition-all font-bold flex items-center gap-2 text-sm active:scale-[0.98]"
          >
            Generate Report
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className="relative bg-white overflow-hidden shadow-soft hover:shadow-xl hover:shadow-brand-500/10 rounded-3xl border border-slate-100 p-6 flex flex-col transition-all duration-300 group cursor-pointer z-10 w-full">
              <div className="flex items-center justify-between z-10">
                <div className={`p-3 rounded-2xl ${item.bg} backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
                </div>
                <div className={`flex items-baseline text-sm font-bold ${item.trend === 'up' ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {item.trend === 'up' && <TrendingUp className="self-center flex-shrink-0 h-4 w-4 mr-1" aria-hidden="true" />}
                  {item.change}
                </div>
              </div>
              <div className="mt-8 z-10">
                <p className="text-4xl font-extrabold text-slate-900 tracking-tight">{item.value}</p>
                <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-widest">{item.name}</p>
              </div>
              {/* Decorative background element */}
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-white shadow-soft rounded-3xl border border-slate-100 p-6 sm:p-8 relative group hover:shadow-xl transition-shadow duration-300 flex flex-col w-full min-h-[400px]">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Growth Analytics</h2>
              <p className="text-sm text-slate-500 font-medium mt-1">Monthly student registrations analyzed securely via Recharts</p>
            </div>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-brand-500 focus:border-brand-500 block p-2.5 font-bold outline-none cursor-pointer transition-colors hover:bg-slate-100">
              <option value="2026">Academic Year 2026</option>
              <option value="2025">Academic Year 2025</option>
              <option value="2024">Academic Year 2024</option>
              <option value="2023">Academic Year 2023</option>
            </select>
          </div>
          
          <div className="flex-1 w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yearlyChartData[selectedYear]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                <Tooltip content={<CustomTooltip selectedYear={selectedYear} />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '3 3' }} />
                <Area type="monotone" dataKey="students" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorStudents)" activeDot={{r: 6, strokeWidth: 3, stroke: '#fff', className: "shadow-xl"}} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity List */}
        <div className="bg-white shadow-soft rounded-3xl border border-slate-100 p-6 sm:p-8 flex flex-col hover:shadow-xl transition-shadow duration-300 w-full min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Activity Log</h2>
            <button 
              onClick={() => setIsLogModalOpen(true)}
              className="text-brand-600 hover:text-brand-800 text-sm font-bold transition-colors bg-brand-50 px-3 py-1.5 rounded-lg active:scale-95"
            >
              View deep logic
            </button>
          </div>
          
          <div className="flex-1 overflow-hidden relative">
            <div className="absolute inset-0 overflow-y-auto pr-2 custom-scrollbar space-y-4">
              {[
                { time: '2h ago', title: 'DB Insert', desc: 'New student schema created', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-100/50' },
                { time: '4h ago', title: 'Payment received', desc: '$1,200 synced from Stripe API', icon: TrendingUp, color: 'text-brand-500', bg: 'bg-brand-100/50' },
                { time: '5h ago', title: 'PUT operation', desc: 'Classes parameters modified', icon: BookOpen, color: 'text-amber-500', bg: 'bg-amber-100/50' },
                { time: '1d ago', title: 'JWT generated', desc: 'Secure session established', icon: ShieldCheck, color: 'text-slate-500', bg: 'bg-slate-100' },
              ].map((act, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer hover:bg-slate-50 p-3 -mx-3 rounded-2xl transition-all duration-200">
                  <div className={`mt-0.5 p-2 rounded-xl h-10 w-10 flex items-center justify-center flex-shrink-0 ${act.bg} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <act.icon className={`h-5 w-5 ${act.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{act.title}</p>
                    <p className="text-sm font-medium text-slate-500 mt-0.5 line-clamp-1">{act.desc}</p>
                    <p className="text-xs font-bold text-slate-400 mt-2 flex items-center gap-1.5 uppercase tracking-wider">
                      <Clock className="w-3.5 h-3.5" /> {act.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isLogModalOpen} onClose={() => setIsLogModalOpen(false)} title="System Activity & Deep Logs">
         <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="min-w-full divide-y divide-slate-100 table-fixed">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-5 py-3.5 text-left text-xs font-black text-slate-500 uppercase tracking-widest w-1/4">Timestamp</th>
                    <th className="px-5 py-3.5 text-left text-xs font-black text-slate-500 uppercase tracking-widest w-1/6">Domain</th>
                    <th className="px-5 py-3.5 text-left text-xs font-black text-slate-500 uppercase tracking-widest w-auto">Event Payload</th>
                    <th className="px-5 py-3.5 text-left text-xs font-black text-slate-500 uppercase tracking-widest w-1/6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                  <tr className="hover:bg-slate-50/80 transition-colors"><td className="px-5 py-4 text-slate-500">10:15:22 AM</td><td className="px-5 py-4 font-bold text-indigo-600">CRON</td><td className="px-5 py-4 text-slate-900">Triggered daily database backup</td><td className="px-5 py-4"><span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">Success</span></td></tr>
                  <tr className="hover:bg-slate-50/80 transition-colors"><td className="px-5 py-4 text-slate-500">10:45:01 AM</td><td className="px-5 py-4 font-bold text-brand-600">AUTH</td><td className="px-5 py-4 text-slate-900">Admin session token validated</td><td className="px-5 py-4"><span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">Success</span></td></tr>
                  <tr className="hover:bg-slate-50/80 transition-colors"><td className="px-5 py-4 text-slate-500">11:00:23 AM</td><td className="px-5 py-4 font-bold text-blue-600">DB</td><td className="px-5 py-4 text-slate-900">Injected 40 students accurately</td><td className="px-5 py-4"><span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">Info</span></td></tr>
                  <tr className="hover:bg-slate-50/80 transition-colors"><td className="px-5 py-4 text-slate-500">11:22:15 AM</td><td className="px-5 py-4 font-bold text-amber-600">NET</td><td className="px-5 py-4 text-slate-900">High latency detected on socket</td><td className="px-5 py-4"><span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">Warn</span></td></tr>
                  <tr className="hover:bg-slate-50/80 transition-colors"><td className="px-5 py-4 text-slate-500">12:00:00 PM</td><td className="px-5 py-4 font-bold text-slate-600">SYS</td><td className="px-5 py-4 text-slate-900">Firing cleanup worker for tmp/</td><td className="px-5 py-4"><span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">Success</span></td></tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-end pt-2">
               <button onClick={() => setIsLogModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] active:scale-95">Close Audit Log</button>
            </div>
         </div>
      </Modal>
    </div>
  );
}
