import { useRef, useState } from 'react';
import { SplashGate } from './components/SplashGate';
import { CameraGallery } from './components/CameraGallery';
import { PlaylistSection } from './components/PlaylistSection';
import { RsvpSection } from './components/RsvpSection';
import './styles.css';

const START_SECONDS = 34.5; // Cambiá a los segundos deseados cuando veas que suena

export function App() {
  const [entered, setEntered] = useState(false);
  const audioRef = useRef(null);

  const handleEnter = async () => {
    const audio = audioRef.current;
    setEntered(true);

    if (!audio) return;
    audio.volume = 0.6;

    const playFromStart = async () => {
      try {
        if (START_SECONDS > 0 && Number.isFinite(audio.duration)) {
          audio.currentTime = Math.min(START_SECONDS, Math.max(0, audio.duration - 1));
        } else if (START_SECONDS > 0) {
          audio.currentTime = START_SECONDS;
        }
        await audio.play();
      } catch (err) {
        console.warn('Audio no pudo iniciar:', err);
      }
    };

    if (audio.readyState >= 1) {
      await playFromStart();
    } else {
      audio.addEventListener('loadedmetadata', playFromStart, { once: true });
      audio.load();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="scrapbook-page">
      <audio ref={audioRef} src="/audio/tema-fiesta.mp3" preload="auto" loop />

      {!entered && <SplashGate onEnter={handleEnter} />}

      <span className="sticker sticker--star-1">★</span>
      <span className="sticker sticker--star-2">✦</span>
      <span className="sticker sticker--sparkle-3">✧</span>

      <header className="hero">
        <span className="hero-tag">SAVE THE DATE</span>
        <h1>RECIBIDA</h1>
        <p className="hero-sub">¡Se terminó la espera y se festeja!</p>
      </header>

      <section className="section">
        <div className="section-header">
          <h2>La Agenda</h2>
          <span className="section-pill">¿Cuándo y dónde?</span>
        </div>
        <div className="agenda-card">
          <span className="tape" />
          <div className="agenda-row">
            <strong>Fecha</strong>
            <span>Completá fecha y día</span>
          </div>
          <div className="agenda-row">
            <strong>Hora</strong>
            <span>Completá horario</span>
          </div>
          <div className="agenda-row">
            <strong>Lugar</strong>
            <span>Completá dirección / salón</span>
          </div>
          <a
            className="agenda-link"
            href="https://maps.google.com/?q=San+Miguel+de+Tucuman"
            target="_blank"
            rel="noreferrer"
          >
            cómo llegar
          </a>
        </div>
      </section>

      <CameraGallery />
      <PlaylistSection />
      <RsvpSection />

      <footer className="footer">
        <button type="button" onClick={scrollToTop}>
          ↑ volver arriba
        </button>
      </footer>
    </main>
  );
}

export default App;