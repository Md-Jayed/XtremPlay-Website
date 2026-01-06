
import React from 'react';
import { Language } from '../types';
import { SCHOOL_TRIP_PACKAGES } from '../constants';
import PageBanner from '../components/PageBanner.tsx';

interface SchoolTripsProps {
  lang: Language;
}

const SchoolTrips: React.FC<SchoolTripsProps> = ({ lang }) => {
  const isEn = lang === Language.EN;

  return (
    <div className="animate-in fade-in duration-500">
      <PageBanner 
        title={isEn ? 'School Trips' : 'الرحلات المدرسية'} 
        subtitle={isEn 
          ? 'Educational, active, and fun. Bring your school for a unique experience that builds team spirit.'
          : 'تعليمية، نشطة، وممتعة. أحضر مدرستك لتجربة فريدة تبني روح الفريق.'}
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="max-w-2xl w-full">
            {SCHOOL_TRIP_PACKAGES.map((pkg, idx) => (
              <div 
                key={idx} 
                className="relative rounded-[2rem] overflow-hidden border-4 border-red-600 shadow-2xl transition-all hover:scale-[1.02] animate-reveal-up"
              >
                <div className="bg-red-600 text-white text-center py-3 font-black uppercase text-sm tracking-widest animate-pulse-soft">
                  {isEn ? 'Best Value For Schools' : 'أفضل قيمة للمدارس'}
                </div>
                
                <div className="p-12">
                  <div className="flex flex-col items-center text-center mb-12">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 animate-float">
                      <i className="fas fa-graduation-cap text-4xl text-slate-900"></i>
                    </div>
                    <h3 className="text-4xl font-black text-slate-900 mb-4 uppercase italic">{isEn ? pkg.titleEn : pkg.titleAr}</h3>
                    <div className="text-2xl font-black text-red-600">
                      {isEn ? pkg.priceEn : pkg.priceAr}
                    </div>
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    {(isEn ? pkg.featuresEn : pkg.featuresAr).map((feat, i) => (
                      <li key={i} className="flex items-center space-x-3 rtl:space-x-reverse bg-slate-50 p-4 rounded-xl animate-reveal-right" style={{animationDelay: `${i*100 + 400}ms`}}>
                        <i className="fas fa-check-circle text-red-600"></i>
                        <span className="text-slate-700 font-bold">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-2xl hover:bg-red-700 transition-all shadow-xl active:scale-95">
                    {isEn ? 'REQUEST BOOKING' : 'طلب حجز'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#E2352B] text-white overflow-hidden">
        <div className="container mx-auto px-4 text-center animate-reveal-up">
           <h3 className="text-3xl md:text-5xl font-black mb-6 uppercase italic">
             {isEn ? 'Special Needs or Large Groups?' : 'احتياجات خاصة أو مجموعات كبيرة؟'}
           </h3>
           <p className="text-xl opacity-90 mb-10 max-w-3xl mx-auto">
             {isEn ? 'We accommodate all requirements. Contact our team for customized arrangements and private social hours.' : 'نحن نلبي جميع المتطلبات. تواصل مع فريقنا لترتيبات مخصصة وساعات اجتماعية خاصة.'}
           </p>
           <button className="px-12 py-5 bg-white text-[#E2352B] rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl">
             {isEn ? 'Contact Coordinator' : 'تواصل مع المنسق'}
           </button>
        </div>
      </section>
    </div>
  );
};

export default SchoolTrips;
