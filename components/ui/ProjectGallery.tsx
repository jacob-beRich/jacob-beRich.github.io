
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ImageOff } from 'lucide-react';

interface ProjectGalleryProps {
  images: string[];
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  // Function to handle image load errors (e.g., local file not found)
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1623018035782-b269248df916?q=80&w=2070&auto=format&fit=crop"; // Fallback abstract tech image
    e.currentTarget.alt = "Image not found";
    e.currentTarget.classList.add("opacity-50", "grayscale"); // Visual cue for fallback
  };

  return (
    <>
      {/* Masonry Layout (Waterfall) */}
      <div className="mt-8 columns-1 md:columns-2 gap-4 space-y-4">
        {images.map((src, index) => (
          <motion.div
            key={index}
            layoutId={`img-${src}-${index}`}
            onClick={() => setSelectedImage(src)}
            whileHover={{ scale: 1.02, y: -5 }}
            className="relative cursor-zoom-in rounded-xl overflow-hidden border border-white/10 bg-slate-800 break-inside-avoid group shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 mb-4 min-h-[200px] flex items-center justify-center"
          >
             {/* Image */}
            <img 
              src={src} 
              alt={`Project detail ${index + 1}`} 
              className="w-full h-auto block min-h-[200px] object-cover bg-slate-900"
              loading="lazy"
              onError={handleImageError}
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
               <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase">
                  <ZoomIn className="w-4 h-4" />
                  <span>View Fullres</span>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button 
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
                <X className="w-6 h-6" />
            </button>

            {/* Main Image Container */}
            <motion.div
              layoutId={`img-${selectedImage}-${images.indexOf(selectedImage)}`}
              className="relative w-full h-full flex items-center justify-center pointer-events-none"
            >
              <img
                src={selectedImage}
                alt="Fullview"
                className="max-w-full max-h-full object-contain shadow-2xl rounded-sm bg-black"
                onError={handleImageError}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
