'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart } from 'lucide-react';
import { photos } from '@/data/site';

type Photo = (typeof photos)[number];
export default function PhotoModal({ photo, onClose }: { photo: Photo | null; onClose: () => void }) {
  useEffect(() => {
    if (!photo) return;
    const handle = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handle);
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handle); document.body.style.overflow = old; };
  }, [photo, onClose]);
  return <AnimatePresence>{photo && <motion.div role="dialog" aria-modal="true" aria-label={photo.title} className="photo-modal-backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <motion.div className="photo-modal-card" initial={{ scale: .88, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .92, y: 20 }} transition={{ type:'spring', stiffness:260, damping:25 }} onClick={e=>e.stopPropagation()}>
      <button className="circle-button modal-close" onClick={onClose} aria-label="Fechar fotografia"><X size={19}/></button>
      <div className="photo-modal-image"><Image src={photo.src} alt={photo.title} fill sizes="(max-width: 700px) 95vw, 60vw" style={{ objectFit:'contain' }} /></div>
      <div className="photo-modal-caption"><span className="tiny-label"><Heart size={13} fill="currentColor"/> MEMÓRIA {String(photo.id).padStart(2,'0')}</span><h3>{photo.title}</h3><p>{photo.subtitle}</p></div>
    </motion.div>
  </motion.div>}</AnimatePresence>;
}
