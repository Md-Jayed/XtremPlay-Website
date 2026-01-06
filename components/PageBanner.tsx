
import React from 'react';

interface PageBannerProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
}

const PageBanner: React.FC<PageBannerProps> = ({ 
  title, 
  subtitle, 
  bgImage = "https://static.wixstatic.com/media/aa4fce_b199dda0f8764e7080a6a9a8af808d93~mv2.jpg/v1/fill/w_1082,h_318,al_c,q_80,enc_avif,quality_auto/aa4fce_b199dda0f8764e7080a6a9a8af808d93~mv2.jpg" 
}) => {
  return (
    <section className="relative min-h-[45vh] md:min-h-[55vh] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background with Graffiti Texture and Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImage} 
          className="w-full h-full object-cover opacity-60 animate-zoom-bg" 
          alt="" 
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/80"></div>
      </div>

      {/* Decorative Dots inspired by screenshot */}
      <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-600 rounded-full animate-float delay-100 border border-white/20"></div>
        <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-[#001F2D] rounded-full animate-float delay-300 border border-white/20"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-red-600 rounded-full animate-float delay-500 border border-white/20"></div>
        <div className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-white rounded-full animate-pulse-soft delay-200 opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-20 text-center">
        <div className="inline-block relative">
          {/* Main Layered Title */}
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter xtreme-banner-text animate-reveal-down">
            {title}
          </h1>
          
          {/* Subtitle if exists */}
          {subtitle && (
            <p className="mt-6 text-xl md:text-2xl text-white font-bold max-w-2xl mx-auto animate-reveal-up delay-200 drop-shadow-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
