
import React, { useState } from 'react';
import { Page, Language } from '../types';
import { NAV_ITEMS } from '../constants';

interface HeaderProps {
  lang: Language;
  setLang: (l: Language) => void;
  currentPage: Page;
  setCurrentPage: (p: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang, currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLang = () => {
    setLang(lang === Language.EN ? Language.AR : Language.EN);
  };

  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-[100] h-20 shadow-sm border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer group shrink-0"
          onClick={() => { setCurrentPage(Page.Home); setIsMenuOpen(false); }}
        >
          <img 
            src="https://static.wixstatic.com/media/aa4fce_e5b1003f2b574fb391b0321341f54d5d~mv2.png/v1/fill/w_186,h_83,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo.png" 
            alt="Xtreme Play Logo" 
            className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse mx-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`text-[12px] font-bold uppercase tracking-wider transition-all duration-200 ${
                currentPage === item.id 
                ? 'text-red-600' 
                : 'text-slate-900 hover:text-red-600'
              }`}
            >
              {lang === Language.EN ? item.labelEn : item.labelAr}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse shrink-0">
          <button
            onClick={toggleLang}
            className="bg-[#E2352B] text-white px-4 md:px-8 py-2 md:py-2.5 rounded-lg font-black text-xs md:text-sm uppercase transition-all hover:brightness-110 active:scale-95 shadow-md"
          >
            {lang === Language.EN ? 'عربي' : 'English'}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-slate-900 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars-staggered'} text-2xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white shadow-2xl py-8 px-6 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left rtl:text-right px-6 py-4 rounded-xl text-lg font-black uppercase tracking-widest transition-colors ${
                  currentPage === item.id 
                  ? 'bg-red-600 text-white shadow-lg' 
                  : 'text-slate-900 hover:bg-slate-50'
                }`}
              >
                {lang === Language.EN ? item.labelEn : item.labelAr}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
