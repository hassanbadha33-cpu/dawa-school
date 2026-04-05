import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Users, LayoutDashboard, GraduationCap, School, CalendarCheck, Settings, HelpCircle, BookOpen, Shield, Bell, Key, LifeBuoy, Mail, MessageSquare, Wallet, BarChart3, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Modal from './Modal';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Students', href: '/students', icon: Users },
  { name: 'Teachers', href: '/teachers', icon: GraduationCap },
  { name: 'Classes', href: '/classes', icon: School },
  { name: 'Attendance', href: '/attendance', icon: CalendarCheck },
  { name: 'Fees & Payments', href: '/fees', icon: Wallet },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Enterprise Yellow-Green Sidebar Redesign */}
      <div className={`flex flex-col w-72 bg-gradient-to-br from-[#f8faf7] to-[#ecfdf5] backdrop-blur-2xl border-r border-emerald-100/60 h-screen fixed left-0 top-0 shadow-[4px_0_24px_rgba(16,185,129,0.05)] z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between h-20 px-6 border-b border-emerald-100/60 bg-white/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-yellow-400 to-emerald-500 rounded-xl shadow-[0_4px_14px_0_rgba(16,185,129,0.39)]">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-slate-900 text-xl xl:text-2xl font-black tracking-tight">Dawa <span className="text-emerald-600">Secondary</span></span>
          </div>
          
          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 focus:outline-none transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-8 px-4 flex flex-col justify-between custom-scrollbar">
          <nav className="space-y-1.5">
            <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Main Menu</p>
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `group flex items-center px-4 py-3.5 text-sm font-extrabold rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-white shadow-soft text-emerald-700 border border-emerald-100/50 relative transform scale-[1.02]'
                        : 'text-slate-500 hover:bg-emerald-50/60 hover:text-emerald-800 border border-transparent'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-gradient-to-b from-yellow-400 to-emerald-500 rounded-r-full shadow-sm" />
                      )}
                      <Icon className={`mr-3.5 flex-shrink-0 h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${
                        isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-emerald-500'
                      }`} aria-hidden="true" />
                      {item.name}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
          
          <div className="mt-12">
            <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Preferences</p>
            <nav className="space-y-1.5">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="w-full text-left group flex items-center px-4 py-3 text-sm font-bold rounded-xl text-slate-500 hover:bg-emerald-50/60 hover:text-emerald-800 transition-all duration-200"
              >
                <Settings className="mr-3.5 flex-shrink-0 h-5 w-5 text-slate-400 group-hover:text-emerald-500 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
                Settings & Configuration
              </button>
              
              <button
                onClick={() => setIsHelpOpen(true)}
                className="w-full text-left group flex items-center px-4 py-3 text-sm font-bold rounded-xl text-slate-500 hover:bg-emerald-50/60 hover:text-emerald-800 transition-all duration-200"
              >
                <HelpCircle className="mr-3.5 flex-shrink-0 h-5 w-5 text-slate-400 group-hover:text-emerald-500 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
                Help & Support
              </button>
              
              <button
                onClick={() => {
                  showToast('Terminating session securely...', 'info');
                  setTimeout(logout, 800);
                }}
                className="w-full text-left group flex items-center px-4 py-3 text-sm font-bold rounded-xl text-red-500 hover:bg-red-50/60 hover:text-red-700 transition-all duration-200 mt-2 border border-red-100/50 hover:border-red-200"
              >
                <Key className="mr-3.5 flex-shrink-0 h-5 w-5 text-red-400 group-hover:text-red-600 transition-transform duration-300" aria-hidden="true" />
                Secure Logout
              </button>
            </nav>

            <div 
               onClick={() => setIsSettingsOpen(true)}
               className="mt-8 p-4 bg-white/60 rounded-2xl border border-emerald-100/50 flex items-center gap-4 hover:shadow-soft hover:bg-white cursor-pointer transition-all duration-300 group shadow-sm z-10 relative"
            >
               <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-yellow-400 to-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] ring-2 ring-white group-hover:scale-105 transition-all">
                  {user?.name?.charAt(0) || 'A'}
               </div>
               <div className="flex-1 min-w-0">
                 <p className="text-sm font-black text-slate-900 truncate">{user?.name}</p>
                 <p className="text-xs font-bold text-slate-500 truncate capitalize mt-0.5">{user?.role || 'Admin'} Account</p>
               </div>
               <div className="absolute -right-4 -top-4 w-16 h-16 bg-gradient-to-br from-yellow-100 to-emerald-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} title="System Settings">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-slate-200 rounded-2xl hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors cursor-pointer group flex items-start gap-4" onClick={() => showToast('Preferences updated', 'success')}>
              <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform"><Shield className="w-5 h-5"/></div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Security & Privacy</h4>
                <p className="text-xs text-slate-500 font-medium mt-1">Manage 2FA, Sessions</p>
              </div>
            </div>
            <div className="p-4 border border-slate-200 rounded-2xl hover:border-yellow-300 hover:bg-yellow-50/50 transition-colors cursor-pointer group flex items-start gap-4" onClick={() => showToast('Notifications synced', 'info')}>
              <div className="p-2.5 bg-yellow-100 text-yellow-600 rounded-xl group-hover:scale-110 transition-transform"><Bell className="w-5 h-5"/></div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Notifications</h4>
                <p className="text-xs text-slate-500 font-medium mt-1">Alerts, Email rules</p>
              </div>
            </div>
            <div className="p-4 border border-slate-200 rounded-2xl hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors cursor-pointer group flex items-start gap-4" onClick={() => showToast('API Keys copied to clipboard', 'success')}>
              <div className="p-2.5 bg-slate-100 text-slate-600 rounded-xl group-hover:scale-110 transition-transform"><Key className="w-5 h-5"/></div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">API Integrations</h4>
                <p className="text-xs text-slate-500 font-medium mt-1">Webhooks & tokens</p>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 mb-4">Quick Toggles</h4>
            <div className="space-y-4">
               <label className="flex items-center justify-between cursor-pointer">
                 <span className="text-sm font-semibold text-slate-600">Enable Dark Mode (Beta)</span>
                 <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200" onClick={() => showToast('Dark Mode is currently disabled in this build.', 'error')}><span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" /></div>
               </label>
               <label className="flex items-center justify-between cursor-pointer">
                 <span className="text-sm font-semibold text-slate-600">Compact Table Views</span>
                 <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-500" onClick={() => showToast('Compact views toggled.', 'success')}><span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6 shadow-sm" /></div>
               </label>
            </div>
          </div>
          
          <div className="flex justify-end pt-4 gap-3">
             <button onClick={() => setIsSettingsOpen(false)} className="px-5 py-2 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all">Close</button>
             <button onClick={() => { setIsSettingsOpen(false); showToast('All settings saved to cloud.', 'success'); }} className="px-5 py-2 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-md rounded-xl transition-all">Save Changes</button>
          </div>
        </div>
      </Modal>

      {/* Help & Support Modal */}
      <Modal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} title="Help & Support Center">
        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex items-start gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl"><LifeBuoy className="w-6 h-6"/></div>
            <div>
              <h4 className="font-extrabold text-slate-900">Need Immediate Assistance?</h4>
              <p className="text-sm text-slate-600 font-medium mt-1 mb-3">Our dedicated enterprise support team is available 24/7 to resolve complex issues.</p>
              <button 
                onClick={() => { setIsHelpOpen(false); showToast('Connecting to Live Support Agent...', 'info'); }}
                className="bg-emerald-600 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-sm hover:bg-emerald-700 transition-colors shadow-[0_4px_14px_0_rgba(16,185,129,0.39)]"
              >
                Start Live Chat
              </button>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setIsHelpOpen(false); showToast('Support ticket #7291 created successfully! We will email you shortly.', 'success'); }} className="space-y-4 pt-4 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">Create a Support Ticket</h4>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Issue Category</label>
              <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 outline-none font-semibold text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20">
                <option>Billing & Subscriptions</option>
                <option>Technical Bug Report</option>
                <option>Feature Request</option>
                <option>Account Access</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Description</label>
              <textarea 
                rows="4" 
                placeholder="Please describe the issue in detail..." 
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 outline-none font-medium text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-none"
                required
              ></textarea>
            </div>
            <div className="flex justify-end gap-3 mt-4">
               <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-md rounded-xl transition-all w-full flex justify-center items-center gap-2">
                 <Mail className="w-4 h-4"/> Submit Ticket
               </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
