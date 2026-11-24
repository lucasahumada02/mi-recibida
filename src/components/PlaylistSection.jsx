import { useState } from 'react';
import { supabase, hasSupabaseConfig } from '../lib/supabase';

export function PlaylistSection() {
  const [song, setSong] = useState('');
  const [artist, setArtist] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!song.trim()) return;

    if (!hasSupabaseConfig || !supabase) {
      setSong('');
      setArtist('');
      setStatus('¡Tema anotado! (Falta configurar .env de Supabase)');
      return;
    }

    setStatus('Enviando...');
    const { error } = await supabase
      .from('song_requests')
      .insert([{ song: song.trim(), artist: artist.trim() }]);

    if (error) {
      setStatus('No se pudo enviar, probá de nuevo.');
      return;
    }

    setSong('');
    setArtist('');
    setStatus('¡Tema sumado!');
  };

  return (
    <section className="section">
      <h2>PEDÍ UN TEMA</h2>
      <form onSubmit={handleSubmit} className="form-box">
        <input
          type="text"
          placeholder="tema"
          value={song}
          onChange={(e) => setSong(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="artista"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <button type="submit">SUMAR</button>
        {status && <p className="status-msg">{status}</p>}
      </form>
    </section>
  );
}