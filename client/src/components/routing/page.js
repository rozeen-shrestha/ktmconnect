import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import { Card, CardFooter, CardContent, CardHeader } from "@rafty/ui";

const Routing = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Create the custom directions panel
    const customControl = L.Control.extend({
      onAdd: function () {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        container.style.text = 'black';
        container.style.padding = '10px';
        container.style.maxHeight = '300px';
        container.style.overflowY = 'auto';
        container.style.width = '200px';
        container.style.fontSize = '12px';
        container.id = 'directions';
        return container;
      },
      onRemove: function () {}
    });

    map.addControl(new customControl({ position: 'topright' }));

    // Create the routing control
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(27.7317727, 85.3525278), // Berlin
        L.latLng(27.7837727, 85.3525278)       // Paris
      ],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: '#4A90E2', weight: 4, opacity: 0.7 }]
      },
      createMarker: (i, waypoint, n) => {
        return L.marker(waypoint.latLng, {
          icon: L.divIcon({
            html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <circle cx="12" cy="12" r="10" fill="${i === 0 ? 'green' : i === n - 1 ? 'red' : 'blue'}" />
                    <text x="12" y="16" text-anchor="middle" font-size="12" fill="#fff">X</text>
                  </svg>`,
            className: '',
            iconSize: [24, 24],
            iconAnchor: [12, 24]
          })
        });
      },
      show: false // Hide the default directions panel
    }).on('routesfound', (e) => {
      const routes = e.routes;
      const summary = routes[0].summary;
      const directionsElement = document.getElementById('directions');
      directionsElement.innerHTML = `
      <div>
          <h3>Directions</h3>
          <p>Total distance: ${(summary.totalDistance / 1000).toFixed(2)} km</p>
          <p>Total time: ${Math.floor(summary.totalTime / 3600)} hours ${Math.floor((summary.totalTime % 3600) / 60)} minutes</p>
        </div>
      `;
    }).addTo(map);

    // Hide the default container
    routingControl.on('routeselected', () => {
      if (routingControl._container) {
        routingControl._container.style.display = 'none';
      }
    });

    return () => {
      if (map && routingControl) {
        routingControl.getPlan().setWaypoints([]); // Remove waypoints
        map.removeControl(routingControl);
      }
    };
  }, [map]);

  return null;
};

export default Routing;
