import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { LogOut, Bell, Search, Menu, X, User, GraduationCap, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

export default function Navbar({ onMenuClick }) {
  const { logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allData, setAllData] = useState({ students: [], teachers: [] });

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const mockNotifications = [
    { id: 1, title: 'New Student Enrollment Processed', time: '10 mins ago', type: 'info', details: 'System successfully registered a new high school applicant.' },
    { id: 2, title: 'Nightly Database Backup Complete', time: '2 hours ago', type: 'success', details: 'No errors detected. 100% data integrity validated.' },
    { id: 3, title: 'Overdue Invoice Alert (Grade 10)', time: '5 hours ago', type: 'error', details: '3 pending invoices failed automated clearing.' },
  ];

  // Feed mock dataset for Global Search
  useEffect(() => {
    if (isSearchOpen) {
      const mockStudents = [
        { id: 'STU001', name: 'Emma Wilson', grade: '10th Grade', email: 'emma.w@example.com' },
        { id: 'STU002', name: 'James Thompson', grade: '11th Grade', email: 'j.thompson@example.com' },
        { id: 'STU003', name: 'Sophia Martinez', grade: '9th Grade', email: 'smartinez@example.com' },
        { id: 'STU004', name: 'Michael Chen', grade: '12th Grade', email: 'm.chen@example.com' },
        { id: 'STU005', name: 'Isabella Davis', grade: '10th Grade', email: 'i.davis@example.com' },
        { id: 'STU006', name: 'William Garcia', grade: '11th Grade', email: 'w.garcia@example.com' },
        { id: 'STU007', name: 'Olivia Rodriguez', grade: '9th Grade', email: 'o.rodriguez@example.com' },
        { id: 'STU008', name: 'Alexander Miller', grade: '12th Grade', email: 'a.miller@example.com' },
        { id: 'STU010', name: 'Ethan Moore', grade: '11th Grade', email: 'e.moore@example.com' },
        { id: 'STU015', name: 'Amelia White', grade: '9th Grade', email: 'a.white@example.com' },
        { id: 'STU020', name: 'David Martinez', grade: '12th Grade', email: 'd.martinez@example.com' },
        { id: 'STU025', name: 'Elizabeth Perez', grade: '10th Grade', email: 'e.perez@example.com' }
      ];
      const mockTeachers = [
        { id: 'TCH001', name: 'Dr. Sarah Connor', subject: 'Science', email: 's.connor@example.com' },
        { id: 'TCH002', name: 'Mr. David Smith', subject: 'Mathematics', email: 'd.smith@example.com' },
        { id: 'TCH003', name: 'Ms. Emily Chen', subject: 'Literature', email: 'e.chen@example.com' },
        { id: 'TCH004', name: 'Prof. Michael Johnson', subject: 'History', email: 'm.johnson@example.com' },
        { id: 'TCH005', name: 'Mrs. Jessica Brown', subject: 'Computer Science', email: 'j.brown@example.com' },
        { id: 'TCH006', name: 'Mr. Christopher Williams', subject: 'Physical Ed', email: 'c.williams@example.com' }
      ];
      setAllData({ students: mockStudents, teachers: mockTeachers });
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matchedStudents = allData.students.filter(s => s.name?.toLowerCase().includes(q)).map(s => ({ ...s, type: 'Student', path: '/students' }));
    const matchedTeachers = allData.teachers.filter(t => t.name?.toLowerCase().includes(q)).map(t => ({ ...t, type: 'Teacher', path: '/teachers' }));
    setSearchResults([...matchedStudents, ...matchedTeachers]);
  }, [searchQuery, allData]);

  const handleSearchResultClick = (path) => {
    setIsSearchOpen(false);
    navigate(path);
  };

  return (
    <>
      <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200/80 sticky top-0 z-10 w-full shadow-soft transition-all">
        <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-10">
          <div className="flex items-center flex-1 gap-2">
            <button 
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-brand-600 hover:bg-brand-50 active:scale-95 focus:outline-none transition-all shadow-sm border border-transparent hover:border-brand-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Search bar */}
            <div className="max-w-md w-full hidden sm:block relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              </div>
              <input
                readOnly
                onClick={() => setIsSearchOpen(true)}
                className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-100/50 text-slate-900 placeholder-slate-400 font-medium focus:outline-none hover:bg-white focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all sm:text-sm cursor-pointer"
                placeholder="Global Search (Teachers, Students...)"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-xs font-bold text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5 shadow-sm">⌘K</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Mobile Search Button */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="sm:hidden relative p-2.5 text-slate-400 hover:text-brand-600 transition-colors rounded-full hover:bg-brand-50 focus:outline-none active:scale-95"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <button 
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-2.5 text-slate-400 hover:text-emerald-600 transition-colors rounded-full hover:bg-emerald-50 focus:outline-none active:scale-95"
            >
              <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
              <Bell className="h-5 w-5" />
            </button>
            
            <div className="h-8 w-px bg-slate-200 hidden sm:block mx-1"></div>

            <button
              onClick={logout}
              className="group flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-extrabold rounded-xl text-slate-600 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all focus:outline-none active:scale-95 shadow-sm hover:shadow"
            >
              <LogOut className="w-5 h-5 sm:w-4 sm:h-4 text-slate-400 group-hover:text-red-500 transition-colors" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Global Search Modal overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 sm:pt-32 px-4 pb-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsSearchOpen(false)}></div>
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="flex items-center border-b border-slate-100 px-4 py-4 gap-3 bg-slate-50/50">
                <Search className="w-6 h-6 text-emerald-500" />
                <input 
                  autoFocus 
                  type="text" 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Ask anything... Try searching 'Smith' or 'James'..." 
                  className="w-full bg-transparent border-none outline-none text-lg font-bold text-slate-900 placeholder-slate-400"
                />
                <button onClick={() => setIsSearchOpen(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"><X className="w-5 h-5"/></button>
             </div>
             <div className="max-h-[60vh] overflow-y-auto w-full custom-scrollbar p-3">
                {searchQuery && searchResults.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 font-medium">No system records found matching "{searchQuery}"</div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-1">
                    <p className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-slate-400">Database Matches</p>
                    {searchResults.map((res, i) => (
                       <div key={i} onClick={() => handleSearchResultClick(res.path)} className="w-full text-left flex items-center justify-between p-3 hover:bg-emerald-50 rounded-xl cursor-pointer group transition-colors">
                          <div className="flex items-center gap-3">
                             <div className={`p-2 rounded-lg text-white font-bold shadow-sm ${res.type === 'Student' ? 'bg-indigo-500' : 'bg-amber-500'}`}>
                               {res.type === 'Student' ? <User className="w-5 h-5"/> : <GraduationCap className="w-5 h-5"/>}
                             </div>
                             <div>
                               <p className="font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">{res.name}</p>
                               <p className="text-xs font-semibold text-slate-500 mt-0.5">{res.type} Record • {res.email || res.subject}</p>
                             </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors mr-2" />
                       </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-400 font-bold flex flex-col items-center gap-3">
                     <Search className="w-10 h-10 text-slate-200" />
                     <p>Query the entire Dawa Secondary School database instantly.</p>
                  </div>
                )}
             </div>
             <div className="p-3 border-t border-slate-100 bg-slate-50/80 text-center text-xs font-bold text-slate-500">
                Press <kbd className="px-1.5 py-0.5 rounded border border-slate-200 bg-white">ESC</kbd> to close wrapper
             </div>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      <Modal isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} title="System Notifications">
        <div className="flex flex-col gap-3">
          {mockNotifications.map((notif) => (
             <div key={notif.id} className="p-4 border border-slate-200 rounded-2xl flex items-start justify-between gap-4 hover:bg-slate-50 cursor-pointer transition-colors group">
                <div>
                   <h4 className="font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">{notif.title}</h4>
                   <p className="text-sm font-medium text-slate-500 mt-1">{notif.details}</p>
                   <span className="text-xs font-bold text-slate-400 mt-3 inline-block bg-slate-100 px-2 py-1 rounded-md">{notif.time}</span>
                </div>
                {notif.type === 'info' ? <div className="p-1.5 bg-blue-100 rounded-full text-blue-600"><div className="w-2 h-2 rounded-full bg-blue-500"/></div> :
                 notif.type === 'success' ? <div className="p-1.5 bg-emerald-100 rounded-full text-emerald-600"><div className="w-2 h-2 rounded-full bg-emerald-500"/></div> :
                 <div className="p-1.5 bg-red-100 rounded-full text-red-600"><div className="w-2 h-2 rounded-full bg-red-500"/></div>}
             </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-center">
           <button onClick={() => { setIsNotificationsOpen(false); showToast('Inbox successfully marked as read.', 'success'); }} className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors">Mark all as read</button>
        </div>
      </Modal>
    </>
  );
}
