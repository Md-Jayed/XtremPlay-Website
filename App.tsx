
import React, { useState, useEffect } from 'react';
import { Page, Language, CartItem } from './types.ts';
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
import Cart from './pages/Cart.tsx';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [lang, setLang] = useState<Language>(Language.EN);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    document.documentElement.dir = lang === Language.AR ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    window.scrollTo(0, 0);
  }, [lang, currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (item: Omit<CartItem, 'quantity'>, redirect: boolean = false) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    
    if (redirect) {
      setCurrentPage(Page.Cart);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage(Page.Home);
  };

  const renderPage = () => {
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
      case Page.PlanVisit: return <PlanVisit lang={lang} onAddToCart={addToCart} />;
      case Page.Parties: return <Parties lang={lang} onAddToCart={addToCart} />;
      case Page.SchoolTrips: return <SchoolTrips lang={lang} />;
      case Page.Gallery: return <Gallery lang={lang} />;
      case Page.Contact: return <Contact lang={lang} />;
      case Page.Cart: return (
        <Cart 
          lang={lang} 
          cart={cart} 
          onRemove={removeFromCart} 
          onClear={clearCart}
          onNavigate={setCurrentPage}
        />
      );
      default: return <Home lang={lang} onNavigate={setCurrentPage} />;
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[1000] bg-slate-950 flex flex-col items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <img 
          src="https://static.wixstatic.com/media/aa4fce_e5b1003f2b574fb391b0321341f54d5d~mv2.png/v1/fill/w_186,h_83,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo.png" 
          alt="Xtreme Play Logo" 
          className="h-20 md:h-28 w-auto animate-pulse-soft relative z-10"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden animate-in fade-in duration-700">
      <Header 
        lang={lang} 
        setLang={setLang} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
      />
      <main id="main-content" className="flex-grow pt-20 bg-slate-50">
        {renderPage()}
      </main>
      <Footer lang={lang} onAdminClick={() => setCurrentPage(Page.Admin)} />
    </div>
  );
};

export default App;
