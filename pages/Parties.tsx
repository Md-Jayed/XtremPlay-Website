
import React from 'react';
import { Language } from '../types';
import { PARTY_PACKAGES } from '../constants';
import PageBanner from '../components/PageBanner.tsx';

interface PartiesProps {
  lang: Language;
}

const Parties: React.FC<PartiesProps> = ({ lang }) => {
  const isEn = lang === Language.EN;

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {PARTY_PACKAGES.map((pkg, idx) => (
              <div 
                key={idx} 
                className={`relative rounded-[2rem] overflow-hidden border-4 transition-all duration-300 hover:-translate-y-2 animate-reveal-up ${idx === 1 ? 'delay-200' : ''} ${
                  pkg.bestValue ? 'border-red-600 shadow-2xl' : 'border-slate-100 shadow-xl'
                }`}
              >
                {pkg.bestValue && (
                  <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-center py-2 font-black uppercase text-sm tracking-widest animate-pulse-soft">
                    {isEn ? 'Most Popular' : 'الأكثر طلباً'}
                  </div>
                )}
                
                <div className="p-10 pt-16">
                  <div className="text-center mb-10">
                    <h3 className="text-3xl font-black text-slate-900 mb-4">{isEn ? pkg.titleEn : pkg.titleAr}</h3>
                    <div className="inline-block bg-slate-900 text-white px-8 py-3 rounded-full text-2xl font-black transition-transform hover:scale-110">
                      {isEn ? pkg.priceEn : pkg.priceAr}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-10">
                    {(isEn ? pkg.featuresEn : pkg.featuresAr).map((feat, i) => (
                      <li key={i} className={`flex items-start animate-reveal-right`} style={{animationDelay: `${i * 100 + 300}ms`}}>
                        <div className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center mr-4 rtl:ml-4 mt-1 flex-shrink-0 animate-float">
                          <i className="fas fa-check text-xs"></i>
                        </div>
                        <span className="text-slate-700 font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-red-600 transition-all shadow-lg active:scale-95">
                    {isEn ? 'BOOK NOW' : 'احجز الآن'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Instructions */}
      <section className="py-20 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-12 rounded-[2rem] shadow-xl border border-slate-100 animate-reveal-up">
             <h2 className="text-3xl font-black text-center mb-12 uppercase italic">{isEn ? 'Booking Process' : 'خطوات الحجز'}</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { step: 1, title: isEn ? 'Pick Package' : 'اختر الباقة', desc: isEn ? 'Choose the best package for your group size.' : 'اختر الباقة الأنسب لمجموعتك.', delay: 'delay-100' },
                 { step: 2, title: isEn ? 'Call Us' : 'اتصل بنا', desc: isEn ? 'Contact our event specialist to confirm availability.' : 'تواصل معنا لتأكيد التوفر.', delay: 'delay-200' },
                 { step: 3, title: isEn ? 'Celebrate' : 'استمتع بالاحتفال', desc: isEn ? 'Enjoy your gravity-defying special day!' : 'استمتع بيومك الخاص مع مغامرة مذهلة!', delay: 'delay-300' },
               ].map((item, i) => (
                 <div key={i} className={`text-center space-y-4 animate-reveal-up ${item.delay}`}>
                   <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold shadow-lg animate-float">
                     {item.step}
                   </div>
                   <h4 className="font-bold text-xl uppercase">{item.title}</h4>
                   <p className="text-slate-500 text-sm">{item.desc}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Parties;
