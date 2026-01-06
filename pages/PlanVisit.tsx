
import React, { useEffect, useState } from 'react';
import { Language, CartItem } from '../types';
import { supabase } from '../lib/supabase.ts';
import PageBanner from '../components/PageBanner.tsx';

interface PlanVisitProps {
  lang: Language;
  onAddToCart: (item: Omit<CartItem, 'quantity'>, redirect?: boolean) => void;
}

const PlanVisit: React.FC<PlanVisitProps> = ({ lang, onAddToCart }) => {
  const isEn = lang === Language.EN;
  const [pricing, setPricing] = useState({
    weekdayEn: '99 SR',
    weekdayAr: '٩٩ ر.س',
    weekendEn: '139 SR',
    weekendAr: '١٣٩ ر.س'
  });

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const { data, error } = await supabase
          .from('pricing')
          .select('*')
          .in('key', ['plan_visit_weekday', 'plan_visit_weekend']);

        if (!error && data && data.length > 0) {
          const weekday = data.find(d => d.key === 'plan_visit_weekday');
          const weekend = data.find(d => d.key === 'plan_visit_weekend');
          
          setPricing({
            weekdayEn: weekday?.price_en || '99 SR',
            weekdayAr: weekday?.price_ar || '٩٩ ر.س',
            weekendEn: weekend?.price_en || '139 SR',
            weekendAr: weekend?.price_ar || '١٣٩ ر.س'
          });
        }
      } catch (err) {
        console.warn('Using static visit pricing as fallback');
      }
    };

    fetchPricing();
  }, []);

  const handleAdd = (type: 'weekday' | 'weekend') => {
    const priceStr = type === 'weekday' ? pricing.weekdayEn : pricing.weekendEn;
    const price = parseInt(priceStr.replace(/\D/g, '')) || 99;
    onAddToCart({
      id: `ticket-${type}`,
      nameEn: `${type.charAt(0).toUpperCase() + type.slice(1)} Entry Ticket`,
      nameAr: type === 'weekday' ? 'تذكرة أيام الأسبوع' : 'تذكرة الويكند',
      price,
      type: 'ticket'
    }, true); // Redirection enabled
  };

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-500">
      <PageBanner 
        title={isEn ? 'Plan Your Visit' : 'خطط لزيارتك'} 
        subtitle={isEn 
          ? 'Test your jumping skills on various obstacles or dive into the largest foam pits in Saudi!'
          : 'اختبر مهاراتك في القفز على عوائق متنوعة أو انطلق في أكبر حفر رغوية في المملكة!'}
      />

      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-[#001F2D] text-white rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-2xl animate-reveal-up delay-100 border border-white/5">
            <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center mb-8 rotate-3">
              <i className="fas fa-location-dot text-3xl"></i>
            </div>
            <h3 className="text-2xl font-black mb-4 uppercase tracking-widest">{isEn ? 'Location' : 'الموقع'}</h3>
            <p className="text-slate-400 mb-8 font-bold leading-relaxed">
              1st Floor Sultan Mall,<br />
              Prince Sultan Rd, Jeddah
            </p>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="mt-auto px-8 py-3 border-2 border-white/20 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-white hover:text-slate-900 transition-all">
              {isEn ? 'Get Directions' : 'احصل على الاتجاهات'}
            </a>
          </div>

          <div className="bg-amber-400 text-slate-900 rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-2xl animate-reveal-up delay-200 border-4 border-white">
            <div className="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center mb-8 -rotate-3 shadow-xl">
              <i className="fas fa-clock text-3xl"></i>
            </div>
            <h3 className="text-2xl font-black mb-8 uppercase tracking-widest">{isEn ? 'Timings' : 'الأوقات'}</h3>
            <div className="space-y-8 w-full text-lg">
              <div className="bg-white/40 p-5 rounded-2xl">
                <div className="text-2xl font-black">3 PM - 11 PM</div>
              </div>
              <div className="bg-white/40 p-5 rounded-2xl">
                <div className="text-2xl font-black">3 PM - 12 AM</div>
              </div>
            </div>
          </div>

          <div className="bg-red-600 text-white rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-2xl animate-reveal-up delay-300">
            <div className="w-20 h-20 bg-white text-red-600 rounded-3xl flex items-center justify-center mb-8 rotate-6 shadow-xl">
              <i className="fas fa-ticket text-3xl"></i>
            </div>
            <h3 className="text-2xl font-black mb-8 uppercase tracking-widest">{isEn ? 'Entry Access' : 'تذكرة الدخول'}</h3>
            <div className="space-y-6 w-full">
              <div className="bg-black/10 p-6 rounded-3xl border border-white/10 group hover:scale-105 transition-all">
                <div className="text-[10px] font-black opacity-80 uppercase mb-1 tracking-widest">{isEn ? 'Weekdays' : 'أيام الأسبوع'}</div>
                <div className="text-4xl font-black mb-4">{isEn ? pricing.weekdayEn : pricing.weekdayAr}</div>
                <button 
                  onClick={() => handleAdd('weekday')}
                  className="w-full py-4 bg-white text-red-600 rounded-xl font-black text-xs uppercase hover:bg-slate-100 active:scale-95 transition-all"
                >
                  {isEn ? 'BOOK NOW' : 'احجز الآن'}
                </button>
              </div>
              <div className="bg-black/10 p-6 rounded-3xl border border-white/10 group hover:scale-105 transition-all">
                <div className="text-[10px] font-black opacity-80 uppercase mb-1 tracking-widest">{isEn ? 'Weekends & Holidays' : 'الويكند والإجازات'}</div>
                <div className="text-4xl font-black mb-4">{isEn ? pricing.weekendEn : pricing.weekendAr}</div>
                <button 
                  onClick={() => handleAdd('weekend')}
                  className="w-full py-4 bg-white text-red-600 rounded-xl font-black text-xs uppercase hover:bg-slate-100 active:scale-95 transition-all"
                >
                  {isEn ? 'BOOK NOW' : 'احجز الآن'}
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default PlanVisit;
