'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowRight, ChevronDown, Compass, Eye, Gift, Heart, Menu, Sparkles, X } from 'lucide-react';
import { gifs, islands, photos } from '@/data/site';
import AnimeGif from '@/components/AnimeGif';
import Sharingan from '@/components/Sharingan';
import PhotoModal from '@/components/PhotoModal';
import StarHeart from '@/components/StarHeart';
import LoveLetter from '@/components/LoveLetter';
import MusicButton, { type MusicButtonHandle } from '@/components/MusicButton';
import CosmicCanvas from '@/components/CosmicCanvas';
import BirthdayClock from '@/components/BirthdayClock';

type Photo = (typeof photos)[number];
const sections = [
  { id:'infinito',label:'Infinito' },
  { id:'memorias',label:'Memórias' },
  { id:'destino',label:'Destino' },
  { id:'tesouro',label:'Tesouro' },
  { id:'final',label:'Surpresa' },
];
const sourcePages = {
  sasuke:'https://tenor.com/view/sasuke-sharingan-gif-5322036',
  mangekyou:'https://tenor.com/view/sasuke-mangekyou-sharingan-gif-14884501',
  gojo:'https://tenor.com/view/jujutsu-kaisen-satoru-gojo-domain-expansion-gif-19189720',
  infinity:'https://tenor.com/view/gojo-infinity-gif-3208616838225963173',
  mitsuri:'https://tenor.com/view/love-breathing-mitsuri-demon-slayer-demon-slayer-mitsuri-second-form-love-magic-gif-8864902031187457001',
  tanjiro:'https://tenor.com/view/tanjiro-hinokami-kagura-gif-24878132',
  yourName:'https://tenor.com/view/kimi-no-na-wa-your-name-mitsuha-miyamizu-taki-tachibana-anime-gif-25060484',
  luffy:'https://tenor.com/view/luffy-gear-5-gif-15935145260970590707',
};

function GoTo({ id, children, className='' }: { id:string;children:React.ReactNode;className?:string }) {
  return <button className={className} onClick={()=>document.getElementById(id)?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'})}>{children}</button>;
}
function Reveal({ children, className='', delay=0 }: {children:React.ReactNode;className?:string;delay?:number}) {
  const reduce=useReducedMotion();
  return <motion.div className={className} initial={reduce?false:{opacity:0,y:38}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.08}} transition={{duration:.8,delay,ease:[.19,1,.22,1]}}>{children}</motion.div>;
}
function SceneMark({ index, theme, children }: {index:string;theme:string;children:React.ReactNode}) {
  return <div className={`scene-mark ${theme}`}><span className="scene-index">{index}</span><span className="scene-dash"/><span>{children}</span></div>;
}
function Intro({ onEnter, onStartAudio }:{onEnter:()=>void;onStartAudio:()=>void}) {
  const [clicks,setClicks]=useState(0); const [portal,setPortal]=useState(false);
  const reduce=useReducedMotion();
  const enter=()=>{
    if(portal)return;
    // Start background music during the click to comply with autoplay rules.
    onStartAudio();
    setPortal(true);
    window.setTimeout(onEnter,reduce?100:1050);
  };
  return <motion.div className={`intro ${portal?'portal-opening':''}`} initial={{opacity:1}} exit={{opacity:0,scale:1.14}} transition={{duration:reduce ? 0.2 : 0.65}}>
    <div className="intro-aurora"/>
    <div className="intro-line top"/><div className="intro-line bottom"/>
    <div className="intro-top"><span className="intro-brand">K<span>✦</span>K</span><span className="intro-tag">UMA HISTÓRIA ESCRITA ENTRE UNIVERSOS</span></div>
    <div className="intro-content">
      <div className="intro-glyph">UCHIHA <span>✦</span> DESPERTAR</div>
      <div className="intro-eye-stage">
        <img className="intro-anime-underlay" src={clicks>=3 ? gifs.sasukeMangekyou : gifs.sasuke} alt="GIF do Sharingan de Sasuke" loading="eager" />
        <div className="eye-energy first"/><div className="eye-energy second"/>
        <button onClick={()=>setClicks(n=>n+1)} className="intro-eye-button" aria-label="Tocar no Sharingan do Sasuke"><Sharingan mangekyou={clicks>=3}/></button>
        <span className="eye-orbit-text">SASUKE UCHIHA · SHARINGAN</span>
      </div>
      <AnimatePresence mode="wait"><motion.div key={clicks>=3?'secret':'main'} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} className="intro-copy">
        {clicks>=3 ? <><div className="secret-badge">✦ MENSAGEM SECRETA DESBLOQUEADA ✦</div><h1>Em toda realidade,<br/><em>seria você.</em></h1><p>Nem mesmo um genjutsu criaria um mundo mais bonito do que aquele em que te encontrei.</p></> : <><h1>Há um universo<br/><em>feito só para você.</em></h1><p>Algumas histórias não foram escritas para ser contadas. Foram feitas para serem vividas.</p></>}
      </motion.div></AnimatePresence>
      <button className="button-main intro-cta" onClick={enter}><span>DESPERTAR NOSSO INFINITO</span><ArrowRight size={17}/></button>
      <button className="intro-skip" onClick={enter}>PULAR ABERTURA ↗</button>
      <span className="intro-hint"><Eye size={14}/> Toque 3 vezes no olho e descubra um segredo</span>
    </div>
    <div className="intro-footer"><span>06 / 11 / 2026</span><span>FEITO COM AMOR, PARA KELKEL ♡</span></div>
    <div className="intro-portal-flare"/>
  </motion.div>;
}

