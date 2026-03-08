import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import Login from './Pages/Login';
import 'leaflet/dist/leaflet.css';
import './App.css';

// Coordenadas de Santo Domingo
const santoDomingoCenter = [18.4861, -69.9312];

// Lugares de interés
const lugaresInteres = [
  { pos: [18.4766, -69.8832], nombre: "Zona Colonial", desc: "Casco histórico" },
  { pos: [18.4591, -69.9312], nombre: "Malecón", desc: "Paseo marítimo" },
  { pos: [18.4801, -69.8811], nombre: "Acuario Nacional", desc: "Vida marina" },
  { pos: [18.4709, -69.9123], nombre: "Plaza de la Cultura", desc: "Museos y teatros" },
  { pos: [18.4903, -69.8948], nombre: "Jardín Botánico", desc: "Naturaleza" },
];

// CORREDORES DE AUTOBUSES
const corredores = [
  {
    nombre: "Corredor Winston Churchill",
    color: "#FF6B6B",
    puntos: [[18.4823, -69.9160], [18.4724, -69.9394], [18.4663, -69.9002]]
  },
  {
    nombre: "Corredor Charles de Gaulle",
    color: "#4ECDC4",
    puntos: [[18.5170, -69.9000], [18.5100, -69.9040], [18.5030, -69.9080], [18.4970, -69.9120]]
  },
  {
    nombre: "Corredor Independencia",
    color: "#45B7D1",
    puntos: [[18.4600, -69.9000], [18.4580, -69.9050], [18.4550, -69.9100], [18.4520, -69.9150]]
  }
];

