import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import Login from './Pages/Login'; // Importar el componente de Login
import 'leaflet/dist/leaflet.css';
import './App.css';

// Coordenadas de Santo Domingo
const santoDomingoCenter = [18.4861, -69.9312];

// Lugares de interés en Santo Domingo
const lugaresInteres = [
  { pos: [18.4766, -69.8832], nombre: "Zona Colonial", desc: "Casco histórico" },
  { pos: [18.4591, -69.9312], nombre: "Malecón", desc: "Paseo marítimo" },
  { pos: [18.4801, -69.8811], nombre: "Acuario Nacional", desc: "Vida marina" },
  { pos: [18.4709, -69.9123], nombre: "Plaza de la Cultura", desc: "Museos y teatros" },
  { pos: [18.4903, -69.8948], nombre: "Jardín Botánico", desc: "Naturaleza" },
];

// CORREDORES DE AUTOBUSES - METROPOLITANA
const corredores = [
  {
    nombre: "Corredor Winston Churchill",
    color: "#FF6B6B", // Rojo
    puntos: [
      [18.4823, -69.9160],
      [18.4724, -69.9394],
      [18.4663, -69.9002]
    ]
  },
  {
    nombre: "Corredor Charles de Gaulle",
    color: "#4ECDC4", // Verde agua
    puntos: [
      [18.5170, -69.9000],
      [18.5100, -69.9040],
      [18.5030, -69.9080],
      [18.4970, -69.9120]
    ]
  },
  {
    nombre: "Corredor Independencia",
    color: "#45B7D1", // Azul
    puntos: [
      [18.4600, -69.9000],
      [18.4580, -69.9050],
      [18.4550, -69.9100],
      [18.4520, -69.9150]
    ]
  }
];

