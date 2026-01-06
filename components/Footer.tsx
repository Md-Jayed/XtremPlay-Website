
import React from 'react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
  onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ lang, onAdminClick }) => {
  const isEn = lang === Language.EN;
  
  const content = {
    rights: isEn ? 'Copyright © Xtremeplay 2024. All rights reserved.' : 'حقوق الطبع والنشر © إكستريم بلاي ٢٠٢٤. جميع الحقوق محفوظة.',
    owned: isEn ? 'Owned and Managed by' : 'مملوكة ومدارة من قبل',
    links: [
      { icon: 'fa-whatsapp', href: 'https://wa.me/9668002440306', label: isEn ? 'WhatsApp' : 'واتساب' },
      { icon: 'fa-instagram', href: '#', label: isEn ? 'Instagram' : 'إنستغرام' },
      { icon: 'fa-tiktok', href: '#', label: isEn ? 'TikTok' : 'تيك توك' },
      { icon: 'fa-facebook', href: '#', label: isEn ? 'Facebook' : 'فيسبوك' }
    ]
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <img 
              src="https://static.wixstatic.com/media/aa4fce_e5b1003f2b574fb391b0321341f54d5d~mv2.png/v1/fill/w_186,h_83,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo.png" 
              className="h-12 w-auto" 
              alt="Xtreme Play Logo" 
            />
            <p className="text-slate-400 max-w-sm">
              {isEn 
                ? 'Saudi Arabia’s leading entertainment destination for families and kids. Experience the rush of gravity-defying fun!'
                : 'الوجهة الترفيهية الرائدة في المملكة العربية السعودية للعائلات والأطفال. استمتع بتجربة المرح وتحدي الجاذبية!'}
            </p>
          </div>

          {/* Quick Contact */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-red-500">{isEn ? 'Contact Us' : 'اتصل بنا'}</h4>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-center gap-3">
                <i className="fas fa-location-dot w-5 text-red-500" aria-hidden="true"></i>
                <span>1st Floor Sultan Mall, Jeddah, KSA</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-phone w-5 text-red-500" aria-hidden="true"></i>
                <span dir="ltr">+966 800 244 0306</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-envelope w-5 text-red-500" aria-hidden="true"></i>
                <span>info@xtremeplay.sa</span>
              </li>
            </ul>
          </div>

          {/* Social & Admin */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-red-500">{isEn ? 'Follow Us' : 'تابعنا'}</h4>
            <div className="flex gap-4 mb-8">
              {content.links.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.href} 
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                >
                  <i className={`fab ${link.icon} text-xl`} aria-hidden="true"></i>
                </a>
              ))}
            </div>
            <button 
              onClick={onAdminClick}
              className="group flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all font-black text-xs uppercase tracking-widest"
              aria-label={isEn ? "Open Admin Access" : "فتح وصول المشرف"}
            >
              <i className="fas fa-shield-halved group-hover:rotate-12 transition-transform" aria-hidden="true"></i>
              <span>{isEn ? 'Admin Access' : 'دخول المشرف'}</span>
            </button>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-500 text-sm">{content.rights}</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-xs uppercase">{content.owned}</span>
            <div className="bg-white/10 p-2 rounded">
                <img src="https://static.wixstatic.com/media/673ddf_866232045ff645168d98a1db6dbe39db~mv2.png/v1/fill/w_145,h_71,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Vim-Logo.png" alt="ViM Logo" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
