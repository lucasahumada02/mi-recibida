export function SplashGate({ onEnter }) {
  return (
    <div className="splash-screen">
      <span className="splash-badge">Te invito a mi</span>
      <h2 className="splash-title">✧ RECIBIDA ✧</h2>
      <button type="button" className="splash-btn" onClick={onEnter}>
        TOCÁ PARA ENTRAR
      </button>
    </div>
  );
}