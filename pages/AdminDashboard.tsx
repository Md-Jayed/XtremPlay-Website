
import React, { useEffect, useState } from 'react';
import { Language, GalleryImage } from '../types.ts';
import { supabase } from '../lib/supabase.ts';

interface PricingItem {
  id: number;
  key: string;
  title_en: string;
  title_ar: string;
  price_en: string;
  price_ar: string;
}

interface AdminDashboardProps {
  lang: Language;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang, onLogout }) => {
  const isEn = lang === Language.EN;
  const [activeTab, setActiveTab] = useState<'stats' | 'gallery' | 'pricing'>('stats');
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

  // Pricing Management State
  const [pricing, setPricing] = useState<PricingItem[]>([]);
  const [editingPrice, setEditingPrice] = useState<PricingItem | null>(null);
  const [isPricingLoading, setIsPricingLoading] = useState(false);
  const [pricingTableMissing, setPricingTableMissing] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchGallery();
    fetchPricing();
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
    } catch (err: any) {
      console.warn('Stats fetch ignored:', err?.message || err);
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
    } catch (err: any) {
      console.warn('Gallery fetch ignored:', err?.message || err);
    } finally {
      setIsGalleryLoading(false);
    }
  };

  const fetchPricing = async () => {
    setIsPricingLoading(true);
    setPricingTableMissing(false);
    try {
      const { data, error } = await supabase
        .from('pricing')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) {
        // Check for "table not found" errors
        if (error.code === 'PGRST116' || error.message.includes('schema cache')) {
          setPricingTableMissing(true);
          return;
        }
        throw error;
      }
      setPricing(data || []);
    } catch (err: any) {
      console.error('Pricing Error:', err?.message || err);
    } finally {
      setIsPricingLoading(false);
    }
  };

  const handleUpdatePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPrice) return;

    try {
      const { error } = await supabase
        .from('pricing')
        .update({
          price_en: editingPrice.price_en,
          price_ar: editingPrice.price_ar,
          title_en: editingPrice.title_en,
          title_ar: editingPrice.title_ar
        })
        .eq('id', editingPrice.id);

      if (error) throw error;

      setEditingPrice(null);
      fetchPricing();
      alert(isEn ? 'Price updated successfully!' : 'تم تحديث السعر بنجاح!');
    } catch (err: any) {
      alert(err?.message || err);
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
      alert(err?.message || err);
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
      alert(err?.message || err);
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
      alert(err?.message || err);
    }
  };

  const SQL_SCHEMA = `
CREATE TABLE pricing (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  key TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  price_en TEXT NOT NULL,
  price_ar TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO pricing (key, title_en, title_ar, price_en, price_ar) VALUES
('party_xtreme', 'Xtreme Package', 'باقة إكستريم', '99 / 139 SR', '٩٩ / ١٣٩ ر.س'),
('party_graduation', 'Graduation Package', 'باقة التخرج', '139 SR', '١٣٩ ر.س'),
('plan_visit_weekday', 'Weekday Entry', 'دخول أيام الأسبوع', '99 SR', '٩٩ ر.س'),
('plan_visit_weekend', 'Weekend Entry', 'دخول الويكند', '139 SR', '١٣٩ ر.س');
  `.trim();

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-black text-slate-900">{isEn ? 'Admin Dashboard' : 'لوحة تحكم المشرف'}</h1>
            <p className="text-slate-500">{isEn ? 'Welcome back, Manager.' : 'أهلاً بعودتك، أيها المدير.'}</p>
          </div>
          <div className="flex gap-4">
             <nav className="bg-white p-1 rounded-2xl shadow-sm border border-slate-200 flex" role="tablist">
                <button role="tab" aria-selected={activeTab === 'stats'} onClick={() => setActiveTab('stats')} className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'stats' ? 'bg-red-600 text-white' : 'text-slate-400'}`}>
                  {isEn ? 'Overview' : 'نظرة عامة'}
                </button>
                <button role="tab" aria-selected={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'gallery' ? 'bg-red-600 text-white' : 'text-slate-400'}`}>
                  {isEn ? 'Gallery' : 'المعرض'}
                </button>
                <button role="tab" aria-selected={activeTab === 'pricing'} onClick={() => setActiveTab('pricing')} className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'pricing' ? 'bg-red-600 text-white' : 'text-slate-400'}`}>
                  {isEn ? 'Pricing' : 'الأسعار'}
                </button>
             </nav>
             <button onClick={onLogout} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black shadow-lg hover:bg-black transition-colors flex items-center gap-2">
                <i className="fas fa-sign-out-alt"></i>
                <span>{isEn ? 'Logout' : 'خروج'}</span>
              </button>
          </div>
        </div>

        {activeTab === 'stats' && (
          <div role="tabpanel">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {[
                { label: isEn ? 'Bookings' : 'الحجوزات', val: stats.bookings, icon: 'fa-calendar-check', color: 'text-blue-600' },
                { label: isEn ? 'Revenue' : 'الإيرادات', val: stats.revenue, icon: 'fa-money-bill-wave', color: 'text-green-600' },
                { label: isEn ? 'Inquiries' : 'الاستفسارات', val: stats.inquiries, icon: 'fa-envelope', color: 'text-amber-600' },
                { label: isEn ? 'Visitors' : 'الزوار', val: stats.visitors, icon: 'fa-users', color: 'text-purple-600' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                   <div className="text-3xl font-black text-slate-900 mb-1">{stat.val}</div>
                   <div className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="p-6 border-b border-slate-100 font-black text-slate-900">{isEn ? 'Recent Activity' : 'النشاط الأخير'}</div>
               <div className="p-6 text-center text-slate-400 italic">{isEn ? 'Live activity stream will appear here.' : 'سيظهر سجل النشاط المباشر هنا.'}</div>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div role="tabpanel" className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-2xl font-black mb-6">{isEn ? 'Gallery Manager' : 'إدارة الصور'}</h3>
            <div className="text-slate-500 italic mb-8">{isEn ? 'Gallery table setup required in Supabase to sync images.' : 'مطلوب إعداد جدول المعرض في Supabase لمزامنة الصور.'}</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {galleryImages.map(img => (
                 <div key={img.id} className="aspect-video bg-slate-100 rounded-xl overflow-hidden">
                    <img src={img.url} className="w-full h-full object-cover" />
                 </div>
               ))}
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div role="tabpanel" className="animate-in slide-in-from-bottom-4 duration-300">
            {pricingTableMissing ? (
              <div className="bg-white rounded-[2.5rem] shadow-xl border-2 border-red-100 p-12 text-center">
                 <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <i className="fas fa-database text-3xl"></i>
                 </div>
                 <h3 className="text-3xl font-black text-slate-900 mb-4">{isEn ? 'Database Setup Required' : 'مطلوب إعداد قاعدة البيانات'}</h3>
                 <p className="text-slate-500 max-w-lg mx-auto mb-10 font-medium">
                    {isEn 
                      ? 'The "pricing" table does not exist in your Supabase project yet. Please copy the SQL below and run it in your Supabase SQL Editor.' 
                      : 'جدول "الأسعار" غير موجود في مشروع Supabase الخاص بك بعد. يرجى نسخ كود SQL أدناه وتشغيله في محرر SQL الخاص بـ Supabase.'}
                 </p>
                 <div className="bg-slate-900 text-red-400 p-6 rounded-2xl text-left font-mono text-sm mb-8 overflow-x-auto">
                    <pre>{SQL_SCHEMA}</pre>
                 </div>
                 <button 
                  onClick={() => { navigator.clipboard.writeText(SQL_SCHEMA); alert(isEn ? 'SQL copied!' : 'تم نسخ الكود!'); }}
                  className="px-10 py-4 bg-red-600 text-white rounded-xl font-black hover:bg-red-700 transition-all shadow-lg"
                 >
                    {isEn ? 'COPY SQL SCHEMA' : 'نسخ كود SQL'}
                 </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
                 <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-black">{isEn ? 'Pricing Management' : 'إدارة الأسعار'}</h3>
                    <button onClick={fetchPricing} className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold">{isEn ? 'Refresh' : 'تحديث'}</button>
                 </div>

                 {editingPrice && (
                    <div className="mb-10 p-8 bg-blue-50 border-2 border-blue-100 rounded-3xl">
                       <form onSubmit={handleUpdatePrice} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <input value={editingPrice.price_en} onChange={e => setEditingPrice({...editingPrice, price_en: e.target.value})} className="p-4 rounded-xl border-2" placeholder="Price EN" />
                             <input dir="rtl" value={editingPrice.price_ar} onChange={e => setEditingPrice({...editingPrice, price_ar: e.target.value})} className="p-4 rounded-xl border-2" placeholder="Price AR" />
                          </div>
                          <div className="flex gap-4">
                             <button type="submit" className="px-8 py-3 bg-red-600 text-white rounded-xl font-black">SAVE</button>
                             <button type="button" onClick={() => setEditingPrice(null)} className="px-8 py-3 bg-slate-300 rounded-xl font-black">CANCEL</button>
                          </div>
                       </form>
                    </div>
                 )}

                 <div className="overflow-x-auto">
                    <table className="w-full text-left rtl:text-right">
                       <thead className="bg-slate-50 text-slate-400 text-xs font-black uppercase">
                          <tr><th className="p-4">Name</th><th className="p-4">Price</th><th className="p-4">Actions</th></tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {pricing.map(item => (
                            <tr key={item.id}>
                               <td className="p-4 font-bold">{isEn ? item.title_en : item.title_ar}</td>
                               <td className="p-4 font-black text-red-600">{isEn ? item.price_en : item.price_ar}</td>
                               <td className="p-4">
                                  <button onClick={() => setEditingPrice(item)} className="p-2 bg-slate-100 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                                     <i className="fas fa-edit"></i>
                                  </button>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
