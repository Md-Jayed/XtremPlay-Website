
import React, { useState } from 'react';
import { Language } from '../types';

interface ContactProps {
  lang: Language;
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const isEn = lang === Language.EN;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="animate-in fade-in duration-500">
      <section className="bg-slate-900 py-24 text-center text-white relative">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
             {isEn ? 'Get In Touch' : 'تواصل معنا'}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {isEn 
              ? 'Have a question or want to book a private event? Fill out the form below.'
              : 'لديك سؤال أو ترغب في حجز فعالية خاصة؟ املأ النموذج أدناه.'}
          </p>
        </div>
      </section>

      <section className="py-24 container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Form */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12 animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-4xl"></i>
                </div>
                <h3 className="text-3xl font-black text-slate-900">{isEn ? 'Message Sent!' : 'تم إرسال الرسالة!'}</h3>
                <p className="text-slate-500">{isEn ? 'Thank you for reaching out. Our team will contact you shortly.' : 'شكرًا لتواصلك معنا. سيتصل بك فريقنا قريبًا.'}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase text-slate-400 tracking-widest">{isEn ? 'Full Name' : 'الاسم الكامل'}</label>
                  <input required type="text" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-red-600 outline-none transition-all font-bold" placeholder={isEn ? "John Doe" : "الاسم الكريم"} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <label className="text-sm font-black uppercase text-slate-400 tracking-widest">{isEn ? 'Email' : 'البريد الإلكتروني'}</label>
                    <input required type="email" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-red-600 outline-none transition-all font-bold" placeholder="example@email.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase text-slate-400 tracking-widest">{isEn ? 'Phone' : 'رقم الجوال'}</label>
                    <input required type="tel" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-red-600 outline-none transition-all font-bold" placeholder="05XXXXXXXX" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase text-slate-400 tracking-widest">{isEn ? 'Inquiry Type' : 'نوع الاستفسار'}</label>
                  <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-red-600 outline-none transition-all font-bold appearance-none">
                    <option>{isEn ? 'General Question' : 'استفسار عام'}</option>
                    <option>{isEn ? 'Party Booking' : 'حجز حفلة'}</option>
                    <option>{isEn ? 'School Trip' : 'رحلة مدرسية'}</option>
                    <option>{isEn ? 'Feedback' : 'ملاحظات'}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase text-slate-400 tracking-widest">{isEn ? 'Message' : 'الرسالة'}</label>
                  <textarea rows={4} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-red-600 outline-none transition-all font-bold resize-none" placeholder={isEn ? "Tell us more..." : "اكتب تفاصيل استفسارك..."}></textarea>
                </div>
                <button type="submit" className="w-full py-5 bg-red-600 text-white rounded-2xl text-xl font-black shadow-xl hover:bg-red-700 transition-all active:scale-95">
                  {isEn ? 'SEND MESSAGE' : 'إرسال الرسالة'}
                </button>
              </form>
            )}
          </div>

          {/* Info Card */}
          <div className="space-y-12 py-10">
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-slate-900">{isEn ? 'Get Ready To Jump!' : 'استعد للقفز!'}</h2>
              <p className="text-slate-500 text-lg">
                {isEn 
                  ? 'We are located in the heart of Jeddah, ready to welcome you and your family for a gravity-defying adventure.'
                  : 'نحن نتواجد في قلب جدة، مستعدون لاستقبالك أنت وعائلتك في مغامرة تتحدى الجاذبية.'}
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: 'fa-map-location-dot', titleEn: 'Address', titleAr: 'العنوان', val: '1st Floor Sultan Mall, Jeddah, KSA' },
                { icon: 'fa-phone-volume', titleEn: 'Phone', titleAr: 'الجوال', val: '+966 800 244 0306' },
                { icon: 'fa-envelope-open-text', titleEn: 'Email', titleAr: 'البريد', val: 'info@xtremeplay.sa' },
              ].map((info, i) => (
                <div key={i} className="flex items-center space-x-6 rtl:space-x-reverse">
                  <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                    <i className={`fas ${info.icon} text-2xl`}></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">{isEn ? info.titleEn : info.titleAr}</h4>
                    <p className="text-xl font-bold text-slate-800">{info.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
               <h4 className="font-black mb-6 uppercase tracking-widest text-sm text-slate-400">{isEn ? 'Follow Our Journey' : 'تابع رحلتنا'}</h4>
               <div className="flex space-x-4 rtl:space-x-reverse">
                 {['fa-whatsapp', 'fa-instagram', 'fa-tiktok', 'fa-snapchat'].map((s, idx) => (
                   <a key={idx} href="#" className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-xl text-slate-700 hover:bg-red-600 hover:text-white transition-all">
                     <i className={`fab ${s}`}></i>
                   </a>
                 ))}
               </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
