import { useState } from 'react';
import { supabase, hasSupabaseConfig } from '../lib/supabase';

export function RsvpSection() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState(true);
  const [guests, setGuests] = useState(0);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (!hasSupabaseConfig || !supabase) {
      setName('');
      setNotes('');
      setGuests(0);
      setStatus('¡Confirmación probada! (Falta configurar .env de Supabase)');
      return;
    }

    setStatus('Guardando...');
    const { error } = await supabase.from('rsvps').insert([
      {
        name: name.trim(),
        attending,
        guests: attending ? guests : 0,
        notes: notes.trim(),
      },
    ]);

    if (error) {
      setStatus('Error al confirmar.');
      return;
    }

    setName('');
    setNotes('');
    setGuests(0);
    setStatus('¡Confirmación registrada!');
  };

  return (
    <section className="section">
      <h2>¿Venís?</h2>
      <form onSubmit={handleSubmit} className="form-box">
        <input
          type="text"
          placeholder="Tu nombre y apellido"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="toggle-row">
          <button
            type="button"
            className={attending ? 'active' : ''}
            onClick={() => setAttending(true)}
          >
            VOY
          </button>
          <button
            type="button"
            className={!attending ? 'active' : ''}
            onClick={() => setAttending(false)}
          >
            NO PUEDO
          </button>
        </div>

        {attending && (
          <div className="counter-row">
            <span>Acompañantes:</span>
            <button
              type="button"
              onClick={() => setGuests((g) => Math.max(0, g - 1))}
            >
              -
            </button>
            <strong>{guests}</strong>
            <button
              type="button"
              onClick={() => setGuests((g) => g + 1)}
            >
              +
            </button>
          </div>
        )}

        <textarea
          placeholder="¿Alguna comida especial, mensaje o idea?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button type="submit">CONFIRMAR</button>
        {status && <p className="status-msg">{status}</p>}
      </form>
    </section>
  );
}
