
import React from 'react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
  onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ lang, onAdminClick }) => {
  const content = {
    rights: lang === Language.EN ? 'Copyright © Xtremeplay 2024. All rights reserved.' : 'حقوق الطبع والنشر © إكستريم بلاي ٢٠٢٤. جميع الحقوق محفوظة.',
    owned: lang === Language.EN ? 'Owned and Managed by' : 'مملوكة ومدارة من قبل',
    links: [
      { icon: 'fa-whatsapp', href: 'https://wa.me/9668002440306' },
      { icon: 'fa-instagram', href: '#' },
      { icon: 'fa-tiktok', href: '#' },
      { icon: 'fa-facebook', href: '#' }
    ]
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <img 
              src="https://www.xtremeplay.sa/wp-content/uploads/2020/11/xtreme-logo-300x127.png" 
              className="h-12 w-auto object-contain brightness-0 invert" 
              alt="Logo" 
            />
            <p className="text-slate-400 max-w-sm">
              {lang === Language.EN 
                ? 'Saudi Arabia’s leading entertainment destination for families and kids. Experience the rush of gravity-defying fun!'
                : 'الوجهة الترفيهية الرائدة في المملكة العربية السعودية للعائلات والأطفال. استمتع بتجربة المرح وتحدي الجاذبية!'}
            </p>
          </div>

          {/* Quick Contact */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-red-500">{lang === Language.EN ? 'Contact Us' : 'اتصل بنا'}</h4>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-center gap-3">
                <i className="fas fa-location-dot w-5 text-red-500"></i>
                <span>1st Floor Sultan Mall, Jeddah, KSA</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-phone w-5 text-red-500"></i>
                <span dir="ltr">+966 800 244 0306</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-envelope w-5 text-red-500"></i>
                <span>info@xtremeplay.sa</span>
              </li>
            </ul>
          </div>

          {/* Social & Admin */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-red-500">{lang === Language.EN ? 'Follow Us' : 'تابعنا'}</h4>
            <div className="flex gap-4 mb-8">
              {content.links.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.href} 
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className={`fab ${link.icon} text-xl`}></i>
                </a>
              ))}
            </div>
            <button 
              onClick={onAdminClick}
              className="group flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all font-black text-xs uppercase tracking-widest"
            >
              <i className="fas fa-shield-halved group-hover:rotate-12 transition-transform"></i>
              <span>{lang === Language.EN ? 'Admin Access' : 'دخول المشرف'}</span>
            </button>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-500 text-sm">{content.rights}</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-xs uppercase">{content.owned}</span>
            <div className="bg-white/10 p-2 rounded">
                <img src="https://www.xtremeplay.sa/wp-content/uploads/2020/11/VIM-Logo-01-300x127.png" alt="ViM" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
