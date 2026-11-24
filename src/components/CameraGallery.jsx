const PHOTOS = [
  {
    id: 1,
    frame: '/imgs/camara-canon.png',
    photo: 'https://picsum.photos/seed/recibida1/400/300',
    alt: 'Recuerdo 1',
  },
  {
    id: 2,
    frame: '/imgs/camara-azul.png',
    photo: 'https://picsum.photos/seed/recibida2/400/300',
    alt: 'Recuerdo 2',
  },
];

export function CameraGallery() {
  return (
    <section className="section">
      <h2>Galería</h2>
      <div className="camera-track">
        {PHOTOS.map((item) => (
          <div className="camera-card" key={item.id}>
            <img src={item.photo} alt={item.alt} className="camera-photo" />
            <img
              src={item.frame}
              alt=""
              className="camera-frame"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}