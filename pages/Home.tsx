
import React from 'react';
import { Language, Page } from '../types';

interface HomeProps {
  lang: Language;
  onNavigate: (p: Page) => void;
}

const Home: React.FC<HomeProps> = ({ lang, onNavigate }) => {
  const isEn = lang === Language.EN;

  return (
    <div className="animate-in fade-in duration-700">
      {/* Dynamic Hero Section with Video Background */}
      <section className="relative min-h-[calc(100dvh-5rem)] flex items-center overflow-hidden py-12 md:py-0">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-110 md:scale-100"
            poster="https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=2070&auto=format&fit=crop"
          >
            <source src="https://video.wixstatic.com/video/673ddf_991d5e53948b4078a1dfbfa911252cd0/1080p/mp4/file.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/70 to-slate-900/30 rtl:bg-gradient-to-l"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl space-y-4 md:space-y-6">
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-red-600 px-4 py-1.5 rounded-full text-white text-[10px] md:text-xs font-black uppercase tracking-widest animate-bounce">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span>{isEn ? 'Now Open in Jeddah' : 'مفتوح الآن في جدة'}</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-[0.95] md:leading-[0.9] drop-shadow-2xl uppercase">
              {isEn ? (
                <>GRAVITY<br />DEFYING<br /><span className="text-red-600 italic">ADVENTURE!</span></>
              ) : (
                <>مغامرة<br />تتحدى<br /><span className="text-red-600 italic">الجاذبية!</span></>
              )}
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-200 font-medium max-w-xl leading-relaxed">
              {isEn 
                ? 'Saudi Arabia’s leading destination for high-energy family fun and unforgettable birthday celebrations.'
                : 'الوجهة الرائدة في المملكة العربية السعودية للمرح العائلي المليء بالطاقة واحتفالات أعياد الميلاد التي لا تُنسى.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6 md:pt-8">
              <button 
                onClick={() => onNavigate(Page.Contact)}
                className="group relative px-10 py-4 md:px-12 md:py-5 bg-red-600 text-white rounded-xl text-lg md:text-xl font-black overflow-hidden shadow-[0_10px_40px_-10px_rgba(220,38,38,0.5)] transition-all hover:-translate-y-1 active:scale-95 text-center"
              >
                <span className="relative z-10">{isEn ? 'BOOK NOW' : 'احجز الآن'}</span>
                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 opacity-10"></div>
              </button>
              <button 
                onClick={() => onNavigate(Page.PlanVisit)}
                className="px-10 py-4 md:px-12 md:py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl text-lg md:text-xl font-black hover:bg-white/20 transition-all text-center"
              >
                {isEn ? 'EXPLORE PARK' : 'استكشف المنتزه'}
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce hidden md:block">
          <i className="fas fa-chevron-down text-2xl"></i>
        </div>
      </section>

      {/* Services Section with Navy Theme */}
      <section className="py-24 md:py-32 bg-[#001F2D] text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 md:mb-24 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight italic">
              {isEn ? 'UNLEASH THE FUN!' : 'أطلق العنان للمرح!'}
            </h2>
            <p className="text-slate-400">
              {isEn ? 'Choose your adventure and experience the most thrilling park in KSA.' : 'اختر مغامرتك واختبر أكثر المنتزهات إثارة في المملكة.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                id: Page.Parties,
                icon: 'fa-cake-candles',
                titleEn: 'Parties', 
                titleAr: 'الحفلات', 
                descEn: 'Looking for a fun loaded and memorable Birthday Party? Elevate the way you celebrate.', 
                descAr: 'تبحث عن حفلة عيد ميلاد مليئة بالمرح ولا تُنسى؟ ارتقِ بطريقة احتفالك معنا.'
              },
              { 
                id: Page.SchoolTrips,
                icon: 'fa-bus-simple',
                titleEn: 'School Trips', 
                titleAr: 'رحلات مدرسية', 
                descEn: 'Plan your school trip and join the new fun way of socializing with your classmates!', 
                descAr: 'خطط لرحلتك المدرسية وانضم إلى الطريقة الجديدة والممتعة للتواصل مع زملائك في الفصل!'
              },
              { 
                id: Page.Contact,
                icon: 'fa-star',
                titleEn: 'Private Booking', 
                titleAr: 'حجز خاص', 
                descEn: 'Planning a corporate event or a private day out? Xtreme Play is accepting private bookings.', 
                descAr: 'تخطط لفعالية شركات أو يوم خاص؟ إكستريم بلاي يستقبل الحجوزات الخاصة.'
              },
            ].map((service, idx) => (
              <div 
                key={idx} 
                className="group flex flex-col items-center text-center p-8 md:p-10 bg-white/5 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] hover:bg-white/10 transition-all duration-500 hover:-translate-y-4"
              >
                <div className="mb-6 md:mb-8 w-20 h-20 md:w-24 md:h-24 bg-red-600 rounded-2xl md:rounded-[2rem] flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform shadow-2xl shadow-red-600/20">
                  <i className={`fas ${service.icon} text-3xl md:text-4xl text-white`}></i>
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-4">{isEn ? service.titleEn : service.titleAr}</h3>
                <p className="text-slate-400 mb-8 leading-relaxed text-sm md:text-base">
                  {isEn ? service.descEn : service.descAr}
                </p>
                <button 
                  onClick={() => onNavigate(service.id)}
                  className="mt-auto px-8 py-3 bg-red-600 text-white font-black rounded-xl uppercase text-sm tracking-widest hover:bg-red-700 transition-colors"
                >
                  {isEn ? 'BOOK NOW' : 'احجز الآن'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two Fun Parks Section */}
      <section className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
              <div className="inline-block">
                <h2 className="text-3xl md:text-5xl font-black text-[#001F2D] relative z-10">
                  {isEn ? 'Two Fun Parks In One' : 'منتزهان في مكان واحد'}
                  <div className="absolute -bottom-2 left-0 w-full h-3 md:h-4 bg-red-600/10 -z-10"></div>
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  {isEn 
                    ? 'Situated in Jeddah, Saudi Arabia, we boast a massive 2600 SQM of entertainment space. You can flip, fly, and jump through the air in our amazing arena!'
                    : 'يقع في جدة، المملكة العربية السعودية، ونفخر بمساحة ترفيهية ضخمة تبلغ ٢٦٠٠ متر مربع. يمكنك الشقلبة والطيران والقفز في الهواء في منطقتنا المذهلة!'}
                </p>
                <p className="font-medium text-slate-800">
                  {isEn 
                    ? 'Your favorite family indoor trampoline park offers a Trampoline Arena, Basketball Corner, Volleyball Court, Giant Airbag, Mini Airbag, Inflatable Giant Slide, Inflatable Obstacle Course, Giant Spinner, Giant Slide, and much more!'
                    : 'يوفر منتزه الترامبولين العائلي الداخلي المفضل لديك منطقة ترامبولين، وركن كرة سلة، وملعب كرة طائرة، ووسادة هوائية عملاقة، وزلاقة ضخمة، ومسار عوائق، والمزيد!'}
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                {[
                  { icon: 'fa-basketball', label: isEn ? 'Basketball' : 'كرة سلة' },
                  { icon: 'fa-volleyball', label: isEn ? 'Volleyball' : 'كرة طائرة' },
                  { icon: 'fa-wind', label: isEn ? 'Giant Airbag' : 'وسادة هوائية' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2 md:space-x-3 rtl:space-x-reverse bg-slate-50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-slate-100">
                    <i className={`fas ${item.icon} text-red-600`}></i>
                    <span className="font-bold text-xs md:text-sm text-[#001F2D]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative mt-8 md:mt-0">
              <div className="relative z-10 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden rotate-2 shadow-2xl border-[10px] md:border-[16px] border-white">
                <img 
                  src="https://static.wixstatic.com/media/673ddf_6a5cd586db4442638dff2bd18f1db3c3~mv2.jpg/v1/crop/x_643,y_0,w_4475,h_3840/fill/w_416,h_357,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/2T7A9895.jpg" 
                  alt="Parks" 
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-32 md:w-40 h-32 md:h-40 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
              <div className="absolute -bottom-10 -left-10 w-48 md:w-64 h-48 md:h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
              <div className="absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 bg-red-600 text-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl z-20 -rotate-12 hidden sm:block">
                <div className="text-2xl md:text-3xl font-black">2600+</div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest">{isEn ? 'Square Meters' : 'متر مربع'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-red-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="grid grid-cols-4 md:grid-cols-6 gap-4 transform -rotate-12 scale-150">
             {Array.from({length: 24}).map((_, i) => (
               <i key={i} className="fas fa-bolt text-7xl md:text-9xl text-white"></i>
             ))}
           </div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
           <h2 className="text-3xl md:text-6xl font-black text-white mb-6 md:mb-8 italic uppercase leading-tight">
             {isEn ? 'Ready to experience the rush?' : 'هل أنت مستعد لتجربة الإثارة؟'}
           </h2>
           <button 
             onClick={() => onNavigate(Page.Contact)}
             className="px-10 py-5 md:px-16 md:py-6 bg-white text-red-600 rounded-xl md:rounded-2xl text-xl md:text-2xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all"
           >
             {isEn ? 'BOOK YOUR JUMP' : 'احجز قفزتك الآن'}
           </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
