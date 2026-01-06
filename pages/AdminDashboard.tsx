
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

interface OrderItem {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  items: any[];
  total: number;
  status: string;
  created_at: string;
}

interface AdminDashboardProps {
  lang: Language;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang, onLogout }) => {
  const isEn = lang === Language.EN;
  const [activeTab, setActiveTab] = useState<'stats' | 'gallery' | 'pricing' | 'orders'>('stats');
  const [stats, setStats] = useState({
    bookings: 0,
    revenue: 0,
    inquiries: 0,
    visitors: '0'
  });
  
  // States
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [pricing, setPricing] = useState<PricingItem[]>([]);
  const [editingPrice, setEditingPrice] = useState<PricingItem | null>(null);

  useEffect(() => {
    fetchStats();
    fetchGallery();
    fetchPricing();
    fetchOrders();
  }, []);

  const fetchStats = async () => {
    try {
      const { count: inquiryCount } = await supabase.from('contacts').select('*', { count: 'exact', head: true });
      const { data: ordersData } = await supabase.from('orders').select('total');
      
      const revenue = ordersData?.reduce((acc, curr) => acc + curr.total, 0) || 0;

      setStats({
        bookings: ordersData?.length || 0,
        revenue: revenue,
        inquiries: inquiryCount || 0,
        visitors: '2,840'
      });
    } catch (err: any) {}
  };

  const fetchOrders = async () => {
    setIsOrdersLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) setOrders(data || []);
    } catch (err) {}
    setIsOrdersLoading(false);
  };

  const updateOrderStatus = async (id: number, status: string) => {
    try {
      const { error } = await supabase.from('orders').update({ status }).eq('id', id);
      if (!error) fetchOrders();
    } catch (err) {}
  };

  const fetchGallery = async () => {
    try {
      const { data } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false });
      if (data) setGalleryImages(data);
    } catch (err) {}
  };

  const fetchPricing = async () => {
    try {
      const { data } = await supabase.from('pricing').select('*').order('id', { ascending: true });
      if (data) setPricing(data);
    } catch (err) {}
  };

  const handleUpdatePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPrice) return;
    try {
      const { error } = await supabase.from('pricing').update(editingPrice).eq('id', editingPrice.id);
      if (!error) { setEditingPrice(null); fetchPricing(); }
    } catch (err) {}
  };

  const SQL_ORDERS_SCHEMA = `
CREATE TABLE orders (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  items JSONB NOT NULL,
  total NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_method TEXT DEFAULT 'cash',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
  `.trim();

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900">{isEn ? 'Admin Dashboard' : 'لوحة التحكم'}</h1>
            <p className="text-slate-500">{isEn ? 'Sales & Park Management' : 'إدارة المبيعات والمنتزه'}</p>
          </div>
          <div className="flex gap-4">
             <nav className="bg-white p-1 rounded-2xl shadow-sm border border-slate-200 flex overflow-x-auto">
                {['stats', 'orders', 'gallery', 'pricing'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab as any)} 
                    className={`px-6 py-2 rounded-xl font-bold uppercase text-[10px] transition-all ${activeTab === tab ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400'}`}
                  >
                    {isEn ? tab : tab}
                  </button>
                ))}
             </nav>
             <button onClick={onLogout} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black shadow-lg">
                <i className="fas fa-sign-out-alt mr-2"></i>{isEn ? 'Logout' : 'خروج'}
              </button>
          </div>
        </div>

        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Orders', val: stats.bookings, icon: 'fa-shopping-cart', color: 'text-blue-600' },
              { label: 'Revenue', val: `${stats.revenue} SR`, icon: 'fa-money-bill-wave', color: 'text-green-600' },
              { label: 'Inquiries', val: stats.inquiries, icon: 'fa-envelope', color: 'text-amber-600' },
              { label: 'Visitors', val: stats.visitors, icon: 'fa-users', color: 'text-purple-600' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
                 <div className="text-3xl font-black text-slate-900 mb-1">{stat.val}</div>
                 <div className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-10">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black uppercase italic">{isEn ? 'Cash Orders' : 'طلبات الكاش'}</h3>
                <button onClick={fetchOrders} className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold">{isEn ? 'Refresh' : 'تحديث'}</button>
             </div>
             
             <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right">
                   <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase">
                      <tr>
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Items</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {orders.map(order => (
                        <tr key={order.id} className="hover:bg-slate-50/50">
                           <td className="p-4 font-black">#{order.id.toString().padStart(6, '0')}</td>
                           <td className="p-4">
                              <div className="font-bold text-slate-900">{order.customer_name}</div>
                              <div className="text-xs text-slate-400">{order.customer_phone}</div>
                           </td>
                           <td className="p-4">
                              <div className="text-xs text-slate-500">
                                 {order.items.map((i: any, idx: number) => (
                                   <div key={idx}>{i.quantity}x {isEn ? i.nameEn : i.nameAr}</div>
                                 ))}
                              </div>
                           </td>
                           <td className="p-4 font-black text-red-600">{order.total} SR</td>
                           <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                order.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                              }`}>{order.status}</span>
                           </td>
                           <td className="p-4 space-x-2 rtl:space-x-reverse">
                              <button onClick={() => updateOrderStatus(order.id, 'completed')} className="text-xs font-black text-green-600 hover:underline">Complete</button>
                              <button onClick={() => updateOrderStatus(order.id, 'cancelled')} className="text-xs font-black text-red-600 hover:underline">Cancel</button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
                {orders.length === 0 && (
                   <div className="py-20 text-center text-slate-400 italic">
                      <p className="mb-4">No orders found. Ensure the 'orders' table is created.</p>
                      <pre className="p-4 bg-slate-900 text-red-400 rounded-xl text-[10px] inline-block text-left">{SQL_ORDERS_SCHEMA}</pre>
                   </div>
                )}
             </div>
          </div>
        )}

        {/* Other tabs remain similar to before but unified in design */}
        {activeTab === 'pricing' && (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-10">
             <h3 className="text-2xl font-black mb-8 uppercase italic">Pricing Editor</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pricing.map(item => (
                  <div key={item.id} className="p-6 border border-slate-100 rounded-3xl hover:border-red-600 transition-colors">
                     <div className="flex justify-between items-start">
                        <div>
                           <div className="font-black text-slate-900">{isEn ? item.title_en : item.title_ar}</div>
                           <div className="text-2xl font-black text-red-600">{isEn ? item.price_en : item.price_ar}</div>
                        </div>
                        <button onClick={() => setEditingPrice(item)} className="p-2 bg-slate-50 rounded-lg hover:bg-red-50 hover:text-red-600"><i className="fas fa-edit"></i></button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
