
import React, { useState } from 'react';
import { Page, Language } from '../types';
import { NAV_ITEMS } from '../constants';

interface HeaderProps {
  lang: Language;
  setLang: (l: Language) => void;
  currentPage: Page;
  setCurrentPage: (p: Page) => void;
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang, currentPage, setCurrentPage, cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLang = () => {
    setLang(lang === Language.EN ? Language.AR : Language.EN);
  };

  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-[100] h-20 shadow-sm border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        <button 
          className="flex items-center cursor-pointer group shrink-0"
          onClick={() => { setCurrentPage(Page.Home); setIsMenuOpen(false); }}
        >
          <img 
            src="https://static.wixstatic.com/media/aa4fce_e5b1003f2b574fb391b0321341f54d5d~mv2.png/v1/fill/w_186,h_83,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo.png" 
            alt="Xtreme Play Logo" 
            className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </button>

        <nav className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse mx-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`text-[12px] font-bold uppercase tracking-wider transition-all ${
                currentPage === item.id ? 'text-red-600' : 'text-slate-900 hover:text-red-600'
              }`}
            >
              {lang === Language.EN ? item.labelEn : item.labelAr}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* Cart Button */}
          <button 
            onClick={() => setCurrentPage(Page.Cart)}
            className="relative w-10 h-10 flex items-center justify-center text-slate-900 hover:text-red-600 transition-colors"
            aria-label="View Cart"
          >
            <i className="fas fa-shopping-cart text-xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={toggleLang}
            className="bg-[#E2352B] text-white px-4 md:px-6 py-2 rounded-lg font-black text-xs md:text-sm uppercase transition-all hover:brightness-110 shadow-md"
          >
            {lang === Language.EN ? 'عربي' : 'English'}
          </button>

          <button className="lg:hidden p-2 text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars-staggered'} text-2xl`}></i>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white shadow-2xl py-8 px-6">
          <nav className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { setCurrentPage(item.id); setIsMenuOpen(false); }}
                className={`w-full text-left rtl:text-right px-6 py-4 rounded-xl text-lg font-black uppercase tracking-widest ${
                  currentPage === item.id ? 'bg-red-600 text-white' : 'text-slate-900 hover:bg-slate-50'
                }`}
              >
                {lang === Language.EN ? item.labelEn : item.labelAr}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
