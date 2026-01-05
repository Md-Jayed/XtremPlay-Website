
import React from 'react';
import { Language } from '../types';
import { SCHOOL_TRIP_PACKAGES } from '../constants';

interface SchoolTripsProps {
  lang: Language;
}

const SchoolTrips: React.FC<SchoolTripsProps> = ({ lang }) => {
  const isEn = lang === Language.EN;

  return (
    <div className="animate-in fade-in duration-500">
      <section className="bg-slate-900 py-24 text-center text-white relative">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
             {isEn ? 'School Trips' : 'الرحلات المدرسية'}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {isEn 
              ? 'Educational, active, and fun. Bring your school for a unique experience that builds team spirit.'
              : 'تعليمية، نشطة، وممتعة. أحضر مدرستك لتجربة فريدة تبني روح الفريق.'}
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="max-w-2xl w-full">
            {SCHOOL_TRIP_PACKAGES.map((pkg, idx) => (
              <div 
                key={idx} 
                className="relative rounded-[2rem] overflow-hidden border-4 border-red-600 shadow-2xl transition-all hover:scale-[1.02]"
              >
                <div className="bg-red-600 text-white text-center py-3 font-black uppercase text-sm tracking-widest">
                  {isEn ? 'Best Value For Schools' : 'أفضل قيمة للمدارس'}
                </div>
                
                <div className="p-12">
                  <div className="flex flex-col items-center text-center mb-12">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                      <i className="fas fa-graduation-cap text-4xl text-slate-900"></i>
                    </div>
                    <h3 className="text-4xl font-black text-slate-900 mb-4">{isEn ? pkg.titleEn : pkg.titleAr}</h3>
                    <div className="text-2xl font-black text-red-600">
                      {isEn ? pkg.priceEn : pkg.priceAr}
                    </div>
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    {(isEn ? pkg.featuresEn : pkg.featuresAr).map((feat, i) => (
                      <li key={i} className="flex items-center space-x-3 rtl:space-x-reverse bg-slate-50 p-4 rounded-xl">
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

      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
           <h3 className="text-3xl font-black mb-4">
             {isEn ? 'Special Needs and Large Groups?' : 'احتياجات خاصة أو مجموعات كبيرة؟'}
           </h3>
           <p className="text-xl opacity-90 mb-8">
             {isEn ? 'We accommodate all requirements. Contact our team for customized arrangements.' : 'نحن نلبي جميع المتطلبات. تواصل مع فريقنا لترتيبات مخصصة.'}
           </p>
           <button className="px-10 py-4 bg-white text-blue-600 rounded-full font-black text-lg hover:bg-slate-100 transition-all">
             {isEn ? 'Contact Coordinator' : 'تواصل مع المنسق'}
           </button>
        </div>
      </section>
    </div>
  );
};

export default SchoolTrips;
