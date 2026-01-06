
import React, { useEffect, useState } from 'react';
import { Language, PricingCard, CartItem } from '../types';
import { PARTY_PACKAGES as STATIC_DEFAULTS } from '../constants';
import { supabase } from '../lib/supabase.ts';
import PageBanner from '../components/PageBanner.tsx';

interface PartiesProps {
  lang: Language;
  onAddToCart: (item: Omit<CartItem, 'quantity'>, redirect?: boolean) => void;
}

const Parties: React.FC<PartiesProps> = ({ lang, onAddToCart }) => {
  const isEn = lang === Language.EN;
  const [packages, setPackages] = useState<PricingCard[]>(STATIC_DEFAULTS);

  useEffect(() => {
    const fetchDynamicPricing = async () => {
      try {
        const { data, error } = await supabase
          .from('pricing')
          .select('*')
          .in('key', ['party_xtreme', 'party_graduation']);

        if (!error && data && data.length > 0) {
          const updatedPackages = STATIC_DEFAULTS.map(pkg => {
            const dbItem = data.find(d => 
              (pkg.titleEn.toLowerCase().includes('xtreme') && d.key === 'party_xtreme') ||
              (pkg.titleEn.toLowerCase().includes('graduation') && d.key === 'party_graduation')
            );
            if (dbItem) {
              return {
                ...pkg,
                priceEn: dbItem.price_en,
                priceAr: dbItem.price_ar
              };
            }
            return pkg;
          });
          setPackages(updatedPackages);
        }
      } catch (err) {
        console.warn('Using static party pricing as fallback');
      }
    };

    fetchDynamicPricing();
  }, []);

  const handleAdd = (pkg: PricingCard) => {
    const priceStr = isEn ? pkg.priceEn : pkg.priceAr;
    const price = parseInt(priceStr.split('/')[0].replace(/\D/g, '')) || 99;
    
    onAddToCart({
      id: `party-${pkg.titleEn.toLowerCase().replace(/\s/g, '-')}`,
      nameEn: pkg.titleEn,
      nameAr: pkg.titleAr,
      price,
      type: 'package'
    }, true); // Redirection enabled
  };

  return (
    <div className="overflow-x-hidden">
      <PageBanner 
        title={isEn ? 'Parties' : 'الحفلات'} 
        subtitle={isEn 
          ? 'Celebrate your special moments in a high-energy environment. We offer a variety of packages for every need.'
          : 'احتفل بلحظاتك الخاصة في بيئة مليئة بالطاقة. نقدم مجموعة متنوعة من الباقات لكل الاحتياجات.'}
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {packages.map((pkg, idx) => (
              <div 
                key={idx} 
                className={`relative rounded-[2.5rem] overflow-hidden border-2 transition-all duration-500 hover:-translate-y-2 animate-reveal-up ${idx === 1 ? 'delay-200' : ''} ${
                  pkg.bestValue ? 'border-red-600 shadow-2xl' : 'border-slate-100 shadow-xl'
                }`}
              >
                {pkg.bestValue && (
                  <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-center py-2.5 font-black uppercase text-xs tracking-[0.2em] animate-pulse-soft">
                    {isEn ? 'Most Popular' : 'الأكثر طلباً'}
                  </div>
                )}
                
                <div className="p-12 pt-16">
                  <div className="text-center mb-10">
                    <h3 className="text-4xl font-black text-[#001F2D] mb-6 uppercase tracking-tight">{isEn ? pkg.titleEn : pkg.titleAr}</h3>
                    <div className="inline-flex bg-[#001F2D] text-white px-10 py-4 rounded-full text-2xl md:text-3xl font-black shadow-xl border-4 border-slate-100/10">
                      {isEn ? pkg.priceEn : pkg.priceAr}
                    </div>
                  </div>

                  <ul className="space-y-5 mb-12 min-h-[280px]">
                    {(isEn ? pkg.featuresEn : pkg.featuresAr).map((feat, i) => (
                      <li key={i} className={`flex items-start animate-reveal-right`} style={{animationDelay: `${i * 100 + 300}ms`}}>
                        <div className="bg-red-50 text-red-600 rounded-full w-7 h-7 flex items-center justify-center mr-4 rtl:ml-4 mt-0.5 flex-shrink-0 shadow-sm">
                          <i className="fas fa-check text-[10px]"></i>
                        </div>
                        <span className="text-slate-600 font-bold leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handleAdd(pkg)}
                    className="w-full py-6 bg-[#001F2D] text-white rounded-[1.5rem] font-black text-xl hover:bg-red-600 transition-all shadow-xl active:scale-95 group"
                  >
                    <span className="group-hover:tracking-widest transition-all duration-300">
                      {isEn ? 'BOOK NOW' : 'احجز الآن'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Parties;
