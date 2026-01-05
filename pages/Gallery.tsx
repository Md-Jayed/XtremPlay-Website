
import React, { useState } from 'react';
import { Language } from '../types';
import { GALLERY_IMAGES } from '../constants';

interface GalleryProps {
  lang: Language;
}

const Gallery: React.FC<GalleryProps> = ({ lang }) => {
  const isEn = lang === Language.EN;
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <div className="animate-in fade-in duration-500">
      <section className="bg-slate-900 py-24 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
             {isEn ? 'Gallery' : 'معرض الصور'}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
             {isEn 
              ? 'See the energy, the flips, and the smiles. Our park is built for unforgettable moments.' 
              : 'شاهد الطاقة، الشقلبات، والابتسامات. تم بناء منتزهنا للحظات لا تُنسى.'}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {GALLERY_IMAGES.map((img, idx) => (
              <div 
                key={idx} 
                className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-3xl"
                onClick={() => setSelectedImg(img)}
              >
                <img 
                  src={img} 
                  alt={`Gallery ${idx}`} 
                  className="w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-red-600/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <i className="fas fa-expand text-white text-4xl"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-8 right-8 text-white text-3xl">
            <i className="fas fa-times"></i>
          </button>
          <img 
            src={selectedImg} 
            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl" 
            alt="Expanded" 
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
