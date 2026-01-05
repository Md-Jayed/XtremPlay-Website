
import React, { useEffect, useState } from 'react';
import { Language, GalleryImage } from '../types.ts';
import { supabase } from '../lib/supabase.ts';

interface AdminDashboardProps {
  lang: Language;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang, onLogout }) => {
  const isEn = lang === Language.EN;
  const [activeTab, setActiveTab] = useState<'stats' | 'gallery'>('stats');
  const [stats, setStats] = useState({
    bookings: 0,
    revenue: '0',
    inquiries: 0,
    visitors: '0'
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  
  // Gallery Management State
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isGalleryLoading, setIsGalleryLoading] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchGallery();
  }, []);

  const fetchStats = async () => {
    try {
      const { count: inquiryCount } = await supabase
        .from('contacts')
        .select('*', { count: 'exact', head: true });

      const { data: bookingsData, count: bookingCount } = await supabase
        .from('contacts')
        .select('*', { count: 'exact' })
        .limit(5);

      setStats({
        bookings: bookingCount || 0,
        revenue: 'SR 12.5k',
        inquiries: inquiryCount || 0,
        visitors: '2,840'
      });

      if (bookingsData) {
        setRecentBookings(bookingsData.map(b => ({
          name: b.full_name,
          type: b.inquiry_type,
          date: new Date(b.created_at || Date.now()).toLocaleDateString(),
          status: 'Pending'
        })));
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    }
  };

  const fetchGallery = async () => {
    setIsGalleryLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setGalleryImages(data || []);
    } catch (err) {
      console.error('Error fetching gallery:', err);
    } finally {
      setIsGalleryLoading(false);
    }
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;

    try {
      const { error } = await supabase
        .from('gallery_images')
        .insert([{ url: newImageUrl.trim() }]);
      
      if (error) throw error;
      
      setNewImageUrl('');
      fetchGallery();
      alert(isEn ? 'Image added successfully!' : 'تمت إضافة الصورة بنجاح!');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleUpdateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage || !editingImage.url.trim()) return;

    try {
      const { error } = await supabase
        .from('gallery_images')
        .update({ url: editingImage.url })
        .eq('id', editingImage.id);
      
      if (error) throw error;
      
      setEditingImage(null);
      fetchGallery();
      alert(isEn ? 'Image updated!' : 'تم تحديث الصورة!');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteImage = async (id: number) => {
    if (!confirm(isEn ? 'Are you sure you want to delete this image?' : 'هل أنت متأكد من حذف هذه الصورة؟')) return;

    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      fetchGallery();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-black text-slate-900">{isEn ? 'Admin Dashboard' : 'لوحة تحكم المشرف'}</h1>
            <p className="text-slate-500">{isEn ? 'Welcome back, Manager.' : 'أهلاً بعودتك، أيها المدير.'}</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-white p-1 rounded-2xl shadow-sm border border-slate-200 flex">
                <button 
                  onClick={() => setActiveTab('stats')}
                  className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'stats' ? 'bg-red-600 text-white' : 'text-slate-400'}`}
                >
                  {isEn ? 'Overview' : 'نظرة عامة'}
                </button>
                <button 
                  onClick={() => setActiveTab('gallery')}
                  className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'gallery' ? 'bg-red-600 text-white' : 'text-slate-400'}`}
                >
                  {isEn ? 'Gallery' : 'المعرض'}
                </button>
             </div>
             <button 
                onClick={onLogout}
                className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black shadow-lg hover:bg-black transition-colors flex items-center gap-2"
              >
                <i className="fas fa-sign-out-alt"></i>
                <span>{isEn ? 'Logout' : 'خروج'}</span>
              </button>
          </div>
        </div>

        {activeTab === 'stats' ? (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {[
                { label: isEn ? 'Bookings' : 'الحجوزات', val: stats.bookings, icon: 'fa-calendar-check', color: 'text-blue-600' },
                { label: isEn ? 'Revenue' : 'الإيرادات', val: stats.revenue, icon: 'fa-money-bill-wave', color: 'text-green-600' },
                { label: isEn ? 'Inquiries' : 'الاستفسارات', val: stats.inquiries, icon: 'fa-envelope', color: 'text-amber-600' },
                { label: isEn ? 'Visitors' : 'الزوار', val: stats.visitors, icon: 'fa-users', color: 'text-purple-600' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                   <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${stat.color}`}>
                         <i className={`fas ${stat.icon} text-xl`}></i>
                      </div>
                   </div>
                   <div className="text-3xl font-black text-slate-900 mb-1">{stat.val}</div>
                   <div className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                 <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                       <h3 className="font-black text-slate-900">{isEn ? 'Latest Inquiries' : 'أحدث الاستفسارات'}</h3>
                       <button onClick={fetchStats} className="text-blue-600 text-sm font-bold hover:underline">{isEn ? 'Refresh' : 'تحديث'}</button>
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
                            {recentBookings.length > 0 ? recentBookings.map((row, idx) => (
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
                            )) : (
                              <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                                  {isEn ? 'No inquiries found in database' : 'لا توجد استفسارات في قاعدة البيانات'}
                                </td>
                              </tr>
                            )}
                          </tbody>
                       </table>
                    </div>
                 </div>
              </div>
              <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
                 <h3 className="text-xl font-black mb-6">{isEn ? 'Quick Actions' : 'إجراءات سريعة'}</h3>
                 <div className="grid grid-cols-1 gap-4">
                    <button 
                      onClick={() => setActiveTab('gallery')}
                      className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center px-6 gap-4 transition-all group"
                    >
                       <i className="fas fa-image text-blue-500 group-hover:scale-125 transition-transform"></i>
                       <span className="font-bold">{isEn ? 'Manage Gallery' : 'إدارة المعرض'}</span>
                    </button>
                    <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center px-6 gap-4 transition-all group">
                       <i className="fas fa-plus-circle text-red-500 group-hover:scale-125 transition-transform"></i>
                       <span className="font-bold">{isEn ? 'Update Prices' : 'تحديث الأسعار'}</span>
                    </button>
                 </div>
              </div>
            </div>
          </>
        ) : (
          <div className="animate-in slide-in-from-bottom-4 duration-300">
            {/* Gallery Manager */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">{isEn ? 'Gallery Manager' : 'إدارة الصور'}</h3>
                  <p className="text-slate-500">{isEn ? 'Add, edit or remove images from the public gallery.' : 'إضافة أو تعديل أو حذف الصور من المعرض العام.'}</p>
                </div>
                
                {/* Add Image Form */}
                <form onSubmit={handleAddImage} className="flex gap-2 w-full md:w-auto">
                  <input 
                    type="url" 
                    required
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder={isEn ? "Paste Image URL..." : "الصق رابط الصورة..."}
                    className="flex-grow md:w-80 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all font-bold"
                  />
                  <button type="submit" className="bg-red-600 text-white p-3 px-6 rounded-xl font-black hover:bg-red-700 transition-all flex items-center gap-2">
                    <i className="fas fa-plus"></i>
                    <span className="hidden sm:inline">{isEn ? 'Add' : 'إضافة'}</span>
                  </button>
                </form>
              </div>

              {/* Edit Modal (Inline) */}
              {editingImage && (
                <div className="mb-10 p-6 bg-blue-50 border-2 border-blue-100 rounded-3xl animate-in zoom-in duration-200">
                  <h4 className="font-black text-blue-900 mb-4">{isEn ? 'Editing Image URL' : 'تعديل رابط الصورة'}</h4>
                  <form onSubmit={handleUpdateImage} className="flex gap-2">
                    <input 
                      type="url" 
                      required
                      value={editingImage.url}
                      onChange={(e) => setEditingImage({...editingImage, url: e.target.value})}
                      className="flex-grow bg-white border-2 border-blue-200 rounded-xl px-4 py-3 outline-none font-bold"
                    />
                    <button type="submit" className="bg-blue-600 text-white px-6 rounded-xl font-black">
                      {isEn ? 'Update' : 'تحديث'}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setEditingImage(null)}
                      className="bg-slate-200 text-slate-600 px-6 rounded-xl font-black"
                    >
                      {isEn ? 'Cancel' : 'إلغاء'}
                    </button>
                  </form>
                </div>
              )}

              {isGalleryLoading ? (
                <div className="flex justify-center py-20">
                  <i className="fas fa-spinner fa-spin text-3xl text-red-600"></i>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {galleryImages.map((img) => (
                    <div key={img.id} className="group relative bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-sm aspect-video">
                      <img src={img.url} className="w-full h-full object-cover" alt="Preview" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                         <button 
                            onClick={() => setEditingImage(img)}
                            className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                            title={isEn ? "Edit" : "تعديل"}
                         >
                            <i className="fas fa-edit"></i>
                         </button>
                         <button 
                            onClick={() => handleDeleteImage(img.id)}
                            className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                            title={isEn ? "Delete" : "حذف"}
                         >
                            <i className="fas fa-trash"></i>
                         </button>
                      </div>
                    </div>
                  ))}
                  {galleryImages.length === 0 && (
                    <div className="col-span-full py-20 text-center text-slate-400 italic">
                      {isEn ? 'No images in gallery' : 'لا توجد صور في المعرض'}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
