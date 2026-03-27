import React, { useState } from 'react';
import { useMap } from 'react-leaflet';
import axios from 'axios';

const RoutePlanner = ({ onRouteRequest }) => {
  const [startInput, setStartInput] = useState('');
  const [endInput, setEndInput] = useState('');
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState('driving'); // driving, walking, cycling

  const map = useMap();

  // Geocodificar dirección usando Nominatim (gratis)
  const geocodeAddress = async (address) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: address + ', República Dominicana',
          format: 'json',
          limit: 1,
          addressdetails: 1
        },
        headers: {
          'User-Agent': 'TrackMyWay-App' // Importante para Nominatim
        }
      });

      if (response.data && response.data[0]) {
        const result = response.data[0];
        return {
          lat: parseFloat(result.lat),
          lon: parseFloat(result.lon),
          displayName: result.display_name
        };
      }
      return null;
    } catch (err) {
      console.error('Error geocoding:', err);
      return null;
    }
  };

  const handleStartChange = async (e) => {
    const value = e.target.value;
    setStartInput(value);
    setError('');

    if (value.length > 3) {
      setLoading(true);
      const coords = await geocodeAddress(value);
      if (coords) {
        setStartCoords([coords.lat, coords.lon]);
        // Centrar mapa en el origen
        map.setView([coords.lat, coords.lon], 13);
      }
      setLoading(false);
    }
  };

  const handleEndChange = async (e) => {
    const value = e.target.value;
    setEndInput(value);
    setError('');

    if (value.length > 3) {
      setLoading(true);
      const coords = await geocodeAddress(value);
      if (coords) {
        setEndCoords([coords.lat, coords.lon]);
      }
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!startCoords || !endCoords) {
      setError('Por favor ingresa direcciones válidas');
      return;
    }

    onRouteRequest({
      start: startCoords,
      end: endCoords,
      profile: profile,
      startAddress: startInput,
      endAddress: endInput
    });
  };

  const handleUseCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setStartCoords([latitude, longitude]);
          setStartInput('Mi ubicación actual');
          map.setView([latitude, longitude], 15);
          setLoading(false);
        },
        (err) => {
          setError('No se pudo obtener tu ubicación');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocalización no soportada');
      setLoading(false);
    }
  };

  return (
    <div className="route-planner" style={{
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    }}>
      <h5 style={{ color: '#0a2540', marginBottom: '15px' }}>
        <i className="bi bi-signpost-split me-2"></i>
        Planificador de Rutas
      </h5>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-medium">Origen</label>
          <div className="input-group">
            <span className="input-group-text bg-light border-0">
              <i className="bi bi-geo-alt-fill text-success"></i>
            </span>
            <input
              type="text"
              className="form-control"
              value={startInput}
              onChange={handleStartChange}
              placeholder="Ej: Santiago, República Dominicana"
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleUseCurrentLocation}
              title="Usar mi ubicación actual"
            >
              <i className="bi bi-crosshair"></i>
            </button>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium">Destino</label>
          <div className="input-group">
            <span className="input-group-text bg-light border-0">
              <i className="bi bi-geo-alt-fill text-danger"></i>
            </span>
            <input
              type="text"
              className="form-control"
              value={endInput}
              onChange={handleEndChange}
              placeholder="Ej: Santo Domingo, República Dominicana"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium">Modo de transporte</label>
          <div className="d-flex gap-2">
            <button
              type="button"
              className={`btn ${profile === 'driving' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setProfile('driving')}
            >
              <i className="bi bi-car-front me-1"></i> Auto
            </button>
            <button
              type="button"
              className={`btn ${profile === 'walking' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setProfile('walking')}
            >
              <i className="bi bi-person-walking me-1"></i> Caminando
            </button>
            <button
              type="button"
              className={`btn ${profile === 'cycling' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setProfile('cycling')}
            >
              <i className="bi bi-bicycle me-1"></i> Bicicleta
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger py-2" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn w-100"
          style={{
            backgroundColor: '#0a2540',
            color: 'white',
            borderRadius: '30px',
            padding: '10px',
            border: 'none'
          }}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Buscando...
            </>
          ) : (
            <>
              <i className="bi bi-arrow-right-circle me-2"></i>
              Calcular Ruta
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RoutePlanner;