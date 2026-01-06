
import React from 'react';
import { Language, Page } from '../types';

interface HomeProps {
  lang: Language;
  onNavigate: (p: Page) => void;
}

const Home: React.FC<HomeProps> = ({ lang, onNavigate }) => {
  const isEn = lang === Language.EN;

  return (
    <div className="overflow-x-hidden">
      {/* Dynamic Hero Section with Video Background */}
      <section className="relative min-h-[calc(100dvh-5rem)] flex items-center overflow-hidden py-20 sm:py-28 lg:py-32">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover animate-zoom-bg"
            poster="https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=2070&auto=format&fit=crop"
          >
            <source src="https://video.wixstatic.com/video/673ddf_991d5e53948b4078a1dfbfa911252cd0/1080p/mp4/file.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/50 lg:bg-gradient-to-r lg:from-slate-950/95 lg:via-slate-950/40 lg:to-transparent rtl:lg:bg-gradient-to-l"></div>
        </div>
        
        <div className="container mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
          <div className="max-w-4xl space-y-4 md:space-y-6 lg:space-y-8">
            {/* Location Badge */}
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-[#E2352B] px-3 md:px-5 py-1.5 rounded-full text-white text-[10px] md:text-xs font-black uppercase tracking-widest shadow-xl animate-reveal-down">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
              <span>{isEn ? 'Now Open in Jeddah' : 'مفتوح الآن في جدة'}</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] md:leading-[0.85] tracking-tight uppercase drop-shadow-2xl animate-reveal-right delay-100">
              {isEn ? (
                <>
                  <span className="block">GRAVITY</span>
                  <span className="block">DEFYING</span>
                  <span className="block text-[#E2352B] italic mt-1 lg:mt-2 -skew-x-6 transform origin-left">ADVENTURE!</span>
                </>
              ) : (
                <>
                  <span className="block">مغامرة</span>
                  <span className="block">تتحدى</span>
                  <span className="block text-[#E2352B] italic mt-1 lg:mt-2">الجاذبية!</span>
                </>
              )}
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-100 font-bold max-w-2xl leading-relaxed drop-shadow-md animate-reveal-right delay-200">
              {isEn 
                ? "Saudi Arabia’s leading destination for high-energy family fun and unforgettable birthday celebrations."
                : "الوجهة الرائدة في المملكة العربية السعودية للمرح العائلي المليء بالطاقة واحتفالات أعياد الميلاد التي لا تُنسى."}
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6 md:pt-10 animate-reveal-up delay-300">
              <button 
                onClick={() => onNavigate(Page.Contact)}
                className="px-8 py-4 md:px-12 md:py-5 bg-[#E2352B] text-white rounded-xl text-lg font-black uppercase tracking-widest shadow-[0_20px_40px_-10px_rgba(226,53,43,0.5)] transition-all hover:scale-105 hover:brightness-110 active:scale-95 text-center animate-pulse-soft"
              >
                <span>{isEn ? 'BOOK NOW' : 'احجز الآن'}</span>
              </button>
              <button 
                onClick={() => onNavigate(Page.PlanVisit)}
                className="px-8 py-4 md:px-12 md:py-5 bg-white/10 backdrop-blur-lg text-white border-2 border-white/20 rounded-xl text-lg font-black uppercase tracking-widest hover:bg-white hover:text-slate-950 hover:border-white transition-all text-center"
              >
                <span>{isEn ? 'EXPLORE PARK' : 'استكشف المنتزه'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 animate-bounce cursor-pointer hidden md:block" onClick={() => window.scrollTo({top: window.innerHeight - 80, behavior: 'smooth'})}>
          <i className="fas fa-chevron-down text-2xl"></i>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 md:py-32 bg-[#001F2D] text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 md:mb-24 max-w-2xl mx-auto space-y-4 animate-reveal-up">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight italic uppercase">
              {isEn ? 'UNLEASH THE FUN!' : 'أطلق العنان للمرح!'}
            </h2>
            <p className="text-slate-400 text-lg">
              {isEn ? 'Choose your adventure and experience the most thrilling park in KSA.' : 'اختر مغامرتك واختبر أكثر المنتزهات إثارة في المملكة.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                id: Page.Parties,
                icon: 'fa-cake-candles',
                titleEn: 'Parties', 
                titleAr: 'الحفلات', 
                descEn: 'Looking for a fun loaded and memorable Birthday Party? Elevate the way you celebrate.', 
                descAr: 'تبحث عن حفلة عيد ميلاد مليئة بالمرح ولا تُنسى؟ ارتقِ بطريقة احتفالك معنا.',
                delay: 'delay-100'
              },
              { 
                id: Page.SchoolTrips,
                icon: 'fa-bus-simple',
                titleEn: 'School Trips', 
                titleAr: 'رحلات مدرسية', 
                descEn: 'Plan your school trip and join the new fun way of socializing with your classmates!', 
                descAr: 'خطط لرحلتك المدرسية وانضم إلى الطريقة الجديدة والممتعة للتواصل مع زملائك في الفصل!',
                delay: 'delay-200'
              },
              { 
                id: Page.Contact,
                icon: 'fa-star',
                titleEn: 'Private Booking', 
                titleAr: 'حجز خاص', 
                descEn: 'Planning a corporate event or a private day out? Xtreme Play is accepting private bookings.', 
                descAr: 'تخطط لفعالية شركات أو يوم خاص؟ إكستريم بلاي يستقبل الحجوزات الخاصة.',
                delay: 'delay-300'
              },
            ].map((service, idx) => (
              <div 
                key={idx} 
                className={`group flex flex-col items-center text-center p-8 lg:p-12 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 shadow-2xl animate-reveal-up ${service.delay}`}
              >
                <div className="mb-8 w-20 h-20 bg-[#E2352B] rounded-2xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform shadow-xl shadow-red-600/20 animate-float">
                  <i className={`fas ${service.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-2xl lg:text-3xl font-black mb-4 uppercase">{isEn ? service.titleEn : service.titleAr}</h3>
                <p className="text-slate-400 mb-8 leading-relaxed text-sm lg:text-base">
                  {isEn ? service.descEn : service.descAr}
                </p>
                <button 
                  onClick={() => onNavigate(service.id)}
                  className="mt-auto px-8 py-3 bg-[#E2352B] text-white font-black rounded-xl uppercase text-xs tracking-widest hover:brightness-110 transition-all active:scale-95"
                >
                  {isEn ? 'LEARN MORE' : 'لمزيد من المعلومات'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two Fun Parks Section */}
      <section className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="w-full lg:w-1/2 space-y-6 md:space-y-8 animate-reveal-right">
              <div className="inline-block">
                <h2 className="text-3xl md:text-5xl font-black text-[#001F2D] relative z-10 uppercase italic">
                  {isEn ? 'Two Fun Parks In One' : 'منتزهان في مكان واحد'}
                  <div className="absolute -bottom-2 left-0 w-full h-3 md:h-4 bg-[#E2352B]/10 -z-10"></div>
                </h2>
              </div>
              <div className="space-y-4 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  {isEn 
                    ? 'Situated in Jeddah, Saudi Arabia, we boast a massive 2600 SQM of entertainment space. You can flip, fly, and jump through the air in our amazing arena!'
                    : 'يقع في جدة، المملكة العربية السعودية، ونفخر بمساحة ترفيهية ضخمة تبلغ ٢٦٠٠ متر مربع. يمكنك الشقلبة والطيران والقفز في الهواء في منطقتنا المذهلة!'}
                </p>
                <p className="font-bold text-slate-800">
                  {isEn 
                    ? 'Your favorite family indoor trampoline park offers a Trampoline Arena, Basketball Corner, Volleyball Court, Giant Airbag, Mini Airbag, Inflatable Giant Slide, Inflatable Obstacle Course, Giant Spinner, Giant Slide, and much more!'
                    : 'يوفر منتزه الترامبولين العائلي الداخلي المفضل لديك منطقة ترامبولين، وركن كرة سلة، وملعب كرة طائرة، ووسادة هوائية عملاقة، وزلاقة ضخمة، ومسار عوائق، والمزيد!'}
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: 'fa-basketball', label: isEn ? 'Basketball' : 'كرة سلة', delay: 'delay-100' },
                  { icon: 'fa-volleyball', label: isEn ? 'Volleyball' : 'كرة طائرة', delay: 'delay-200' },
                  { icon: 'fa-wind', label: isEn ? 'Giant Airbag' : 'وسادة هوائية', delay: 'delay-300' },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center space-x-2 md:space-x-3 rtl:space-x-reverse bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm animate-reveal-up ${item.delay}`}>
                    <i className={`fas ${item.icon} text-[#E2352B] animate-float`}></i>
                    <span className="font-black uppercase text-[10px] md:text-xs text-[#001F2D]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative animate-reveal-left">
              <div className="relative z-10 rounded-[3rem] md:rounded-[4rem] overflow-hidden rotate-2 shadow-2xl border-[10px] md:border-[15px] border-white transition-transform duration-500 hover:rotate-0 group">
                <img 
                  src="https://static.wixstatic.com/media/673ddf_6a5cd586db4442638dff2bd18f1db3c3~mv2.jpg/v1/crop/x_643,y_0,w_4475,h_3840/fill/w_416,h_357,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/2T7A9895.jpg" 
                  alt="Parks" 
                  className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              <div className="absolute top-1/2 -left-6 md:-left-10 -translate-y-1/2 bg-[#E2352B] text-white p-5 md:p-8 rounded-2xl md:rounded-[2rem] shadow-2xl z-20 -rotate-12 hidden sm:block animate-float">
                <div className="text-3xl md:text-4xl font-black">2600+</div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest">{isEn ? 'Square Meters' : 'متر مربع'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-[#E2352B] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="grid grid-cols-4 md:grid-cols-6 gap-8 transform -rotate-12 scale-150">
             {Array.from({length: 36}).map((_, i) => (
               <i key={i} className="fas fa-bolt text-7xl md:text-9xl text-white animate-pulse-soft" style={{animationDelay: `${i * 100}ms`}}></i>
             ))}
           </div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10 animate-reveal-up">
           <h2 className="text-4xl md:text-7xl font-black text-white mb-8 italic uppercase leading-tight drop-shadow-xl">
             {isEn ? 'Ready to experience the rush?' : 'هل أنت مستعد لتجربة الإثارة؟'}
           </h2>
           <button 
             onClick={() => onNavigate(Page.Contact)}
             className="px-12 py-5 md:px-20 md:py-7 bg-white text-[#E2352B] rounded-2xl text-xl md:text-3xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest animate-pulse-soft"
           >
             {isEn ? 'BOOK YOUR JUMP' : 'احجز قفزتك الآن'}
           </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