export default function Home() {
  const [entered,setEntered]=useState(false);
  const musicRef=useRef<MusicButtonHandle>(null);
  const [selected,setSelected]=useState<Photo|null>(null);
  const [letterOpen,setLetterOpen]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  const [active,setActive]=useState('infinito');
  const [visited,setVisited]=useState<string[]>([]);
  const [selectedIsland,setSelectedIsland]=useState<(typeof islands)[number]|null>(null);
  const [chestOpen,setChestOpen]=useState(false);
  const [domainActive,setDomainActive]=useState(false);
  const closePhoto=useCallback(()=>setSelected(null),[]);
  const closeLetter=useCallback(()=>setLetterOpen(false),[]);
  const explore=(id:string)=>{setVisited(v=>v.includes(id)?v:[...v,id]);setSelectedIsland(islands.find(i=>i.id===id)??null);};
  const enter=useCallback(()=>{setEntered(true);window.scrollTo({top:0,behavior:'instant'});},[]);
  useEffect(()=>{
    if(!entered)return;
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
      if(visible[0])setActive(visible[0].target.id);
    },{rootMargin:'-22% 0px -50% 0px',threshold:0});
    sections.forEach(s=>{const el=document.getElementById(s.id);if(el)observer.observe(el);});
    return ()=>observer.disconnect();
  },[entered]);
  const startIntroAudio=()=>{
    musicRef.current?.startFromIntro();
  };
  return <>
    <AnimatePresence>{!entered && <Intro onEnter={enter} onStartAudio={startIntroAudio}/>}</AnimatePresence>
    <main className={!entered?'site-not-entered':''}>
      <header className="site-header">
        <GoTo id="infinito" className="header-logo"><span className="logo-icon">✦</span> KELKEL<span className="logo-end">.∞</span></GoTo>
        <nav className={menuOpen?'header-nav mobile-open':'header-nav'} aria-label="Navegação do universo">{sections.map(s=><GoTo key={s.id} id={s.id} className={active===s.id?'nav-link active':'nav-link'}><span>{s.label}</span></GoTo>)}</nav>
        <div className="header-tools"><MusicButton ref={musicRef}/><button className="mobile-menu" onClick={()=>setMenuOpen(!menuOpen)} aria-label={menuOpen?'Fechar menu':'Abrir menu'}>{menuOpen?<X size={21}/>:<Menu size={21}/>}</button></div>
      </header>

      {/* 02 — Jujutsu Kaisen / Expansão de Domínio */}
      <section id="infinito" className={`section domain-section ${domainActive?'domain-activated':''}`}>
        <div className="domain-cosmic"><CosmicCanvas color="#ba8eff"/></div>
        <div className="ambient-orb orb-one"/><div className="ambient-orb orb-two"/><div className="domain-rings"/>
        <div className="section-container domain-grid">
          <Reveal className="domain-text">
            <SceneMark index="01" theme="violet">JUJUTSU KAISEN · NOSSO INFINITO</SceneMark>
            <span className="hero-kicker">PARA A MINHA PRINCESA, KELKEL</span>
            <h1>Em infinitos<br/>universos, <span>eu<br/>escolheria você.</span></h1>
            <p className="hero-description">Mesmo que existissem infinitas possibilidades, meu coração ainda encontraria o caminho até o seu. Essa é a nossa expansão de domínio.</p>
            <div className="domain-actions"><button className="button-main" onClick={()=>{setDomainActive(v=>!v);}}><Sparkles size={16}/>{domainActive?'DOMÍNIO DESPERTADO ♡':'EXPANSÃO DE DOMÍNIO'}<ArrowRight size={15}/></button><GoTo id="memorias" className="button-ghost">Ver nossas memórias <ArrowDown size={15}/></GoTo></div>
            <div className="hero-quote">“Em meio a todas as estrelas,<br/>meu universo favorito sempre foi você.”</div>
          </Reveal>
          <Reveal className="domain-visual" delay={.2}>
            <div className="domain-halo"/>
            <div className="portrait-arch"><Image src="/photos/7.webp" fill priority sizes="(max-width: 768px) 85vw, 420px" alt="Foto de Kelkel sorrindo" style={{objectFit:'cover',objectPosition:'center 28%'}}/><div className="portrait-tint"/><span className="portrait-signature">my only universe <span>♡</span></span></div>
            <span className="orbital-word orbital-top">無量空処 · INFINITO</span><span className="orbital-word orbital-bottom">MEU AMOR · FOREVER</span>
            <div className="domain-gif-card"><AnimeGif src={gifs.gojo} label="GOJO · DOMÍNIO" sourcePage={sourcePages.gojo}/></div>
            <div className="domain-gif-card secondary"><AnimeGif src={gifs.infinity} label="GOJO · INFINITO" sourcePage={sourcePages.infinity}/></div>
          </Reveal>
        </div>
        <div className="domain-bottom"><span><span className="pulsing-dot"/> UM UNIVERSO PARA NÓS DOIS</span><GoTo id="memorias" className="scroll-cue">DESLIZE PARA CONTINUAR <ChevronDown size={17}/></GoTo></div>
      </section>

      {/* 03 — Demon Slayer */}
      <section id="memorias" className="section memories-section">
        <div className="petal-layer" aria-hidden="true">{Array.from({length:20},(_,i)=><span key={i} className="petal" style={{left:`${(i*37)%99}%`,animationDelay:`${(i*7)%15*.5}s`,animationDuration:`${9+(i%7)*2}s`}}/>)}</div>
        <div className="section-container">
          <Reveal className="section-heading centered"><SceneMark index="02" theme="pink">KIMETSU NO YAIBA · RESPIRAÇÃO DO AMOR</SceneMark><h2>Um milhão de razões<br/><em>para amar você.</em></h2><p>Alguns momentos são tão especiais que mereciam durar para sempre. Aqui estão os meus pedacinhos favoritos do nosso universo.</p></Reveal>
          <Reveal className="gif-couple"><AnimeGif src={gifs.mitsuri} label="MITSURI · RESPIRAÇÃO DO AMOR" sourcePage={sourcePages.mitsuri}/><div className="gif-center-heart">♡<span>LOVE BREATHING</span></div><AnimeGif src={gifs.tanjiro} label="TANJIRO · HINOKAMI KAGURA" sourcePage={sourcePages.tanjiro}/></Reveal>
          <div className="gallery-grid">{photos.map((photo,i)=><Reveal key={photo.id} delay={(i%4)*.07} className={`gallery-item photo-${photo.id}`}><button className="gallery-photo" onClick={()=>setSelected(photo)} aria-label={`Ampliar foto: ${photo.title}`}><Image src={photo.src} alt={photo.title} fill sizes="(max-width: 640px) 48vw, (max-width: 1050px) 45vw, 29vw" style={{objectFit:'cover'}}/><span className="gallery-overlay"><span className="gallery-number">MEMÓRIA / 0{photo.id}</span><span className="gallery-title">{photo.title} <ArrowRight size={17}/></span></span></button></Reveal>)}</div>
          <Reveal className="gallery-endnote"><Heart size={18} fill="currentColor"/> Sete fotografias. Milhões de motivos para sorrir. <Heart size={18} fill="currentColor"/></Reveal>
        </div>
      </section>

      {/* 04 — Your Name */}
      <section id="destino" className="section destiny-section">
        <div className="destiny-sky"><CosmicCanvas color="#ffc3e5"/></div><div className="comet-trail"/>
        <div className="section-container destiny-layout">
          <Reveal className="destiny-copy"><SceneMark index="03" theme="blue">KIMI NO NA WA · YOUR NAME</SceneMark><h2>Não importa<br/><em>quantas vidas.</em></h2><p>Mesmo que o tempo mudasse, mesmo que as lembranças desaparecessem, eu procuraria pelo seu nome entre todas as estrelas.</p><blockquote>“Algumas conexões são fortes demais para se perderem no tempo.”</blockquote><AnimeGif src={gifs.yourName} label="TAKI & MITSUHA · YOUR NAME" className="destiny-gif" sourcePage={sourcePages.yourName}/></Reveal>
          <Reveal className="destiny-interactive" delay={.13}><div className="constellation-border"><span className="star-label">01 / CONECTE NOSSO DESTINO</span><StarHeart/><span className="star-bottom-label">DOIS CORAÇÕES · UM SÓ CÉU</span></div></Reveal>
        </div>
        <div className="film-strip"><span className="film-photo"><Image src="/photos/1.webp" fill sizes="180px" alt="Foto do casal" style={{objectFit:'cover'}}/></span><span className="film-mid">AQUI, ALI, EM TODAS AS VIDAS <strong>♡</strong></span><span className="film-photo"><Image src="/photos/6.webp" fill sizes="180px" alt="Outra foto do casal" style={{objectFit:'cover'}}/></span></div>
      </section>

      {/* 05 — One Piece */}
      <section id="tesouro" className="section treasure-section">
        <div className="section-container">
          <Reveal className="section-heading centered"><SceneMark index="04" theme="gold">ONE PIECE · NOSSA GRANDE AVENTURA</SceneMark><h2>O maior tesouro<br/><em>que eu encontrei.</em></h2><p>Nem todo tesouro está escondido no fim do mundo. O meu está bem aqui, no seu sorriso. Explore as ilhas para abrir o baú.</p></Reveal>
          <Reveal className="treasure-panel"><div className="map-grid"/><svg className="treasure-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M13 56 Q18 18 35 24 Q48 8 64 54 Q70 17 84 22" stroke="#d7ad70" strokeWidth=".65" strokeDasharray="2 2" fill="none" opacity=".75"/></svg>
            <div className="map-compass"><Compass size={30}/><span>N</span></div><span className="map-label label-a">MAR DAS MEMÓRIAS</span><span className="map-label label-b">NAVEGANDO PARA SEMPRE ↗</span>
            {islands.map(island=><button key={island.id} className={`map-island ${visited.includes(island.id)?'visited':''}`} style={island.pos} onClick={()=>explore(island.id)} aria-label={`Explorar ${island.label}`}><span className="island-symbol">{island.emoji}</span><span className="island-label">{island.label}</span></button>)}
            <AnimatePresence mode="wait">{selectedIsland && <motion.div className="island-card" key={selectedIsland.id} initial={{opacity:0,y:15,scale:.95}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:10}}><button className="island-close" onClick={()=>setSelectedIsland(null)} aria-label="Fechar ilha"><X size={15}/></button><div className="island-image"><Image src={`/photos/${selectedIsland.photo}.webp`} alt={selectedIsland.label} fill sizes="90px" style={{objectFit:'cover'}}/></div><div><strong>{selectedIsland.label}</strong><p>{selectedIsland.text}</p></div></motion.div>}</AnimatePresence>
            <div className="map-progress"><span>ILHAS DESCOBERTAS</span><strong>{visited.length} / 4</strong><div className="map-progress-track"><i style={{width:`${visited.length/4*100}%`}}/></div></div>
          </Reveal>
          <Reveal className="treasure-unlock"><button className={`treasure-chest ${chestOpen?'open':''}`} onClick={()=>{if(visited.length>=3){setChestOpen(true);}else{setSelectedIsland(null);}}} aria-label="Abrir baú do tesouro"><Gift size={34}/>{chestOpen?'TESOURO DESCOBERTO':visited.length>=3?'ABRIR O BAÚ':'EXPLORE 3 ILHAS PARA ABRIR'}</button>{visited.length<3 && <p>Faltam {3-visited.length} ilha{3-visited.length===1?'':'s'} para desbloquear a surpresa.</p>}
          <AnimatePresence>{chestOpen && <motion.div className="treasure-reveal" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}><AnimeGif src={gifs.luffy} label="LUFFY · GEAR 5" sourcePage={sourcePages.luffy}/><div><span>O VERDADEIRO ONE PIECE</span><h3>O tesouro é você. ♡</h3><p>O mundo inteiro pode ser imenso. Mas a melhor aventura é viver ao seu lado.</p></div></motion.div>}</AnimatePresence></Reveal>
        </div>
      </section>

      {/* 06 — Final */}
      <section id="final" className="section finale-section"><div className="finale-glow"/><div className="finale-stars" aria-hidden="true">{Array.from({length:35},(_,i)=><i key={i} style={{left:`${(i*37)%96}%`,top:`${(i*23)%91}%`,animationDelay:`${(i%9)*.4}s`}}>✦</i>)}</div>
        <div className="section-container finale-inner"><Reveal className="finale-kicker"><SceneMark index="05" theme="pink">O CAPÍTULO MAIS ESPECIAL</SceneMark></Reveal>
          <Reveal className="finale-title" delay={.12}><span>HOJE, O UNIVERSO CELEBRA VOCÊ</span><h2>Feliz Aniversário,<br/><em>Minha Princesa.</em></h2><p>Para o meu amor. Para a minha Kelkel. Para a pessoa que transforma todos os meus dias em uma história que vale a pena viver.</p></Reveal>
          <Reveal className="birthday-center" delay={.17}><div className="birthday-photo-ring"><div className="birthday-photo"><Image src="/photos/1.webp" alt="Foto especial do casal" fill sizes="(max-width:700px) 70vw, 340px" style={{objectFit:'cover'}}/></div><div className="floating-heart fh-1">♡</div><div className="floating-heart fh-2">✦</div><div className="floating-heart fh-3">♡</div></div></Reveal>
          <Reveal className="birthday-actions"><BirthdayClock/><button className="button-main finale-button" onClick={()=>{setLetterOpen(true);}}><Heart size={18} fill="currentColor"/> ABRIR SUA CARTA DE ANIVERSÁRIO <ArrowRight size={17}/></button><span className="finale-small">Uma última surpresa, escrita de coração para coração.</span></Reveal>
        </div>
      </section>

      <footer className="footer"><span>✦ KELKEL · NOSSO INFINITO</span><p>Se eu pudesse viver mil vidas, escolheria você em cada uma delas.</p><span>06 NOV 2026 <Heart size={13} fill="currentColor"/></span></footer>
      <PhotoModal photo={selected} onClose={closePhoto}/><LoveLetter open={letterOpen} onClose={closeLetter}/>
    </main>
  </>;
}
