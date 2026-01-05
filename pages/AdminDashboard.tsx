
import React from 'react';
import { Language } from '../types';

interface AdminDashboardProps {
  lang: Language;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang, onLogout }) => {
  const isEn = lang === Language.EN;

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-black text-slate-900">{isEn ? 'Admin Dashboard' : 'لوحة تحكم المشرف'}</h1>
            <p className="text-slate-500">{isEn ? 'Welcome back, Manager.' : 'أهلاً بعودتك، أيها المدير.'}</p>
          </div>
          <button 
            onClick={onLogout}
            className="px-8 py-3 bg-red-600 text-white rounded-xl font-black shadow-lg shadow-red-600/20 hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>{isEn ? 'Logout' : 'تسجيل الخروج'}</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: isEn ? 'Bookings' : 'الحجوزات', val: '142', icon: 'fa-calendar-check', color: 'text-blue-600' },
            { label: isEn ? 'Revenue' : 'الإيرادات', val: 'SR 12.5k', icon: 'fa-money-bill-wave', color: 'text-green-600' },
            { label: isEn ? 'Inquiries' : 'الاستفسارات', val: '18', icon: 'fa-envelope', color: 'text-amber-600' },
            { label: isEn ? 'Visitors' : 'الزوار', val: '2,840', icon: 'fa-users', color: 'text-purple-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
               <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${stat.color}`}>
                     <i className={`fas ${stat.icon} text-xl`}></i>
                  </div>
                  <span className="text-xs font-black text-green-500 bg-green-50 px-2 py-1 rounded">+12%</span>
               </div>
               <div className="text-3xl font-black text-slate-900 mb-1">{stat.val}</div>
               <div className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Content Management */}
          <div className="lg:col-span-2 space-y-8">
             <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                   <h3 className="font-black text-slate-900">{isEn ? 'Recent Bookings' : 'الحجوزات الأخيرة'}</h3>
                   <button className="text-blue-600 text-sm font-bold">{isEn ? 'View All' : 'عرض الكل'}</button>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left rtl:text-right">
                      <thead className="bg-slate-50 text-slate-400 text-xs font-black uppercase tracking-widest">
                        <tr>
                           <th className="px-6 py-4">Customer</th>
                           <th className="px-6 py-4">Type</th>
                           <th className="px-6 py-4">Date</th>
                           <th className="px-6 py-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {[
                          { name: 'Ahmed Khalid', type: 'Party', date: 'Dec 24, 2024', status: 'Confirmed' },
                          { name: 'Sarah Salem', type: 'Visit', date: 'Dec 25, 2024', status: 'Pending' },
                          { name: 'Jeddah School', type: 'Trip', date: 'Jan 02, 2025', status: 'Confirmed' },
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                             <td className="px-6 py-4 font-bold">{row.name}</td>
                             <td className="px-6 py-4 text-slate-500">{row.type}</td>
                             <td className="px-6 py-4 text-slate-500">{row.date}</td>
                             <td className="px-6 py-4">
                               <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                 row.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                               }`}>{row.status}</span>
                             </td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
             </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
             <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
                <h3 className="text-xl font-black mb-6">{isEn ? 'Quick Actions' : 'إجراءات سريعة'}</h3>
                <div className="grid grid-cols-1 gap-4">
                   <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center px-6 gap-4 transition-all group">
                      <i className="fas fa-plus-circle text-red-500 group-hover:scale-125 transition-transform"></i>
                      <span className="font-bold">{isEn ? 'Update Prices' : 'تحديث الأسعار'}</span>
                   </button>
                   <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center px-6 gap-4 transition-all group">
                      <i className="fas fa-image text-blue-500 group-hover:scale-125 transition-transform"></i>
                      <span className="font-bold">{isEn ? 'Add to Gallery' : 'إضافة للمعرض'}</span>
                   </button>
                   <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center px-6 gap-4 transition-all group">
                      <i className="fas fa-search-plus text-green-500 group-hover:scale-125 transition-transform"></i>
                      <span className="font-bold">{isEn ? 'SEO Settings' : 'إعدادات SEO'}</span>
                   </button>
                </div>
             </div>

             <div className="bg-red-600 text-white p-8 rounded-3xl shadow-xl flex items-center gap-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <i className="fas fa-bullhorn text-2xl"></i>
                </div>
                <div>
                   <h4 className="font-black text-lg">{isEn ? 'Announcement' : 'إعلان جديد'}</h4>
                   <p className="text-white/80 text-sm">{isEn ? 'Post special holiday offers' : 'نشر عروض الأعياد الخاصة'}</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
