import React from 'react';
import { useUser } from '../context/UserContext';

const Info = () => {
  const { user, isGuest, logout, isLoggedIn } = useUser();

  return (
    <div className="container py-5">
      {/* Navbar dentro de la página de info */}
      <nav className="navbar navbar-expand-lg navbar-dark mb-4" style={{ backgroundColor: '#0a2540', borderRadius: '12px' }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#/">
            <i className="bi bi-signpost-split me-2"></i>TrackMyWay
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#/">
                  <i className="bi bi-house-door me-1"></i>Inicio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/login">
                  <i className="bi bi-person-circle me-1"></i>
                  {isLoggedIn() ? user?.nombre : (isGuest ? 'Visitante 👤' : 'Iniciar sesión')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="text-center mb-5">
        <h1 style={{ color: '#0a2540', fontWeight: '700' }}>Sobre TrackMyWay</h1>
        <p className="lead" style={{ color: '#4a4a4a' }}>Conectando tu ciudad, guiando tu destino.</p>
      </div>

      {/* Descripción General */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <h3 style={{ color: '#0a2540' }}>🚀 Descripción General</h3>
          <p>Track-Route es una aplicación orientada al análisis y organización de las principales rutas de transporte del país. El proyecto realiza un estudio exhaustivo de las rutas utilizadas tanto por el transporte público estatal como por el transporte privado, permitiendo que cada una esté claramente trazada dentro de la aplicación.</p>
          <p>El sistema ofrece estimaciones de tiempo y costo para desplazarse entre distintos puntos, ayudando a los usuarios a planificar sus trayectos de manera más eficiente.</p>
        </div>
      </div>

      {/* Misión y Visión */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h3 style={{ color: '#0a2540' }}>🎯 Misión</h3>
              <p>Proveer una plataforma tecnológica innovadora que facilite el seguimiento, análisis y recomendación de las rutas del transporte público y colectivo, ofreciendo información clara, confiable y accesible que permita a los usuarios planificar sus desplazamientos de manera eficiente.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body p-4">
              <h3 style={{ color: '#0a2540' }}>👁️ Visión</h3>
              <p>Convertirnos en una plataforma líder en soluciones de movilidad urbana inteligente a nivel nacional e internacional, transformando la manera en que las ciudades gestionan y utilizan el transporte público.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tecnologías */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <h3 style={{ color: '#0a2540' }}>⚙️ Tecnologías Utilizadas</h3>
          <div className="row mt-3">
            <div className="col-md-4 mb-2">
              <span className="badge bg-primary me-2 p-2">⚛️ React.js</span>
              <span className="badge bg-success me-2 p-2">🗺️ Leaflet</span>
              <span className="badge bg-info me-2 p-2">🌍 OpenStreetMap</span>
            </div>
            <div className="col-md-4 mb-2">
              <span className="badge bg-warning text-dark me-2 p-2">🐘 PHP</span>
              <span className="badge bg-danger me-2 p-2">🗄️ MySQL</span>
              <span className="badge bg-secondary me-2 p-2">🎨 Bootstrap 5</span>
            </div>
            <div className="col-md-4 mb-2">
              <span className="badge bg-dark me-2 p-2">🚀 OSRM</span>
              <span className="badge bg-secondary p-2">🔄 XAMPP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Valores Corporativos */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <h3 style={{ color: '#0a2540' }}>💎 Nuestros Valores</h3>
          <div className="row mt-3">
            <div className="col-md-4 mb-2">
              <div className="d-flex align-items-center">
                <i className="bi bi-lightbulb fs-4 me-2" style={{ color: '#0a2540' }}></i>
                <span><strong>Innovación</strong> - Soluciones tecnológicas modernas</span>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="d-flex align-items-center">
                <i className="bi bi-universal-access fs-4 me-2" style={{ color: '#0a2540' }}></i>
                <span><strong>Accesibilidad</strong> - Fácil para todos</span>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="d-flex align-items-center">
                <i className="bi bi-eye fs-4 me-2" style={{ color: '#0a2540' }}></i>
                <span><strong>Transparencia</strong> - Información clara</span>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="d-flex align-items-center">
                <i className="bi bi-speedometer2 fs-4 me-2" style={{ color: '#0a2540' }}></i>
                <span><strong>Eficiencia</strong> - Optimizamos tiempos</span>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="d-flex align-items-center">
                <i className="bi bi-heart fs-4 me-2" style={{ color: '#0a2540' }}></i>
                <span><strong>Compromiso social</strong> - Mejoramos la movilidad</span>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="d-flex align-items-center">
                <i className="bi bi-graph-up fs-4 me-2" style={{ color: '#0a2540' }}></i>
                <span><strong>Escalabilidad</strong> - Crecemos sin perder estabilidad</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Políticas */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <h3 style={{ color: '#0a2540' }}>📜 Nuestras Políticas</h3>
          <div className="row mt-3">
            <div className="col-md-6">
              <ul className="list-unstyled">
                <li className="mb-2"><i className="bi bi-shield-lock me-2 text-success"></i> <strong>Protección de Datos</strong> - Tu información está segura</li>
                <li className="mb-2"><i className="bi bi-shield-check me-2 text-success"></i> <strong>Seguridad de la Información</strong> - Protocolos actualizados</li>
                <li className="mb-2"><i className="bi bi-star me-2 text-success"></i> <strong>Calidad del Servicio</strong> - Información actualizada</li>
                <li className="mb-2"><i className="bi bi-arrow-repeat me-2 text-success"></i> <strong>Innovación Continua</strong> - Mejora constante</li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul className="list-unstyled">
                <li className="mb-2"><i className="bi bi-hand-thumbs-up me-2 text-success"></i> <strong>Accesibilidad</strong> - Interfaz simple e intuitiva</li>
                <li className="mb-2"><i className="bi bi-globe me-2 text-success"></i> <strong>Responsabilidad Social</strong> - Movilidad organizada</li>
                <li className="mb-2"><i className="bi bi-briefcase me-2 text-success"></i> <strong>Ética Empresarial</strong> - Transparencia total</li>
                <li className="mb-2"><i className="bi bi-link me-2 text-success"></i> <strong>Expansión y Alianzas</strong> - Crecimiento sostenible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Antecedentes */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <h3 style={{ color: '#0a2540' }}>📖 Antecedentes</h3>
          <p><strong>Referentes Internacionales:</strong> Google Maps, Waze, Uber han demostrado que la geolocalización mejora la movilidad. Sin embargo, están orientados al transporte privado.</p>
          <p><strong>Referentes Nacionales:</strong> INTRANT y OMSA han desarrollado rutas formales, pero falta una plataforma digital que centralice la información del transporte público.</p>
          <p><strong>Nuestra solución:</strong> Combinamos la tecnología de geolocalización internacional con la estructura organizada del transporte nacional.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-5 py-4 text-center" style={{ backgroundColor: '#0a2540', color: '#f5f5f5', borderRadius: '12px' }}>
        <p className="mb-0">© 2024 TrackMyWay - Todos los derechos reservados</p>
        <small>Conectando tu ciudad, guiando tu destino.</small>
      </footer>
    </div>
  );
};

export default Info;