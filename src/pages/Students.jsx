import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, MoreVertical, Download, Mail, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import Modal from '../components/Modal';

export default function Students() {
  const { showToast } = useToast();
  const [students, setStudents] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', dob: '', admissionDate: '', grade: '10th Grade', section: 'A', email: '', phone: '', address: ''
  });
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    setTimeout(() => {
      setStudents([
        { id: 'STU001', name: 'Emma Wilson', grade: '10th Grade', section: 'A', email: 'emma.w@example.com', phone: '555-0101', status: 'Active' },
        { id: 'STU002', name: 'James Thompson', grade: '11th Grade', section: 'B', email: 'j.thompson@example.com', phone: '555-0102', status: 'Inactive' },
        { id: 'STU003', name: 'Sophia Martinez', grade: '9th Grade', section: 'C', email: 'smartinez@example.com', phone: '555-0103', status: 'Active' },
        { id: 'STU004', name: 'Michael Chen', grade: '12th Grade', section: 'A', email: 'm.chen@example.com', phone: '555-0104', status: 'Active' },
        { id: 'STU005', name: 'Isabella Davis', grade: '10th Grade', section: 'B', email: 'i.davis@example.com', phone: '555-0105', status: 'Active' },
        { id: 'STU006', name: 'William Garcia', grade: '11th Grade', section: 'A', email: 'w.garcia@example.com', phone: '555-0106', status: 'Active' },
        { id: 'STU007', name: 'Olivia Rodriguez', grade: '9th Grade', section: 'B', email: 'o.rodriguez@example.com', phone: '555-0107', status: 'Active' },
        { id: 'STU008', name: 'Alexander Miller', grade: '12th Grade', section: 'B', email: 'a.miller@example.com', phone: '555-0108', status: 'Inactive' },
        { id: 'STU009', name: 'Ava Hernandez', grade: '10th Grade', section: 'C', email: 'a.hernandez@example.com', phone: '555-0109', status: 'Active' },
        { id: 'STU010', name: 'Ethan Moore', grade: '11th Grade', section: 'C', email: 'e.moore@example.com', phone: '555-0110', status: 'Active' },
        { id: 'STU011', name: 'Mia Taylor', grade: '9th Grade', section: 'A', email: 'm.taylor@example.com', phone: '555-0111', status: 'Active' },
        { id: 'STU012', name: 'Benjamin Anderson', grade: '12th Grade', section: 'C', email: 'b.anderson@example.com', phone: '555-0112', status: 'Active' },
        { id: 'STU013', name: 'Charlotte Thomas', grade: '10th Grade', section: 'A', email: 'c.thomas@example.com', phone: '555-0113', status: 'Active' },
        { id: 'STU014', name: 'Daniel Jackson', grade: '11th Grade', section: 'B', email: 'd.jackson@example.com', phone: '555-0114', status: 'Inactive' },
        { id: 'STU015', name: 'Amelia White', grade: '9th Grade', section: 'C', email: 'a.white@example.com', phone: '555-0115', status: 'Active' },
        { id: 'STU016', name: 'Matthew Harris', grade: '12th Grade', section: 'A', email: 'm.harris@example.com', phone: '555-0116', status: 'Active' },
        { id: 'STU017', name: 'Harper Martin', grade: '10th Grade', section: 'C', email: 'h.martin@example.com', phone: '555-0117', status: 'Active' },
        { id: 'STU018', name: 'Joseph Thompson', grade: '11th Grade', section: 'A', email: 'j.thompson2@example.com', phone: '555-0118', status: 'Active' },
        { id: 'STU019', name: 'Evelyn Garcia', grade: '9th Grade', section: 'B', email: 'e.garcia@example.com', phone: '555-0119', status: 'Active' },
        { id: 'STU020', name: 'David Martinez', grade: '12th Grade', section: 'B', email: 'd.martinez@example.com', phone: '555-0120', status: 'Active' },
        { id: 'STU021', name: 'Abigail Robinson', grade: '10th Grade', section: 'A', email: 'a.robinson@example.com', phone: '555-0121', status: 'Inactive' },
        { id: 'STU022', name: 'Samuel Clark', grade: '11th Grade', section: 'C', email: 's.clark@example.com', phone: '555-0122', status: 'Active' },
        { id: 'STU023', name: 'Emily Rodriguez', grade: '9th Grade', section: 'A', email: 'e.rodriguez@example.com', phone: '555-0123', status: 'Active' },
        { id: 'STU024', name: 'Jackson Lee', grade: '12th Grade', section: 'C', email: 'j.lee@example.com', phone: '555-0124', status: 'Active' },
        { id: 'STU025', name: 'Elizabeth Perez', grade: '10th Grade', section: 'B', email: 'e.perez@example.com', phone: '555-0125', status: 'Active' }
      ]);
      setLoading(false);
    }, 600);
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return;
    
    const newStudentData = {
      ...formData,
      id: `STU00${Math.floor(Math.random() * 10) + 5}`,
      status: 'Active'
    };
    
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      setStudents([newStudentData, ...students]);
      setIsAddModalOpen(false);
      setFormData({ name: '', dob: '', admissionDate: '', grade: '10th Grade', section: 'A', email: '', phone: '', address: '' });
      showToast(`${formData.name} saved to the database.`, 'success');
    } catch (e) {
      showToast('Error saving to database.', 'error');
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    
    // Optimistic UI update
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      showToast(`Student status saved to ${newStatus}.`, 'info');
    } catch (e) {
      showToast('Database sync failed.', 'error');
      // Revert optimistic update on failure
      setStudents(prev => prev.map(s => s.id === id ? { ...s, status: currentStatus } : s));
    }
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) setSelectedIds(students.map(s => s.id));
    else setSelectedIds([]);
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Students Directory</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage all student records, enrollments, and profiles.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => showToast('Exporting student data from database...', 'info')}
            className="inline-flex items-center justify-center px-4 py-2 border border-slate-200 rounded-xl shadow-sm text-sm font-bold text-slate-600 bg-white hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95"
          >
            <Download className="w-4 h-4 mr-2 text-slate-400" />
            Export DB
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center justify-center px-5 py-2 border border-transparent rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] transition-all active:scale-[0.98]"
          >
            <Plus className="w-5 h-5 mr-1.5" />
            Create Student
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow-soft rounded-3xl border border-slate-100 overflow-hidden min-h-[500px] relative">
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-200 border-t-brand-600"></div>
          </div>
        )}
        
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
           <div className="relative max-w-sm w-full group">
             <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
               <Search className="h-4 w-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
             </div>
             <input
               className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all sm:text-sm shadow-sm"
               placeholder="Search records in DB..."
               type="search"
             />
           </div>
        </div>

        <div className="overflow-x-auto min-h-[400px] custom-scrollbar pb-2">
          <table className="w-full min-w-[900px] divide-y divide-slate-100 table-fixed">
            <thead className="bg-slate-50/80">
              <tr>
                <th scope="col" className="px-6 py-4 text-left w-10"><input type="checkbox" onChange={toggleSelectAll} className="rounded border-slate-300 text-brand-600 cursor-pointer w-4 h-4 focus:ring-brand-500" /></th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Student Profile</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Context</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Contact</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Database Record</th>
                <th scope="col" className="relative px-6 py-4"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-50">
              {students.map((person) => (
                <tr key={person.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <input type="checkbox" checked={selectedIds.includes(person.id)} onChange={() => toggleSelect(person.id)} className="rounded border-slate-300 text-brand-600 cursor-pointer w-4 h-4 opacity-0 group-hover:opacity-100 focus:ring-brand-500" />
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0 bg-gradient-to-tr from-brand-500 to-indigo-500 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-inner ring-4 ring-white group-hover:ring-slate-50 transition-all">
                        {person.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-extrabold text-slate-900 group-hover:text-brand-600 transition-colors">{person.name}</div>
                        <div className="text-xs font-semibold text-slate-400 mt-0.5 tracking-wider">UID: {person.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-700">{person.grade}</div>
                    <div className="text-xs font-semibold text-slate-400 mt-0.5">Section {person.section}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex flex-row text-xs font-semibold text-slate-500 items-center"><Mail className="w-3.5 h-3.5 mr-1.5 text-slate-400" />{person.email}</div>
                      <div className="flex flex-row text-xs font-semibold text-slate-500 items-center"><Phone className="w-3.5 h-3.5 mr-1.5 text-slate-400" />{person.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleStatus(person.id, person.status); }} 
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${person.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300 hover:bg-slate-400'}`}
                      >
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition-transform duration-300 ease-in-out ${person.status === 'Active' ? 'translate-x-5' : 'translate-x-0'}`}></span>
                      </button>
                      <span className={`text-xs font-black uppercase tracking-wider ${person.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>{person.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-slate-400 hover:text-brand-600 transition-colors p-1.5 opacity-0 group-hover:opacity-100 hover:bg-slate-100 rounded-lg">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register Record to DB">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div>
               <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Legal Full Name</label>
               <input type="text" autoFocus value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. John Doe" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-slate-50/50 outline-none transition-all shadow-sm font-semibold text-sm" required />
             </div>
             <div>
               <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Email Address</label>
               <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 bg-slate-50/50 outline-none shadow-sm font-semibold text-sm" required />
             </div>
             <div>
               <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Date of Birth</label>
               <input type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 bg-slate-50/50 outline-none shadow-sm font-semibold text-sm cursor-pointer" required />
             </div>
             <div>
               <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Admission Date</label>
               <input type="date" value={formData.admissionDate} onChange={e => setFormData({...formData, admissionDate: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 bg-slate-50/50 outline-none shadow-sm font-semibold text-sm cursor-pointer" required />
             </div>
             <div>
               <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Phone Number</label>
               <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+1 (555) 000-0000" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 bg-slate-50/50 outline-none shadow-sm font-semibold text-sm" required />
             </div>
             <div>
               <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Grade & Section</label>
               <div className="flex gap-2">
                 <select value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})} className="w-2/3 px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 font-semibold text-sm outline-none focus:ring-2 focus:ring-brand-500"><option>9th Grade</option><option>10th Grade</option><option>11th Grade</option><option>12th Grade</option></select>
                 <select value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} className="w-1/3 px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 font-semibold text-sm outline-none focus:ring-2 focus:ring-brand-500"><option>A</option><option>B</option><option>C</option></select>
               </div>
             </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider mt-2">Home Address</label>
            <textarea rows="2" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="123 Education Lane..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 bg-slate-50/50 outline-none shadow-sm font-semibold text-sm resize-none" required></textarea>
          </div>
          
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 mt-6">
             <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all">Cancel</button>
             <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] rounded-xl transition-all active:scale-95 flex items-center">Finalize Registration</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
