import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, UserCheck, UserX, Clock, Filter, Search, Download } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Attendance() {
  const { showToast } = useToast();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setTimeout(() => {
      if (!active) return;
      const data = [
        { id: 'STU001', name: 'Emma Wilson', grade: '10th Grade', status: 'Active' },
        { id: 'STU002', name: 'James Thompson', grade: '11th Grade', status: 'Inactive' },
        { id: 'STU003', name: 'Sophia Martinez', grade: '9th Grade', status: 'Active' },
        { id: 'STU004', name: 'Michael Chen', grade: '12th Grade', status: 'Active' },
        { id: 'STU005', name: 'Isabella Davis', grade: '10th Grade', status: 'Active' },
        { id: 'STU006', name: 'William Garcia', grade: '11th Grade', status: 'Active' },
        { id: 'STU007', name: 'Olivia Rodriguez', grade: '9th Grade', status: 'Active' },
        { id: 'STU008', name: 'Alexander Miller', grade: '12th Grade', status: 'Inactive' },
        { id: 'STU009', name: 'Ava Hernandez', grade: '10th Grade', status: 'Active' },
        { id: 'STU010', name: 'Ethan Moore', grade: '11th Grade', status: 'Active' },
        { id: 'STU011', name: 'Mia Taylor', grade: '9th Grade', status: 'Active' },
        { id: 'STU012', name: 'Benjamin Anderson', grade: '12th Grade', status: 'Active' },
        { id: 'STU013', name: 'Charlotte Thomas', grade: '10th Grade', status: 'Active' },
        { id: 'STU014', name: 'Daniel Jackson', grade: '11th Grade', status: 'Inactive' },
        { id: 'STU015', name: 'Amelia White', grade: '9th Grade', status: 'Active' },
        { id: 'STU016', name: 'Matthew Harris', grade: '12th Grade', status: 'Active' },
        { id: 'STU017', name: 'Harper Martin', grade: '10th Grade', status: 'Active' },
        { id: 'STU018', name: 'Joseph Thompson', grade: '11th Grade', status: 'Active' },
        { id: 'STU019', name: 'Evelyn Garcia', grade: '9th Grade', status: 'Active' },
        { id: 'STU020', name: 'David Martinez', grade: '12th Grade', status: 'Active' },
        { id: 'STU021', name: 'Abigail Robinson', grade: '10th Grade', status: 'Inactive' },
        { id: 'STU022', name: 'Samuel Clark', grade: '11th Grade', status: 'Active' },
        { id: 'STU023', name: 'Emily Rodriguez', grade: '9th Grade', status: 'Active' },
        { id: 'STU024', name: 'Jackson Lee', grade: '12th Grade', status: 'Active' },
        { id: 'STU025', name: 'Elizabeth Perez', grade: '10th Grade', status: 'Active' }
      ];
      const attendedStudents = data.map(s => ({ ...s, status: s.status === 'Inactive' ? 'Absent' : 'Present' }));
      setStudents(attendedStudents);
      setLoading(false);
    }, 600);
    return () => { active = false; };
  }, []);

  const stats = {
    present: students.filter((s) => s.status === 'Present').length,
    absent: students.filter((s) => s.status === 'Absent').length,
    late: students.filter((s) => s.status === 'Late').length,
    total: students.length,
  };

  const toggleAttendanceStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'Present' ? 'Late' : currentStatus === 'Late' ? 'Absent' : 'Present';
    setStudents(students.map((s) => (s.id === id ? { ...s, status: nextStatus } : s)));
  };

  const markAll = (status) => {
    setStudents(students.map((s) => ({ ...s, status })));
    showToast(`All students marked as ${status}.`, 'success');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 min-h-screen relative">
      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center min-h-[500px]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-600"></div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Attendance Register</h1>
          <p className="text-slate-500 mt-1 font-medium">Record and analyze daily classroom attendance interactively.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 hover:bg-slate-50 shadow-sm transition-colors cursor-pointer group">
            <CalendarIcon className="w-5 h-5 text-emerald-600 mr-2" />
            <input 
              type="date" 
              className="bg-transparent border-none text-sm font-bold text-slate-700 focus:outline-none focus:ring-0 cursor-pointer"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button onClick={() => showToast('Exporting attendance report...', 'info')} className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm flex items-center group active:scale-95">
             <Download className="w-4 h-4 mr-2 text-slate-400 group-hover:text-slate-600"/> Log
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft hover:shadow-xl transition-shadow flex items-center gap-5 cursor-pointer" onClick={() => markAll('Present')}>
           <div className="h-14 w-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center"><UserCheck className="w-7 h-7"/></div>
           <div><p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Present</p><p className="text-3xl font-black text-slate-900">{stats.present}</p></div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft hover:shadow-xl transition-shadow flex items-center gap-5 cursor-pointer" onClick={() => markAll('Absent')}>
           <div className="h-14 w-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center"><UserX className="w-7 h-7"/></div>
           <div><p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Absent</p><p className="text-3xl font-black text-slate-900">{stats.absent}</p></div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft hover:shadow-xl transition-shadow flex items-center gap-5 cursor-pointer" onClick={() => markAll('Late')}>
           <div className="h-14 w-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center"><Clock className="w-7 h-7"/></div>
           <div><p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Late</p><p className="text-3xl font-black text-slate-900">{stats.late}</p></div>
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
               placeholder="Search class register..."
               type="search"
             />
           </div>
           
           <button 
             onClick={() => showToast('Attendance Filters menu opened.', 'info')}
             className="inline-flex items-center justify-center px-4 py-2.5 border border-slate-200 rounded-xl shadow-sm text-sm font-bold text-slate-600 bg-white hover:bg-slate-50 transition-all active:scale-95"
           >
             <Filter className="w-4 h-4 mr-2 text-slate-400" />
             Filters
           </button>
        </div>

        <div className="overflow-x-auto min-h-[400px] custom-scrollbar pb-2">
          <table className="w-full min-w-[900px] divide-y divide-slate-100 table-fixed">
            <thead className="bg-slate-50/80">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Student Information</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Time Registered</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Current Status</th>
                <th scope="col" className="relative px-6 py-4"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-50">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-tr from-brand-400 to-indigo-500 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-inner ring-2 ring-white group-hover:ring-slate-50 transition-all">
                        {student.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-extrabold text-slate-900">{student.name}</div>
                        <div className="text-xs font-bold text-slate-400 mt-0.5">{student.grade}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-500">08:00 AM</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <button 
                      onClick={() => toggleAttendanceStatus(student.id, student.status)}
                      className={`px-3 py-1.5 inline-flex text-xs font-bold rounded-lg border shadow-sm uppercase tracking-wider cursor-pointer active:scale-95 transition-all ${
                        student.status === 'Present' ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60 hover:bg-emerald-100' : 
                        student.status === 'Late' ? 'bg-amber-50 text-amber-700 border-amber-200/60 hover:bg-amber-100' : 
                        'bg-red-50 text-red-700 border-red-200/60 hover:bg-red-100'
                      }`}
                    >
                      {student.status}
                    </button>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => toggleAttendanceStatus(student.id, student.status)} className="text-slate-400 hover:text-brand-600 transition-colors bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg active:scale-95 font-bold text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 border border-slate-200">
                      Toggle Status
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
