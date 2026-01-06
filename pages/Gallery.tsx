
import React, { useState, useEffect } from 'react';
import { Language, GalleryImage } from '../types.ts';
import { GALLERY_IMAGES as STATIC_FALLBACK } from '../constants.tsx';
import { supabase } from '../lib/supabase.ts';
import PageBanner from '../components/PageBanner.tsx';

interface GalleryProps {
  lang: Language;
}

const Gallery: React.FC<GalleryProps> = ({ lang }) => {
  const isEn = lang === Language.EN;
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle Escape key to close lightbox
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImg(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setImages(data);
      } else {
        const fallback = STATIC_FALLBACK.map((url, i) => ({ id: i, url }));
        setImages(fallback);
      }
    } catch (err) {
      console.error('Error fetching gallery:', err);
      const fallback = STATIC_FALLBACK.map((url, i) => ({ id: i, url }));
      setImages(fallback);
    } finally {
      setLoading(false);
    }
  };

  const GallerySkeleton = () => (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6" aria-hidden="true">
      {[...Array(9)].map((_, i) => (
        <div 
          key={i} 
          className="break-inside-avoid w-full rounded-3xl bg-slate-100 animate-pulse border border-slate-50"
          style={{ height: `${[280, 420, 340, 390, 310, 460][i % 6]}px` }}
        >
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200/50 rounded-3xl"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500">
      <PageBanner 
        title={isEn ? 'Gallery' : 'معرض الصور'} 
        subtitle={isEn 
          ? 'See the energy, the flips, and the smiles. Our park is built for unforgettable moments.' 
          : 'شاهد الطاقة، الشقلبات، والابتسامات. تم بناء منتزهنا للحظات لا تُنسى.'}
      />

      <section className="py-20 bg-white min-h-[600px]">
        <div className="container mx-auto px-4">
          {loading ? (
            <GallerySkeleton />
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {images.map((img, idx) => (
                <button 
                  key={img.id} 
                  className={`w-full break-inside-avoid relative group cursor-pointer overflow-hidden rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 animate-reveal-up text-left rtl:text-right`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                  onClick={() => setSelectedImg(img.url)}
                  aria-label={isEn ? "View larger image" : "عرض الصورة بحجم أكبر"}
                >
                  <img 
                    src={img.url} 
                    alt={`Gallery item ${idx + 1}`} 
                    className="w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full scale-50 group-hover:scale-100 transition-transform duration-500">
                      <i className="fas fa-expand-alt text-white text-2xl" aria-hidden="true"></i>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {!loading && images.length === 0 && (
            <div className="text-center py-32 space-y-4 animate-reveal-up">
              <i className="fas fa-images text-6xl text-slate-200 animate-float" aria-hidden="true"></i>
              <p className="text-slate-400 font-bold text-xl uppercase tracking-widest">
                {isEn ? 'No images available' : 'لا توجد صور متاحة'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[1000] bg-slate-950/95 flex items-center justify-center p-4 md:p-10 backdrop-blur-sm animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedImg(null)}
        >
          <button 
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white text-3xl transition-all hover:rotate-90"
            aria-label={isEn ? "Close lightbox" : "إغلاق المعرض"}
            autoFocus
          >
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
          <div className="relative group max-w-5xl w-full flex justify-center">
            <img 
              src={selectedImg} 
              className="max-w-full max-h-[85vh] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 object-contain animate-in zoom-in-95 duration-300" 
              alt={isEn ? "Enlarged view" : "عرض مكبر"} 
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
