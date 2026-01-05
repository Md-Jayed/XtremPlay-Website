
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

  // Apply direction based on language
  useEffect(() => {
    document.documentElement.dir = lang === Language.AR ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    window.scrollTo(0, 0); // Scroll to top on page change
  }, [lang, currentPage]);

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

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header 
        lang={lang} 
        setLang={setLang} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />
      <main className="flex-grow pt-20 bg-slate-50">
        {renderPage()}
      </main>
      <Footer lang={lang} onAdminClick={() => setCurrentPage(Page.Admin)} />
      
      {/* Floating Booking CTA for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <button 
          onClick={() => setCurrentPage(Page.Contact)}
          className="bg-red-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
        >
          <i className="fas fa-calendar-check text-2xl"></i>
        </button>
      </div>
    </div>
  );
};

export default App;
