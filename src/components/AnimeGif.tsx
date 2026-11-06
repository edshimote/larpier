'use client';
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface Props { src: string; label: string; className?: string; sourcePage?: string; }
export default function AnimeGif({ src, label, className = '', sourcePage }: Props) {
  const [failed, setFailed] = useState(false);
  return <div className={`anime-gif ${className}`}>
    {!failed ? <img loading="lazy" decoding="async" src={src} alt={`GIF animado de ${label}`} onError={() => setFailed(true)} /> : <div className="gif-fallback"><span>✦</span><small>{label}</small></div>}
    <span className="gif-tag">{label}</span>
    {sourcePage && <a href={sourcePage} target="_blank" rel="noopener noreferrer" aria-label={`Fonte do GIF ${label}`} className="gif-source"><ExternalLink size={13} /></a>}
  </div>;
}