// Solución marcadores Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="App">
            {/* NAVBAR */}
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#0a2540' }}>
              <div className="container">
                <a className="navbar-brand" href="/">
                  <i className="bi bi-signpost-split me-2"></i>TrackMyWay
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav mx-auto">
                    <li className="nav-item"><a className="nav-link active" href="/">Inicio</a></li>
                    <li className="nav-item"><a className="nav-link" href="#servicios">Servicios</a></li>
                    <li className="nav-item"><a className="nav-link" href="#mapa">Mapa</a></li>
                    <li className="nav-item"><a className="nav-link" href="#nosotros">Nosotros</a></li>
                    <li className="nav-item"><a className="nav-link" href="#contacto">Contacto</a></li>
                  </ul>
                  
                  {/* Mi cuenta - Link a Login */}
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a className="nav-link" href="/login">
                        <i className="bi bi-person-circle me-1"></i>Iniciar sesión
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            {/* HERO SECTION */}
            <section className="hero-section py-5" style={{ backgroundColor: '#f8f9fa' }}>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <h1 style={{ color: '#0a2540', fontSize: '3rem', fontWeight: '700' }}>
                      TrackMyWay
                    </h1>
                    <p className="lead" style={{ color: '#4a4a4a' }}>
                      La forma más inteligente de moverte por Santo Domingo. 
                      Rutas optimizadas, tráfico en tiempo real y ahorro garantizado.
                    </p>
                    <div className="d-flex gap-3 mt-4">
                      <button className="btn btn-lg" style={{ backgroundColor: '#0a2540', color: 'white', borderRadius: '30px', padding: '12px 30px' }}>
                        <i className="bi bi-play-circle me-2"></i>Comenzar
                      </button>
                      <button className="btn btn-lg" style={{ backgroundColor: 'white', color: '#0a2540', border: '2px solid #0a2540', borderRadius: '30px', padding: '12px 30px' }}>
                        <i className="bi bi-info-circle me-2"></i>Más info
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <img src="https://imgs.search.brave.com/ybRdnkYsWPtXtKi0CcQiKYg5-a9K_iAweAOx8h7aHl0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8x/LzFlL0Rpc3RyaXRv/X05hY2lvbmFsX2lu/X0RvbWluaWNhbl9S/ZXB1YmxpY18oc3Bl/Y2lhbF9tYXJrZXIp/LnN2Zw" alt="Hero" className="img-fluid rounded-4 shadow"/>
                  </div>
                </div>
              </div>
            </section>

            {/* ESTADÍSTICAS */}
            <section className="stats-section py-5">
              <div className="container">
                <div className="row text-center">
                  <div className="col-md-3 col-6 mb-4">
                    <div className="stat-item">
                      <h2 style={{ color: '#0a2540', fontSize: '2.5rem', fontWeight: '700' }}>10K+</h2>
                      <p className="text-muted">Usuarios activos</p>
                    </div>
                  </div>
                  <div className="col-md-3 col-6 mb-4">
                    <div className="stat-item">
                      <h2 style={{ color: '#0a2540', fontSize: '2.5rem', fontWeight: '700' }}>500+</h2>
                      <p className="text-muted">Rutas disponibles</p>
                    </div>
                  </div>
                  <div className="col-md-3 col-6 mb-4">
                    <div className="stat-item">
                      <h2 style={{ color: '#0a2540', fontSize: '2.5rem', fontWeight: '700' }}>98%</h2>
                      <p className="text-muted">Precisión</p>
                    </div>
                  </div>
                  <div className="col-md-3 col-6 mb-4">
                    <div className="stat-item">
                      <h2 style={{ color: '#0a2540', fontSize: '2.5rem', fontWeight: '700' }}>24/7</h2>
                      <p className="text-muted">Soporte</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CONTENIDO PRINCIPAL CON MAPA */}
            <div className="container mt-4" id="mapa">
              <div className="row">
                <div className="col-12">
                  <h2 className="text-center mb-4" style={{ color: '#0a2540' }}>
                    <i className="bi bi-geo-alt-fill me-2"></i>
                    Explora Santo Domingo
                  </h2>
                </div>
              </div>

              {/* PANEL DE DIRECCIONES */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="p-3" style={{ 
                    backgroundColor: 'white',
                    borderRadius: '50px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    border: '1px solid #e0e0e0'
                  }}>
                    <div className="d-flex flex-column flex-md-row align-items-md-center gap-3">
                      <div className="d-flex align-items-center flex-grow-1">
                        <span style={{ color: '#0a2540', fontWeight: '600', minWidth: '60px' }}>Lines</span>
                        <div className="d-flex align-items-center ms-2 flex-grow-1">
                          <div style={{ width: '10px', height: '10px', backgroundColor: '#4CAF50', borderRadius: '50%', marginRight: '8px' }}></div>
                          <input type="text" className="form-control form-control-sm" placeholder="Choose starting point"
                            style={{ borderRadius: '30px', border: 'none', backgroundColor: '#f5f5f5', fontSize: '0.9rem' }} />
                        </div>
                      </div>

                      <div className="d-flex align-items-center flex-grow-1">
                        <span style={{ color: '#0a2540', fontWeight: '600', minWidth: '60px' }}></span>
                        <div className="d-flex align-items-center ms-2 flex-grow-1">
                          <div style={{ width: '10px', height: '10px', backgroundColor: '#FF4444', borderRadius: '50%', marginRight: '8px' }}></div>
                          <input type="text" className="form-control form-control-sm" placeholder="Choose destination"
                            style={{ borderRadius: '30px', border: 'none', backgroundColor: '#f5f5f5', fontSize: '0.9rem' }} />
                        </div>
                      </div>

                      <button className="btn btn-sm" style={{
                        backgroundColor: '#0a2540', color: 'white', borderRadius: '30px',
                        padding: '8px 20px', border: 'none', fontSize: '0.85rem', whiteSpace: 'nowrap'
                      }}>
                        <i className="bi bi-arrow-right-circle me-1"></i>Go
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* MAPA */}
              <div className="row">
                <div className="col-12">
                  <MapContainer center={santoDomingoCenter} zoom={12} 
                    style={{ height: '500px', width: '100%', borderRadius: '12px' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' />
                    
                    <Marker position={santoDomingoCenter}><Popup><b>Centro de Santo Domingo</b></Popup></Marker>
                    
                    {lugaresInteres.map((lugar, index) => (
                      <Marker key={index} position={lugar.pos}>
                        <Popup><b>{lugar.nombre}</b><br />{lugar.desc}</Popup>
                      </Marker>
                    ))}
                    
                    {corredores.map((corredor, index) => (
                      <Polyline key={index} positions={corredor.puntos} color={corredor.color} weight={5} opacity={0.8}>
                        <Popup><div className="text-center"><b>{corredor.nombre}</b><br /><small>Ruta de autobuses</small></div></Popup>
                      </Polyline>
                    ))}
                  </MapContainer>
                </div>
              </div>

              {/* Leyenda */}
              <div className="row mt-3">
                <div className="col-12">
                  <div className="d-flex gap-4 justify-content-center flex-wrap">
                    {corredores.map((corredor, index) => (
                      <div key={index} className="d-flex align-items-center">
                        <div style={{ width: '20px', height: '20px', backgroundColor: corredor.color, marginRight: '8px', borderRadius: '4px' }}></div>
                        <span>{corredor.nombre}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SERVICIOS DETALLADOS */}
            <section className="services-section py-5" id="servicios" style={{ backgroundColor: '#f8f9fa' }}>
              <div className="container">
                <h2 className="text-center mb-5" style={{ color: '#0a2540', fontWeight: '700' }}>Nuestros Servicios</h2>
                <div className="row">
                  <div className="col-md-4 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body text-center p-4">
                        <div className="icon-circle mb-3" style={{ width: '80px', height: '80px', backgroundColor: '#0a2540', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                          <i className="bi bi-signpost-split" style={{ fontSize: '2.5rem', color: 'white' }}></i>
                        </div>
                        <h5 className="card-title mt-3" style={{ color: '#0a2540', fontWeight: '600' }}>Rutas Optimizadas</h5>
                        <p className="card-text text-muted">Algoritmos avanzados que calculan la mejor ruta considerando tráfico, distancia y tiempo de viaje.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body text-center p-4">
                        <div className="icon-circle mb-3" style={{ width: '80px', height: '80px', backgroundColor: '#0a2540', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                          <i className="bi bi-stopwatch" style={{ fontSize: '2.5rem', color: 'white' }}></i>
                        </div>
                        <h5 className="card-title mt-3" style={{ color: '#0a2540', fontWeight: '600' }}>Tráfico en Vivo</h5>
                        <p className="card-text text-muted">Información actualizada del tráfico en Santo Domingo con actualizaciones cada 5 minutos.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body text-center p-4">
                        <div className="icon-circle mb-3" style={{ width: '80px', height: '80px', backgroundColor: '#0a2540', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                          <i className="bi bi-calculator" style={{ fontSize: '2.5rem', color: 'white' }}></i>
                        </div>
                        <h5 className="card-title mt-3" style={{ color: '#0a2540', fontWeight: '600' }}>Calcula Presupuesto</h5>
                        <p className="card-text text-muted">Estima costos de combustible y peajes para tu viaje con precisión.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SOBRE NOSOTROS */}
            <section className="about-section py-5" id="nosotros">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <h2 style={{ color: '#0a2540', fontWeight: '700' }}>Sobre TrackMyWay</h2>
                    <p className="lead" style={{ color: '#4a4a4a' }}>
                      Somos una empresa dominicana comprometida con mejorar la movilidad urbana en Santo Domingo.
                    </p>
                    <p style={{ color: '#6c757d' }}>
                      Fundada en 2024, TrackMyWay nació con la misión de facilitar el desplazamiento de los ciudadanos 
                      y visitantes en la capital dominicana. Nuestra plataforma combina tecnología de punta con datos 
                      en tiempo real para ofrecer las mejores rutas de transporte público y privado.
                    </p>
                    <p style={{ color: '#6c757d' }}>
                      Trabajamos en colaboración con la Oficina Metropolitana de Servicios de Autobuses (OMSA) y otras 
                      entidades de transporte para garantizar información precisa y actualizada.
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <img src="file:///C:/Users/white/Desktop/Semester%208/Weny%20108/Logo.png" alt="Sobre nosotros" className="img-fluid rounded-4 shadow"/>
                  </div>
                </div>
              </div>
            </section>

            {/* TESTIMONIOS */}
            <section className="testimonials-section py-5" style={{ backgroundColor: '#f8f9fa' }}>
              <div className="container">
                <h2 className="text-center mb-5" style={{ color: '#0a2540', fontWeight: '700' }}>Lo que dicen nuestros usuarios</h2>
                <div className="row">
                  <div className="col-md-4 mb-4">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <i className="bi bi-person-circle" style={{ fontSize: '3rem', color: '#0a2540' }}></i>
                          <div className="ms-3">
                            <h6 className="mb-0" style={{ fontWeight: '600' }}>María González</h6>
                            <small className="text-muted">Usuaria frecuente</small>
                          </div>
                        </div>
                        <p className="card-text text-muted">"Desde que uso TrackMyWay ahorro al menos 30 minutos diarios en mis desplazamientos. ¡Excelente app!"</p>
                        <div className="text-warning">
                          <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <i className="bi bi-person-circle" style={{ fontSize: '3rem', color: '#0a2540' }}></i>
                          <div className="ms-3">
                            <h6 className="mb-0" style={{ fontWeight: '600' }}>Juan Pérez</h6>
                            <small className="text-muted">Conductor</small>
                          </div>
                        </div>
                        <p className="card-text text-muted">"La información del tráfico es muy precisa. Me ha salvado de muchos tapones."</p>
                        <div className="text-warning">
                          <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <i className="bi bi-person-circle" style={{ fontSize: '3rem', color: '#0a2540' }}></i>
                          <div className="ms-3">
                            <h6 className="mb-0" style={{ fontWeight: '600' }}>Carlos Rodríguez</h6>
                            <small className="text-muted">Turista</small>
                          </div>
                        </div>
                        <p className="card-text text-muted">"Visitando Santo Domingo por primera vez, esta app fue mi mejor aliada. Fácil de usar y muy útil."</p>
                        <div className="text-warning">
                          <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FOOTER */}
            <footer className="footer" style={{ backgroundColor: '#0a2540', color: '#f5f5f5', padding: '60px 0 30px' }} id="contacto">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 mb-4">
                    <h5 style={{ color: 'white', fontWeight: '600' }}>TrackMyWay</h5>
                    <p style={{ color: 'rgba(255,255,255,0.7)' }}>La forma más inteligente de moverte por Santo Domingo.</p>
                    <div className="social-links">
                      <a href="#" className="me-3" style={{ color: 'white', fontSize: '1.5rem' }}><i className="bi bi-facebook"></i></a>
                      <a href="#" className="me-3" style={{ color: 'white', fontSize: '1.5rem' }}><i className="bi bi-twitter"></i></a>
                      <a href="#" className="me-3" style={{ color: 'white', fontSize: '1.5rem' }}><i className="bi bi-instagram"></i></a>
                      <a href="#" className="me-3" style={{ color: 'white', fontSize: '1.5rem' }}><i className="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4 mb-4">
                    <h6 style={{ color: 'white', fontWeight: '600' }}>Producto</h6>
                    <ul className="list-unstyled">
                      <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Características</a></li>
                      <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Precios</a></li>
                      <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Actualizaciones</a></li>
                    </ul>
                  </div>
                  <div className="col-lg-2 col-md-4 mb-4">
                    <h6 style={{ color: 'white', fontWeight: '600' }}>Compañía</h6>
                    <ul className="list-unstyled">
                      <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Sobre nosotros</a></li>
                      <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Blog</a></li>
                      <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Prensa</a></li>
                    </ul>
                  </div>
                  <div className="col-lg-4 col-md-4 mb-4">
                    <h6 style={{ color: 'white', fontWeight: '600' }}>Contacto</h6>
                    <p style={{ color: 'rgba(255,255,255,0.7)' }}><i className="bi bi-geo-alt-fill me-2"></i>Av. Winston Churchill, Santo Domingo</p>
                    <p style={{ color: 'rgba(255,255,255,0.7)' }}><i className="bi bi-telephone-fill me-2"></i>+1 809-555-0123</p>
                    <p style={{ color: 'rgba(255,255,255,0.7)' }}><i className="bi bi-envelope-fill me-2"></i>info@trackmyway.com</p>
                  </div>
                </div>
                <hr style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
                <div className="row">
                  <div className="col-12 text-center">
                    <p className="mb-0" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                      © 2024 TrackMyWay. Todos los derechos reservados. | 
                      <a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginLeft: '10px' }}>Términos y condiciones</a> | 
                      <a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginLeft: '10px' }}>Política de privacidad</a>
                    </p>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        } />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;