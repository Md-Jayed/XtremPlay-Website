
import React from 'react';
import { Language } from '../types';

interface PlanVisitProps {
  lang: Language;
}

const PlanVisit: React.FC<PlanVisitProps> = ({ lang }) => {
  const isEn = lang === Language.EN;

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-500">
      {/* Header */}
      <section className="bg-slate-900 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <img src="https://picsum.photos/id/1035/1920/600" className="w-full h-full object-cover" alt="bg" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            {isEn ? 'Plan Your Visit' : 'خطط لزيارتك'}
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            {isEn 
              ? 'Test your jumping skills on various obstacles, shoot hoops, or dive into the largest foam pits in Saudi!'
              : 'اختبر مهاراتك في القفز على عوائق متنوعة، سجل الأهداف، أو انطلق في أكبر حفر رغوية في المملكة!'}
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Location */}
          <div className="bg-slate-900 text-white rounded-3xl p-10 flex flex-col items-center text-center shadow-2xl">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-8">
              <i className="fas fa-location-dot text-2xl"></i>
            </div>
            <h3 className="text-2xl font-black mb-4 uppercase tracking-wider">{isEn ? 'Location' : 'الموقع'}</h3>
            <p className="text-slate-400 mb-8">
              1st Floor Sultan Mall,<br />
              Jeddah, KSA
            </p>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noreferrer"
              className="mt-auto px-8 py-3 border-2 border-white/20 rounded-full font-bold hover:bg-white hover:text-slate-900 transition-all"
            >
              {isEn ? 'Get Directions' : 'احصل على الاتجاهات'}
            </a>
          </div>

          {/* Timings */}
          <div className="bg-amber-400 text-slate-900 rounded-3xl p-10 flex flex-col items-center text-center shadow-2xl">
            <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center mb-8">
              <i className="fas fa-clock text-2xl"></i>
            </div>
            <h3 className="text-2xl font-black mb-6 uppercase tracking-wider">{isEn ? 'Timings' : 'الأوقات'}</h3>
            <div className="space-y-6">
              <div>
                <div className="font-black text-sm uppercase opacity-60 mb-1">{isEn ? 'Sat - Wed' : 'السبت - الأربعاء'}</div>
                <div className="text-xl font-bold">3 PM - 11 PM</div>
              </div>
              <div className="w-12 h-[2px] bg-slate-900/20 mx-auto"></div>
              <div>
                <div className="font-black text-sm uppercase opacity-60 mb-1">{isEn ? 'Thu - Fri' : 'الخميس - الجمعة'}</div>
                <div className="text-xl font-bold">3 PM - 12 AM</div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-red-600 text-white rounded-3xl p-10 flex flex-col items-center text-center shadow-2xl">
            <div className="w-16 h-16 bg-white text-red-600 rounded-full flex items-center justify-center mb-8">
              <i className="fas fa-ticket text-2xl"></i>
            </div>
            <h3 className="text-2xl font-black mb-6 uppercase tracking-wider">{isEn ? 'Entry Access' : 'تذكرة الدخول'}</h3>
            <div className="space-y-6 w-full">
              <div className="bg-black/10 p-4 rounded-2xl">
                <div className="text-sm font-bold opacity-80 uppercase mb-1">{isEn ? 'Weekdays' : 'أيام الأسبوع'}</div>
                <div className="text-3xl font-black">89 SR</div>
              </div>
              <div className="bg-black/10 p-4 rounded-2xl">
                <div className="text-sm font-bold opacity-80 uppercase mb-1">{isEn ? 'Weekends & Holidays' : 'الويكند والإجازات'}</div>
                <div className="text-3xl font-black">125 SR</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Note Section */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <i className="fas fa-info-circle text-4xl text-blue-600 mb-6"></i>
          <p className="text-slate-600 text-lg leading-relaxed italic">
            {isEn 
              ? 'Safety is our top priority. All visitors must wear Xtreme Play grip socks and follow our safety guidelines. Children under 12 must be supervised by an adult at all times.'
              : 'السلامة هي أولويتنا القصوى. يجب على جميع الزوار ارتداء جوارب إكستريم بلاي واتباع إرشادات السلامة الخاصة بنا. يجب أن يشرف شخص بالغ على الأطفال دون سن ١٢ عامًا في جميع الأوقات.'}
          </p>
        </div>
      </section>
    </div>
  );
};

export default PlanVisit;
