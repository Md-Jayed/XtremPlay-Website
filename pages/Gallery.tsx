
import React, { useState, useEffect } from 'react';
import { Language, GalleryImage } from '../types.ts';
import { GALLERY_IMAGES as STATIC_FALLBACK } from '../constants.tsx';
import { supabase } from '../lib/supabase.ts';

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
        // Fallback to static if DB is empty
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

      <section className="py-20 bg-white min-h-[400px]">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <i className="fas fa-spinner fa-spin text-4xl text-red-600"></i>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {images.map((img) => (
                <div 
                  key={img.id} 
                  className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-3xl border border-slate-100"
                  onClick={() => setSelectedImg(img.url)}
                >
                  <img 
                    src={img.url} 
                    alt="Gallery item" 
                    className="w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-red-600/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <i className="fas fa-expand text-white text-4xl"></i>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-8 right-8 text-white text-3xl hover:scale-125 transition-transform">
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
