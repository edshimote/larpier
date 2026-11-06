'use client';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Heart } from 'lucide-react';
import { letter } from '@/data/site';
const confetti = Array.from({length:54}, (_,i) => ({left: `${((i*41)%97)+1}%`, delay: `${((i*7)%13)*.12}s`, duration: `${2.9+((i*11)%8)*.35}s`, rotate: `${(i*59)%360}deg` }));
export default function LoveLetter({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(()=>{
    if(!open) return;
    const old = document.body.style.overflow; document.body.style.overflow='hidden';
    const handler = (e:KeyboardEvent) => { if(e.key==='Escape')onClose(); };
    document.addEventListener('keydown',handler);
    return ()=>{document.body.style.overflow=old;document.removeEventListener('keydown',handler);};
  },[open,onClose]);
  return <AnimatePresence>{open && <motion.div role="dialog" aria-modal="true" aria-label="Carta de aniversário para Kelkel" className="letter-backdrop" onClick={onClose} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
    <div className="confetti-holder" aria-hidden="true">{confetti.map((p,i)=><i key={i} style={{left:p.left,animationDelay:p.delay,animationDuration:p.duration,transform:`rotate(${p.rotate})`,backgroundColor:i%3===0?'#ffd5e8':i%3===1?'#a390ff':'#f6dba3'}}/>)}</div>
    <motion.div className="letter-sheet" onClick={e=>e.stopPropagation()} initial={{scale:.82,rotate:-4,y:70}} animate={{scale:1,rotate:0,y:0}} exit={{scale:.9,rotate:4,y:40}} transition={{type:'spring',stiffness:200,damping:22}}>
      <button className="circle-button letter-close" onClick={onClose} aria-label="Fechar carta"><X size={19}/></button>
      <div className="letter-ornament">✧ &nbsp; 06 · 11 · 2026 &nbsp; ✧</div>
      <span className="letter-heart"><Heart size={28} fill="currentColor"/></span>
      <h2>Para minha princesa,</h2>
      {letter.map((paragraph,i)=><p key={i}>{paragraph}</p>)}
      <div className="letter-signature">Com todo o meu amor, <span>para sempre ♡</span></div>
    </motion.div>
  </motion.div>}</AnimatePresence>;
}
