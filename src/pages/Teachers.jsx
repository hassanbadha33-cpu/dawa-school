import React, { useState, useEffect } from 'react';
import { Search, Plus, Mail, MessageSquare, MoreHorizontal } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import Modal from '../components/Modal';

export default function Teachers() {
  const { showToast } = useToast();
  const [teachers, setTeachers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', subject: 'Mathematics', qualification: '', experience: '', email: '', phone: '', address: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTeachers([
        { id: 'TCH001', name: 'Dr. Sarah Connor', subject: 'Science', email: 's.connor@example.com', phone: '555-0201', role: 'Head of Dept' },
        { id: 'TCH002', name: 'Mr. David Smith', subject: 'Mathematics', email: 'd.smith@example.com', phone: '555-0202', role: 'Faculty' },
        { id: 'TCH003', name: 'Ms. Emily Chen', subject: 'Literature', email: 'e.chen@example.com', phone: '555-0203', role: 'Faculty' },
        { id: 'TCH004', name: 'Prof. Michael Johnson', subject: 'History', email: 'm.johnson@example.com', phone: '555-0204', role: 'Head of Dept' },
        { id: 'TCH005', name: 'Mrs. Jessica Brown', subject: 'Computer Science', email: 'j.brown@example.com', phone: '555-0205', role: 'Faculty' },
        { id: 'TCH006', name: 'Mr. Christopher Williams', subject: 'Physical Ed', email: 'c.williams@example.com', phone: '555-0206', role: 'Coach' },
        { id: 'TCH007', name: 'Dr. Amanda Jones', subject: 'Science', email: 'a.jones@example.com', phone: '555-0207', role: 'Faculty' },
        { id: 'TCH008', name: 'Mr. Robert Davis', subject: 'Mathematics', email: 'r.davis@example.com', phone: '555-0208', role: 'Faculty' },
        { id: 'TCH009', name: 'Ms. Jennifer Miller', subject: 'Literature', email: 'j.miller@example.com', phone: '555-0209', role: 'Faculty' },
        { id: 'TCH010', name: 'Mr. James Wilson', subject: 'History', email: 'j.wilson@example.com', phone: '555-0210', role: 'Faculty' },
        { id: 'TCH011', name: 'Mrs. Linda Taylor', subject: 'Computer Science', email: 'l.taylor@example.com', phone: '555-0211', role: 'Faculty' },
        { id: 'TCH012', name: 'Mr. Richard Anderson', subject: 'Physical Ed', email: 'r.anderson@example.com', phone: '555-0212', role: 'Coach' }
      ]);
      setLoading(false);
    }, 600);
  }, [showToast]);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return;
    
    const newTeacherData = {
      ...formData,
      role: 'Faculty',
      classes: 0
    };
    
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      const savedObj = {
        ...newTeacherData,
        id: `TCH00${Math.floor(Math.random() * 10) + 4}`
      };
      setTeachers([savedObj, ...teachers]);
      setIsAddModalOpen(false);
      setFormData({ name: '', subject: 'Mathematics', qualification: '', experience: '', email: '', phone: '', address: '' });
      showToast(`Faculty member ${formData.name} registered.`, 'success');
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
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Teachers Directory</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage faculty members via the live database.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block group">
             <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
               <Search className="h-4 w-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
             </div>
             <input
               className="block w-64 pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all sm:text-sm shadow-sm"
               placeholder="Search faculty in DB..."
               type="search"
             />
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] transition-all active:scale-[0.98] focus:outline-none"
          >
            <Plus className="w-5 h-5 mr-1.5" />
            Add Teacher
          </button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-h-[400px]">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-3xl shadow-soft border border-slate-100 p-6 flex flex-col items-center hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 group relative overflow-hidden cursor-default">
            <div 
              onClick={() => showToast(`Options panel for ${teacher.name} opened.`, 'info')}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer opacity-0 group-hover:opacity-100 transition-all"
            >
               <MoreHorizontal className="w-5 h-5" />
            </div>
            
            <div className="h-24 w-24 bg-gradient-to-br from-brand-100 to-indigo-100 text-brand-600 rounded-[2rem] flex items-center justify-center text-4xl font-black mb-5 shadow-inner ring-4 ring-slate-50 group-hover:-translate-y-1 transition-transform duration-300">
              {teacher.name.charAt(0)}
            </div>
            
            <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-brand-600 transition-colors cursor-pointer text-center">{teacher.name}</h3>
            <span className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold leading-5 bg-brand-50 text-brand-700 border border-brand-100/50">
              {teacher.role}
            </span>
            
            <div className="w-full mt-6 space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-semibold">Department</span>
                <span className="text-slate-900 font-extrabold">{teacher.subject}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-semibold">Database ID</span>
                <span className="text-brand-600 font-extrabold tracking-wider bg-brand-50 px-2 py-0.5 rounded-md text-xs">{teacher.id}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3 w-full">
              <button 
                onClick={() => showToast(`Opening secure chat pipeline with ${teacher.name}...`, 'info')}
                className="flex-1 bg-white border border-slate-200 shadow-sm rounded-xl py-2.5 flex items-center justify-center text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-600 hover:border-brand-200 transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat
              </button>
              <button 
                onClick={() => showToast(`Preparing SMTP email to ${teacher.email}...`, 'info')}
                className="flex-1 bg-brand-50 border border-transparent rounded-xl py-2.5 flex items-center justify-center text-sm font-bold text-brand-700 hover:bg-brand-100 transition-all active:scale-95"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register Faculty to DB">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div>
               <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Legal Full Name</label>
               <input type="text" autoFocus value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Samuel Jackson" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 bg-slate-50/50 outline-none transition-all shadow-sm font-semibold text-sm" required />
             </div>
             <div>
               <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Department</label>
               <select value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 bg-slate-50/50 outline-none transition-all shadow-sm font-semibold text-sm"><option>Mathematics</option><option>Science</option><option>History</option><option>Literature</option><option>Computer Science</option><option>Physical Ed</option></select>
             </div>
             <div><label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Qualifications</label><input type="text" value={formData.qualification} onChange={e => setFormData({...formData, qualification: e.target.value})} placeholder="e.g. M.Sc. Math" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 bg-slate-50/50 outline-none transition-all shadow-sm font-semibold text-sm" required /></div>
             <div><label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Years Exp.</label><input type="number" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} placeholder="e.g. 5" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 bg-slate-50/50 outline-none transition-all shadow-sm font-semibold text-sm" required /></div>
             <div><label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Email Address</label><input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="samuel@example.com" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 bg-slate-50/50 outline-none transition-all shadow-sm font-semibold text-sm" required /></div>
             <div><label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Phone Number</label><input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+1 (555) 000-0000" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 bg-slate-50/50 outline-none transition-all shadow-sm font-semibold text-sm" required /></div>
          </div>
          <div><label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider mt-2">Home Address</label><textarea rows="2" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 bg-slate-50/50 outline-none transition-all shadow-sm font-semibold text-sm resize-none" required></textarea></div>
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 mt-8">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all">Cancel</button>
            <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] rounded-xl transition-all active:scale-95">Save Faculty</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
