import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import Login from './Pages/Login';
import 'leaflet/dist/leaflet.css';
import './App.css';
import { useUser } from './context/UserContext';
import Info from './Pages/Info';

// OSRM Route Components
import OSRMRoute from './components/OSRMRoute';
import RoutePlanner from './components/RoutePlanner';

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
  const { user, isGuest, logout, isLoggedIn } = useUser();

  // Botón de instalación de PWA
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('App instalada');
        }
        setDeferredPrompt(null);
        setShowInstallButton(false);
      });
    }
  };

  // ESTADOS PARA RUTAS OSRM  
  const [routePoints, setRoutePoints] = useState({
    start: null,
    end: null,
    profile: 'driving'
  });

  const [routeInfo, setRouteInfo] = useState(null);

  const handleRouteRequest = (points) => {
    setRoutePoints({
      start: points.start,
      end: points.end,
      profile: points.profile
    });
  };

  const handleRouteFound = (routes) => {
    setRouteInfo(routes);
    console.log('Rutas encontradas:', routes);
  };

  // Función para scroll suave a las secciones
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/info" element={<Info />} />
        <Route path="/" element={
          <div className="App">
            {/* ===== NAVBAR PRINCIPAL ===== */}
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#0a2540' }}>
              <div className="container">
                <a className="navbar-brand" href="#/">
                  <i className="bi bi-signpost-split me-2"></i>TrackMyWay
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                      <button className="nav-link active" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => scrollToSection('inicio')}>
                        Inicio
                      </button>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => scrollToSection('servicios')}>
                        Servicios
                      </button>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => scrollToSection('mapa')}>
                        Mapa
                      </button>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => scrollToSection('nosotros')}>
                        Nosotros
                      </button>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => scrollToSection('contacto')}>
                        Contacto
                      </button>
                    </li>
                  </ul>
                  
                  {/* Mi cuenta */}
                  <ul className="navbar-nav">
                    {isLoggedIn() ? (
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                          <i className="bi bi-person-circle me-1"></i>{user?.nombre || 'Usuario'}
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" style={{ backgroundColor: '#0a2540' }}>
                          <li><a className="dropdown-item text-white" href="#">Mi perfil</a></li>
                          <li><a className="dropdown-item text-white" href="#">Mis rutas</a></li>
                          <li><hr className="dropdown-divider" /></li>
                          <li><a className="dropdown-item text-white" href="#" onClick={logout}>Cerrar sesión</a></li>
                        </ul>
                      </li>
                    ) : (
                      <li className="nav-item">
                        <a className="nav-link" href="#/login">
                          <i className="bi bi-person-circle me-1"></i>{isGuest ? 'Visitante 👤' : 'Iniciar sesión'}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </nav>

            {/* HERO SECTION */}
            <section id="inicio" className="hero-section py-5" style={{ backgroundColor: '#f8f9fa' }}>
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
  <button 
    className="btn btn-lg" 
    style={{ backgroundColor: '#0a2540', color: 'white', borderRadius: '30px', padding: '12px 30px' }}
    onClick={() => window.location.href = '#/login'}
  >
    <i className="bi bi-play-circle me-2"></i>Comenzar
  </button>
  <button 
    className="btn btn-lg" 
    style={{ backgroundColor: 'white', color: '#0a2540', border: '2px solid #0a2540', borderRadius: '30px', padding: '12px 30px' }}
    onClick={() => window.location.href = '#/info'}
  >
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

              {/* MAPA CON ROUTE PLANNER INTEGRADO */}
              <div className="row">
                <div className="col-12" style={{ position: 'relative' }}>
                  <MapContainer center={santoDomingoCenter} zoom={12} 
                    style={{ height: '500px', width: '100%', borderRadius: '12px' }}>
                    
                    <div style={{ 
                      position: 'absolute', 
                      top: '20px', 
                      left: '20px', 
                      zIndex: 1000, 
                      width: '320px',
                      maxWidth: '90%',
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      padding: '0'
                    }}>
                      <RoutePlanner onRouteRequest={handleRouteRequest} />
                    </div>
                    
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' />
                    
                    <Marker position={santoDomingoCenter}>
                      <Popup><b>Centro de Santo Domingo</b></Popup>
                    </Marker>
                    
                    {lugaresInteres.map((lugar, index) => (
                      <Marker key={index} position={lugar.pos}>
                        <Popup><b>{lugar.nombre}</b><br />{lugar.desc}</Popup>
                      </Marker>
                    ))}
                    
                    {corredores.map((corredor, index) => (
                      <Polyline key={index} positions={corredor.puntos} color={corredor.color} weight={5} opacity={0.8}>
                        <Popup>
                          <div className="text-center">
                            <b>{corredor.nombre}</b><br />
                            <small>Ruta de autobuses</small>
                          </div>
                        </Popup>
                      </Polyline>
                    ))}

                    {routePoints.start && routePoints.end && (
                      <OSRMRoute
                        key={`${routePoints.start[0]}-${routePoints.start[1]}-${routePoints.end[0]}-${routePoints.end[1]}`}
                        startPoint={routePoints.start}
                        endPoint={routePoints.end}
                        onRouteFound={handleRouteFound}
                      />
                    )}
                  </MapContainer>
                </div>
              </div>

              {/* INFO DE LA RUTA */}
              {routeInfo && routeInfo.length > 0 && (
                <div className="row mt-3">
                  <div className="col-12">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body">
                        <h6 className="card-title" style={{ color: '#0a2540' }}>
                          <i className="bi bi-info-circle me-2"></i>
                          Información de la ruta
                        </h6>
                        <div className="row">
                          {routeInfo.map((route, index) => (
                            <div key={index} className="col-md-4 mb-2">
                              <div className="p-2 rounded" style={{
                                backgroundColor: index === 0 ? '#e8f4fd' : '#f8f9fa',
                                borderLeft: `4px solid ${['#3388ff', '#ff5733', '#33ff57'][index]}`
                              }}>
                                <strong>Ruta {index + 1}</strong>
                                <div className="small">
                                  📏 {(route.summary.totalDistance / 1000).toFixed(2)} km
                                </div>
                                <div className="small">
                                  ⏱️ {Math.round(route.summary.totalTime / 60)} minutos
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Leyenda de corredores */}
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
            <section id="servicios" className="services-section py-5" style={{ backgroundColor: '#f8f9fa' }}>
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
            <section id="nosotros" className="about-section py-5">
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
                    <img src="https://imgs.search.brave.com/yFt1_ft8vDPJmWBP3egJVO-mKKUsYJmSzhN5QeK0Xq8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzIv/OTQ0LzU3OC9zbWFs/bC9uaWdodC10cmFu/c3BvcnRhdGlvbi1i/bHVycmVkLW1vdGlv/bi1tb2Rlcm4tY2l0/eS1saWZlLWZyZWUt/cGhvdG8uanBn" alt="Sobre nosotros" className="img-fluid rounded-4 shadow"/> 
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
            <footer id="contacto" className="footer" style={{ backgroundColor: '#0a2540', color: '#f5f5f5', padding: '60px 0 30px' }}>
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

            {/* BOTÓN DE INSTALACIÓN */}
            {showInstallButton && (
              <button 
                onClick={handleInstallClick}
                style={{
                  position: 'fixed',
                  bottom: '20px',
                  right: '20px',
                  backgroundColor: '#0a2540',
                  color: 'white',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '12px 24px',
                  zIndex: 1000,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                📱 Instalar App
              </button>
            )}
          </div>
        } />
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default App;