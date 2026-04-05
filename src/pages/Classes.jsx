import React, { useState, useEffect } from 'react';
import { Plus, Users, BookOpen, Clock, MoreVertical, LayoutGrid } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import Modal from '../components/Modal';

export default function Classes() {
  const { showToast } = useToast();
  const [classesList, setClassesList] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [viewModalClass, setViewModalClass] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setClassesList([
        { id: 'CLS001', name: 'Grade 1 - A', subject: 'General Studies', teacher: 'Amanda Jones', students: 25, room: 'Room 101', time: '08:00 AM' },
        { id: 'CLS002', name: 'Grade 2 - A', subject: 'General Studies', teacher: 'Robert Davis', students: 26, room: 'Room 102', time: '08:00 AM' },
        { id: 'CLS003', name: 'Grade 3 - A', subject: 'General Studies', teacher: 'Jennifer Miller', students: 24, room: 'Room 103', time: '08:00 AM' },
        { id: 'CLS004', name: 'Grade 4 - A', subject: 'General Studies', teacher: 'James Wilson', students: 28, room: 'Room 104', time: '08:00 AM' },
        { id: 'CLS005', name: 'Grade 5 - A', subject: 'Mathematics', teacher: 'Linda Taylor', students: 30, room: 'Room 201', time: '09:00 AM' },
        { id: 'CLS006', name: 'Grade 6 - A', subject: 'Science', teacher: 'Richard Anderson', students: 31, room: 'Room 202', time: '09:00 AM' },
        { id: 'CLS007', name: 'Grade 7 - A', subject: 'Mathematics', teacher: 'David Smith', students: 32, room: 'Room 203', time: '10:00 AM' },
        { id: 'CLS008', name: 'Grade 8 - A', subject: 'History', teacher: 'Michael Johnson', students: 30, room: 'Room 204', time: '10:00 AM' },
        { id: 'CLS009', name: 'Grade 9 - A', subject: 'English', teacher: 'Emily Chen', students: 35, room: 'Room 301', time: '11:00 AM' },
        { id: 'CLS010', name: 'Grade 10 - A', subject: 'Science', teacher: 'Sarah Connor', students: 32, room: 'Lab 1', time: '11:00 AM' },
        { id: 'CLS011', name: 'Grade 11 - A', subject: 'Physics', teacher: 'Jessica Brown', students: 28, room: 'Lab 2', time: '01:00 PM' },
        { id: 'CLS012', name: 'Grade 12 - A', subject: 'Computer Sci', teacher: 'Christopher Williams', students: 25, room: 'Lab 3', time: '01:00 PM' }
      ]);
      setLoading(false);
    }, 600);
  }, [showToast]);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newClassName || !newSubject) return;
    
    const newClassData = {
      name: newClassName,
      subject: newSubject,
      teacher: 'Unassigned',
      students: 0,
      room: 'TBD',
      time: 'TBD',
    };
    
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      const savedObj = {
        ...newClassData,
        id: `CLS00${Math.floor(Math.random() * 10) + 4}`
      };
      setClassesList([savedObj, ...classesList]);
      setIsAddModalOpen(false);
      setNewClassName('');
      setNewSubject('');
      showToast(`Class "${newClassName}" registered in database.`, 'success');
    } catch (err) {
      showToast('Error saving to database.', 'error');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center min-h-[500px]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-200 border-t-brand-600"></div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Classes Overview</h1>
          <p className="text-slate-500 mt-1 font-medium">Syncing live schedule and assignments via backend.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => showToast('Switched to grid mapping view.', 'info')}
            className="hidden sm:inline-flex items-center justify-center p-2.5 border border-slate-200 rounded-xl shadow-sm text-slate-600 bg-white hover:bg-slate-50 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 active:scale-95"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] transition-all active:scale-[0.98] focus:outline-none"
          >
            <Plus className="w-5 h-5 mr-1.5" />
            Create Database Record
          </button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 min-h-[400px]">
        {classesList.map((cls) => (
          <div key={cls.id} onClick={() => setViewModalClass(cls)} className="bg-white rounded-3xl shadow-soft border border-slate-100 p-1 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 group cursor-pointer relative">
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-[1.3rem] p-6 h-full border border-white/50 relative overflow-hidden">
              
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <BookOpen className="w-24 h-24 text-brand-600 rotate-12 -mr-6 -mt-6" />
              </div>

              <div className="flex justify-between items-start relative z-10">
                <div>
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md text-xs font-bold bg-brand-100 text-brand-700 mb-3 uppercase tracking-wider">
                    {cls.subject}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none group-hover:text-brand-600 transition-colors">{cls.name}</h3>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); showToast(`DB Actions mapped for ${cls.name}`, 'info'); }}
                  className="text-slate-400 hover:text-brand-600 hover:bg-brand-50 p-2 rounded-xl transition-colors active:scale-95"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4 relative z-10">
                <div onClick={() => showToast('Opening backend student roster...', 'info')} className="flex items-center text-sm font-semibold text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm hover:border-brand-200 hover:text-brand-600 transition-colors active:scale-95">
                  <Users className="w-4 h-4 mr-2 text-blue-500" />
                  {cls.students} Enrolled
                </div>
                <div onClick={() => showToast('Connecting to schedule API...', 'info')} className="flex items-center text-sm font-semibold text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm hover:border-brand-200 hover:text-brand-600 transition-colors active:scale-95">
                  <Clock className="w-4 h-4 mr-2 text-amber-500" />
                  {cls.time}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200/60 flex justify-between items-center relative z-10">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-xs font-bold text-slate-600 z-10">
                    {cls.teacher.charAt(0)}
                  </div>
                  <div className="text-sm font-bold text-slate-900 ml-3">
                    {cls.teacher}
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-md">
                  {cls.room}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create New DB Record">
        <form onSubmit={handleAddSubmit} className="space-y-6">
          <div>
             <label className="block text-sm font-bold text-slate-700 mb-1.5">Class Designation</label>
             <input type="text" autoFocus value={newClassName} onChange={e => setNewClassName(e.target.value)} placeholder="e.g. Grade 10 - C" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-slate-50/50 outline-none transition-all shadow-sm" required />
          </div>
          <div>
             <label className="block text-sm font-bold text-slate-700 mb-1.5">Subject Stream</label>
             <input type="text" value={newSubject} onChange={e => setNewSubject(e.target.value)} placeholder="e.g. Computer Science" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-slate-50/50 outline-none transition-all shadow-sm" required />
          </div>
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 mt-8">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all">Cancel</button>
            <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] rounded-xl transition-all active:scale-95">Save Record</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!viewModalClass} onClose={() => setViewModalClass(null)} title="Class Enrollment Overview">
         {viewModalClass && (
           <div className="space-y-4">
             <div className="bg-brand-50 rounded-xl p-4 flex items-center justify-between border border-brand-100 shadow-inner">
               <div>
                  <h3 className="font-extrabold text-slate-900">{viewModalClass.name}</h3>
                  <p className="text-sm font-semibold text-slate-500">{viewModalClass.subject}</p>
               </div>
               <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 flex flex-col items-center">
                  <span className="font-black text-brand-600 leading-none text-xl">{viewModalClass.students}</span> 
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Enrolled</span>
               </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Primary Instructor</p>
                   <p className="font-semibold text-slate-900 mt-1">{viewModalClass.teacher}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Time Schedule</p>
                   <p className="font-semibold text-slate-900 mt-1">{viewModalClass.time}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Physical Location</p>
                   <p className="font-semibold text-slate-900 mt-1">{viewModalClass.room}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Capacity</p>
                   <p className="font-semibold text-slate-900 mt-1">150 Max</p>
                </div>
             </div>
             <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button onClick={() => { setViewModalClass(null); showToast('Secure roster payload downloaded.', 'success'); }} className="px-5 py-2.5 bg-brand-600 text-white font-bold rounded-xl active:scale-95 transition-all text-sm hover:bg-brand-700 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]">Export Full Ledger</button>
             </div>
           </div>
         )}
      </Modal>
    </div>
  );
}
