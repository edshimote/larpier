'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star } from 'lucide-react';
const points = [
  { x: '24%', y: '29%' }, { x: '41%', y: '17%' }, { x: '59%', y: '17%' }, { x: '76%', y: '29%' },
  { x: '66%', y: '55%' }, { x: '50%', y: '80%' }, { x: '34%', y: '55%' },
];
export default function StarHeart() {
  const [active, setActive] = useState<number[]>([]);
  const complete = active.length === points.length;
  return <div className="star-heart-wrap">
    <svg className="star-connectors" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points="24,29 41,17 50,34 59,17 76,29 66,55 50,80 34,55 24,29" stroke="rgba(249,189,244,.52)" strokeWidth=".5" fill="none" strokeDasharray="1.7 1.7" /></svg>
    {points.map((p,i)=><button key={i} className={`touch-star ${active.includes(i) ? 'lit' : ''}`} style={{ left:p.x, top:p.y }} aria-label={`Acender estrela ${i+1}`} aria-pressed={active.includes(i)} onClick={()=>setActive(a=>a.includes(i)?a:[...a,i])}><Star size={26} fill={active.includes(i) ? 'currentColor' : 'none'} /></button>)}
    <AnimatePresence mode="wait"><motion.div key={complete?'done':'pending'} className="star-heart-caption" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
      {complete ? <><strong>Você é a minha constelação favorita.</strong><span>Em qualquer universo, seria você. ✦</span></> : <><strong>Acenda as estrelas do nosso destino</strong><span>{active.length} de {points.length} estrelas acesas</span></>}
    </motion.div></AnimatePresence>
  </div>;
}
