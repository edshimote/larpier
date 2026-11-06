'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// The song must start in the same user gesture as the intro button.
// Browsers prevent autoplay with audio before the user interacts.
export type MusicButtonHandle = { startFromIntro: () => void };

const MUSIC_VOLUME = 0.38;
const INTRO_VOLUME = 0.09;
const FADE_DURATION_MS = 1350;

const MusicButton = forwardRef<MusicButtonHandle, object>(function MusicButton(_props, forwardedRef) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeFrameRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState('');

  const stopFade = () => {
    if (fadeFrameRef.current !== null) window.cancelAnimationFrame(fadeFrameRef.current);
    fadeFrameRef.current = null;
  };

  const start = (fromIntro: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;
    stopFade();
    audio.volume = fromIntro ? INTRO_VOLUME : MUSIC_VOLUME;

    // play() is called synchronously during the click, not in a useEffect.
    const request = audio.play();
    void request.then(() => {
      setPlaying(true);
      setMessage('');
    }).catch(() => {
      stopFade();
      setPlaying(false);
      setMessage('Não foi possível reproduzir a música.');
    });

    if (fromIntro) {
      // Smoothly fade in the music immediately; there is no Sharingan SFX.
      let startedAt: number | undefined;
      const tick = (now: number) => {
        if (audio.paused) return;
        if (startedAt === undefined) startedAt = now;
        const progress = Math.min(1, (now - startedAt) / FADE_DURATION_MS);
        audio.volume = INTRO_VOLUME + (MUSIC_VOLUME - INTRO_VOLUME) * progress;
        if (progress < 1) fadeFrameRef.current = window.requestAnimationFrame(tick);
        else fadeFrameRef.current = null;
      };
      fadeFrameRef.current = window.requestAnimationFrame(tick);
    }
  };

  useImperativeHandle(forwardedRef, () => ({
    startFromIntro: () => {
      // If she already turned the music on, don't interrupt/restart it.
      if (!audioRef.current?.paused) return;
      start(true);
    },
  }));

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(''), 4600);
    return () => window.clearTimeout(timer);
  }, [message]);

  useEffect(() => () => {
    if (fadeFrameRef.current !== null) window.cancelAnimationFrame(fadeFrameRef.current);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      stopFade();
      audio.pause();
      setPlaying(false);
    } else {
      start(false);
    }
  };

  return <div className="music-control">
    <audio ref={audioRef} src="/audio/romantic.mp3" preload="auto" loop onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setPlaying(false)} />
    {message && <div className="music-toast" role="status">{message}</div>}
    <button className="music-button" onClick={toggle} aria-label={playing ? 'Pausar música' : 'Tocar música'} title={playing ? 'Pausar música' : 'Tocar música'}>
      {playing ? <Volume2 size={18}/> : <VolumeX size={18}/>}
      <span>{playing ? 'Música ligada' : 'Ativar música'}</span>
    </button>
  </div>;
});

export default MusicButton;
