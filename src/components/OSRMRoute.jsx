import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

const OSRMRoute = ({ startPoint, endPoint, onRouteFound }) => {
  const map = useMap();
  const routingControlRef = useRef(null);
  const markerRef = useRef([]);
  
  // Colores para rutas alternativas
  const routeColors = ['#3388ff', '#ff5733', '#33ff57', '#ff33f5', '#f5ff33'];

  // Función para limpiar todo de forma segura
  const cleanup = () => {
    try {
      // Eliminar control de routing si existe
      if (routingControlRef.current) {
        try {
          map.removeControl(routingControlRef.current);
        } catch (e) {
          console.log('Error removing control:', e);
        }
        routingControlRef.current = null;
      }

      // Eliminar marcadores personalizados
      if (markerRef.current.length > 0) {
        markerRef.current.forEach(marker => {
          try {
            if (marker && map) {
              map.removeLayer(marker);
            }
          } catch (e) {
            console.log('Error removing marker:', e);
          }
        });
        markerRef.current = [];
      }

      // Buscar y eliminar cualquier polyline de rutas anteriores
      map.eachLayer((layer) => {
        try {
          // Si es una polyline y tiene alguno de nuestros colores
          if (layer instanceof L.Polyline) {
            const color = layer.options?.color;
            if (color && routeColors.includes(color)) {
              map.removeLayer(layer);
            }
          }
        } catch (e) {
          console.log('Error cleaning layer:', e);
        }
      });
    } catch (e) {
      console.log('Cleanup error:', e);
    }
  };

  useEffect(() => {
    // Si no hay puntos, no hacer nada
    if (!startPoint || !endPoint || !map) return;

    // Limpiar rutas anteriores
    cleanup();

    // Pequeño delay para asegurar que la limpieza termine
    setTimeout(() => {
      try {
        console.log('Calculando nueva ruta:', startPoint, endPoint);

        // Crear el control de routing
        const control = L.Routing.control({
          waypoints: [
            L.latLng(startPoint[0], startPoint[1]),
            L.latLng(endPoint[0], endPoint[1])
          ],
          router: L.Routing.osrmv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1',
            profile: 'driving',
            alternatives: true,
            steps: true,
            geometries: 'polyline'
          }),
          lineOptions: {
            styles: [
              { color: routeColors[0], weight: 6, opacity: 0.8 },
              { color: routeColors[1], weight: 5, opacity: 0.6 },
              { color: routeColors[2], weight: 4, opacity: 0.4 }
            ],
            addWaypoints: false,
            extendToWaypoints: true
          },
          showAlternatives: true,
          altLineOptions: {
            styles: [
              { color: routeColors[1], weight: 5, opacity: 0.6 },
              { color: routeColors[2], weight: 4, opacity: 0.4 },
              { color: routeColors[3], weight: 3, opacity: 0.3 }
            ]
          },
          createMarker: (i, waypoint, n) => {
            const markerIcon = L.divIcon({
              className: 'custom-marker',
              html: `<div style="
                background-color: ${i === 0 ? '#4CAF50' : '#FF4444'};
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 12px;
              ">${i === 0 ? 'A' : 'B'}</div>`,
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            });
            
            const marker = L.marker(waypoint.latLng, { icon: markerIcon });
            markerRef.current.push(marker);
            return marker;
          },
          routeWhileDragging: false,
          fitSelectedRoutes: true,
          showExternally: true,
          draggableWaypoints: false
        }).addTo(map);

        routingControlRef.current = control;

        // Escuchar cuando se calculan las rutas
        control.on('routesfound', (e) => {
          const routes = e.routes;
          console.log('Rutas encontradas:', routes);
          
          if (onRouteFound) {
            onRouteFound(routes);
          }

          // Ajustar el mapa
          try {
            const bounds = L.latLngBounds([startPoint, endPoint]);
            routes.forEach(route => {
              route.coordinates.forEach(coord => {
                bounds.extend(coord);
              });
            });
            map.fitBounds(bounds, { padding: [50, 50] });
          } catch (e) {
            console.log('Error ajustando bounds:', e);
          }
        });

        control.on('routingerror', (e) => {
          console.error('Routing error:', e);
        });

      } catch (err) {
        console.error('Error al crear ruta:', err);
      }
    }, 100); // Pequeño delay para asegurar limpieza

    // Cleanup al desmontar o cuando cambien los puntos
    return () => {
      cleanup();
    };
  }, [startPoint, endPoint, map]); // Dependencias

  return null;
};

export default OSRMRoute;