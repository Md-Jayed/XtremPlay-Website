
import React, { useState, useEffect } from 'react';
import { Page, Language } from './types.ts';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import PlanVisit from './pages/PlanVisit.tsx';
import Parties from './pages/Parties.tsx';
import SchoolTrips from './pages/SchoolTrips.tsx';
import Gallery from './pages/Gallery.tsx';
import Contact from './pages/Contact.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import Login from './pages/Login.tsx';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [lang, setLang] = useState<Language>(Language.EN);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Apply direction based on language
  useEffect(() => {
    document.documentElement.dir = lang === Language.AR ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    window.scrollTo(0, 0); // Scroll to top on page change
  }, [lang, currentPage]);

  // Website Loading Simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds for a punchy intro
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage(Page.Home);
  };

  const renderPage = () => {
    // Protected Admin Route
    if (currentPage === Page.Admin) {
      if (!isAuthenticated) {
        return (
          <Login 
            lang={lang} 
            onLoginSuccess={() => setIsAuthenticated(true)} 
            onCancel={() => setCurrentPage(Page.Home)}
          />
        );
      }
      return <AdminDashboard lang={lang} onLogout={handleLogout} />;
    }

    switch (currentPage) {
      case Page.Home: return <Home lang={lang} onNavigate={setCurrentPage} />;
      case Page.PlanVisit: return <PlanVisit lang={lang} />;
      case Page.Parties: return <Parties lang={lang} />;
      case Page.SchoolTrips: return <SchoolTrips lang={lang} />;
      case Page.Gallery: return <Gallery lang={lang} />;
      case Page.Contact: return <Contact lang={lang} />;
      default: return <Home lang={lang} onNavigate={setCurrentPage} />;
    }
  };

  if (isLoading) {
    return (
      <div 
        className="fixed inset-0 z-[1000] bg-slate-950 flex flex-col items-center justify-center overflow-hidden"
        role="status"
        aria-live="polite"
      >
        {/* Animated background flare */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] animate-pulse"></div>
        
        <div className="relative z-10 flex flex-col items-center space-y-8">
          <div className="animate-float">
            <img 
              src="https://static.wixstatic.com/media/aa4fce_e5b1003f2b574fb391b0321341f54d5d~mv2.png/v1/fill/w_186,h_83,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo.png" 
              alt="Xtreme Play Logo" 
              className="h-20 md:h-28 w-auto animate-pulse-soft"
            />
          </div>
          
          {/* Loading Bar */}
          <div 
            className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden relative"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={lang === Language.EN ? "Loading page content" : "جاري تحميل محتوى الصفحة"}
          >
            <div className="absolute inset-0 bg-red-600 rounded-full w-0 animate-[loading_2s_ease-in-out_forwards]"></div>
          </div>
          
          <div className="text-white/40 font-black tracking-[0.3em] uppercase text-[10px] animate-pulse">
            {lang === Language.EN ? 'Loading Adventure' : 'جاري تحميل المغامرة'}
          </div>
        </div>

        <style>{`
          @keyframes loading {
            0% { width: 0%; }
            20% { width: 15%; }
            50% { width: 60%; }
            80% { width: 95%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden animate-in fade-in duration-700">
      <a href="#main-content" className="skip-link">
        {lang === Language.EN ? 'Skip to Content' : 'تخطي إلى المحتوى الرئيسي'}
      </a>
      <Header 
        lang={lang} 
        setLang={setLang} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />
      <main id="main-content" className="flex-grow pt-20 bg-slate-50">
        {renderPage()}
      </main>
      <Footer lang={lang} onAdminClick={() => setCurrentPage(Page.Admin)} />
      
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-[90]">
        <a 
          href="https://wa.me/966572321849" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-[0_10px_25px_-5px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
          aria-label={lang === Language.EN ? "Chat with us on WhatsApp" : "تواصل معنا عبر واتساب"}
        >
          <i className="fab fa-whatsapp text-3xl md:text-4xl" aria-hidden="true"></i>
          <span className={`absolute ${lang === Language.AR ? 'left-full ml-4' : 'right-full mr-4'} bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block`}>
            {lang === Language.EN ? 'Chat with us!' : 'تواصل معنا!'}
          </span>
        </a>
      </div>

      {/* Floating Booking CTA for Mobile */}
      <div className="fixed bottom-6 left-6 md:hidden z-50">
        <button 
          onClick={() => setCurrentPage(Page.Contact)}
          className="bg-red-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
          aria-label={lang === Language.EN ? "Book a visit" : "احجز زيارة"}
        >
          <i className="fas fa-calendar-check text-2xl" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};

export default App;