// Solución para marcadores de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function App() {
  return (
    <div className="App">
      {/* ===== NAVBAR ===== */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#0a2540' }}>
        <div className="container">
          {/* Logo */}
          <a className="navbar-brand" href="#">
            <i className="bi bi-signpost-split me-2"></i>TrackMyWay
          </a>
          
          {/* Botón hamburguesa */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
                  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          {/* Contenido colapsable */}
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Menú centrado */}
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="#">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Mapa</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Rutas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Tráfico</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Presupuesto</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Más
                </a>
               <ul className="dropdown-menu" style={{ backgroundColor: '#0a2540' }}>
                  <li><a className="dropdown-item text-white" href="#"><i className="bi bi-info-circle me-2"></i>Sobre nosotros</a></li>
                  <li><a className="dropdown-item text-white" href="#"><i className="bi bi-calendar me-2"></i>Planea tu ruta</a></li>
                  <li><a className="dropdown-item text-white" href="#"><i className="bi bi-bookmark me-2"></i>Rutas guardadas</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item text-white" href="#"><i className="bi bi-geo-alt me-2"></i>Lugares destacados</a></li>
                </ul>
              </li>
            </ul>
            
            {/* Mi cuenta a la derecha */}
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-person-circle me-1"></i>Mi cuenta
                </a>
                <ul className="dropdown-menu dropdown-menu-end" style={{ backgroundColor: '#0a2540' }}>
                  <li><a className="dropdown-item text-white" href="/Pages/Login"><i className="bi bi-box-arrow-in-right me-2"></i>Iniciar sesión</a></li>
                  <li><a className="dropdown-item text-white" href="#"><i className="bi bi-person-plus me-2"></i>Registrarse</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item text-white" href="#"><i className="bi bi-question-circle me-2"></i>Ayuda</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mb-4" style={{ color: '#0a2540' }}>
              <i className="bi bi-geo-alt-fill me-2"></i>
              Explora Santo Domingo
            </h1>
          </div>
        </div>
        {/* Panel direcciones */}


        
{/* ===== PANEL DE DIRECCIONES ===== */}
{/* ===== PANEL DE DIRECCIONES - VERSIÓN MINIMALISTA ===== */}
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
          <span style={{ 
            color: '#0a2540', 
            fontWeight: '600',
            minWidth: '60px'
          }}>Lines</span>
          
          <div className="d-flex align-items-center ms-2 flex-grow-1">
            <div style={{ 
              width: '10px', 
              height: '10px', 
              backgroundColor: '#4CAF50', 
              borderRadius: '50%',
              marginRight: '8px'
            }}></div>
            <input 
              type="text" 
              className="form-control form-control-sm" 
              placeholder="Choose starting point"
              style={{
                borderRadius: '30px',
                border: 'none',
                backgroundColor: '#f5f5f5',
                fontSize: '0.9rem'
              }}
            />
          </div>
        </div>

        <div className="d-flex align-items-center flex-grow-1">
          <span style={{ 
            color: '#0a2540', 
            fontWeight: '600',
            minWidth: '60px'
          }}></span>
          
          <div className="d-flex align-items-center ms-2 flex-grow-1">
            <div style={{ 
              width: '10px', 
              height: '10px', 
              backgroundColor: '#FF4444', 
              borderRadius: '50%',
              marginRight: '8px'
            }}></div>
            <input 
              type="text" 
              className="form-control form-control-sm" 
              placeholder="Choose destination"
              style={{
                borderRadius: '30px',
                border: 'none',
                backgroundColor: '#f5f5f5',
                fontSize: '0.9rem'
              }}
            />
          </div>
        </div>

        <button className="btn btn-sm" style={{
          backgroundColor: '#0a2540',
          color: 'white',
          borderRadius: '30px',
          padding: '8px 20px',
          border: 'none',
          fontSize: '0.85rem',
          whiteSpace: 'nowrap'
        }}>
          <i className="bi bi-arrow-right-circle me-1"></i>Go
        </button>
      </div>
    </div>
  </div>
</div>

{/* fin */}

        {/* ===== MAPA CON RUTAS ===== */}
        <div className="row">
          <div className="col-12">
            
            <MapContainer 
              center={santoDomingoCenter} 
              zoom={12} 
              style={{ height: '500px', width: '100%', borderRadius: '12px' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              
              {/* Marcador del centro */}
              <Marker position={santoDomingoCenter}>
                <Popup><b>Centro de Santo Domingo</b></Popup>
              </Marker>
              
              {/* Marcadores de lugares de interés */}
              {lugaresInteres.map((lugar, index) => (
                <Marker key={index} position={lugar.pos}>
                  <Popup>
                    <b>{lugar.nombre}</b><br />
                    {lugar.desc}
                  </Popup>
                </Marker>
              ))}
              
              {/* ===== CORREDORES DE AUTOBUSES ===== */}
              {corredores.map((corredor, index) => (
                <Polyline
                  key={index}
                  positions={corredor.puntos}
                  color={corredor.color}
                  weight={5}
                  opacity={0.8}
                >
                  <Popup>
                    <div className="text-center">
                      <b>{corredor.nombre}</b>
                      <br />
                      <small>Ruta de autobuses</small>
                    </div>
                  </Popup>
                </Polyline>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Leyenda de corredores */}
        <div className="row mt-3">
          <div className="col-12">
            <div className="d-flex gap-4 justify-content-center flex-wrap">
              {corredores.map((corredor, index) => (
                <div key={index} className="d-flex align-items-center">
                  <div style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: corredor.color,
                    marginRight: '8px',
                    borderRadius: '4px'
                  }}></div>
                  <span>{corredor.nombre}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tarjetas informativas */}
        <div className="row mt-5">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <i className="bi bi-signpost-split" style={{ fontSize: '2.5rem', color: '#0a2540' }}></i>
                <h5 className="card-title mt-3">Rutas Optimizadas</h5>
                <p className="card-text text-muted">Encuentra la mejor ruta considerando tráfico y distancia.</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <i className="bi bi-stopwatch" style={{ fontSize: '2.5rem', color: '#0a2540' }}></i>
                <h5 className="card-title mt-3">Tráfico en Vivo</h5>
                <p className="card-text text-muted">Información actualizada del tráfico en Santo Domingo.</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <i className="bi bi-calculator" style={{ fontSize: '2.5rem', color: '#0a2540' }}></i>
                <h5 className="card-title mt-3">Calcula Presupuesto</h5>
                <p className="card-text text-muted">Estima costos de combustible y peajes para tu viaje.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-5 py-4" style={{ backgroundColor: '#0a2540', color: '#f5f5f5' }}>
        <div className="container text-center">
          <p className="mb-0">© 2024 TrackMyWay - Todos los derechos reservados</p>
          <small className="opacity-75">Encuentra las mejores rutas en Santo Domingo</small>
        </div>
      </footer>
    </div>
  );
}

export default App;