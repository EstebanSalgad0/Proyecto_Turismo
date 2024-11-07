import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';

// eslint-disable-next-line react/prop-types
const LeafletMap = ({ latitud, longitud }) => {
  const mapRef = useRef(null);
  const targetCoords = [latitud, longitud];
  let userMarker;
  let userCoords;
  let routeControl;
  let transport = 'car';
  const transportSpeeds = {
    car: 50,
    bicycle: 15,
    foot: 5,
  };

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map', { zoomControl: false }).setView(targetCoords, 13);
      mapRef.current = map;

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      L.control.zoom({ position: 'bottomleft' }).addTo(map);

      const infoControl = L.control({ position: 'topright' });
      infoControl.onAdd = function () {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
      };
      infoControl.update = function (distance, time) {
        this._div.innerHTML = distance && time
          ? `<b>Distancia: ${distance} km</b><br/><b>Tiempo: ${time}</b>`
          : 'Calculando...';
      };
      infoControl.addTo(map);

      let targetMarker = L.marker(targetCoords).addTo(map).bindPopup("Destino", { closeOnClick: false });
      navigator.geolocation.watchPosition(success, error);

      function success(pos) {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        userCoords = [lat, lng];
        userMarker = L.marker(userCoords).addTo(map).bindPopup("Usted está aquí", { closeOnClick: false });
        updateRoute();
        togglePopups();
      }

      function setTransport(newTransport) {
        transport = newTransport;
        updateRoute();
      }

      function updateRoute() {
        if (routeControl) map.removeControl(routeControl);
        routeControl = L.Routing.control({
          waypoints: [L.latLng(userCoords), L.latLng(targetCoords)],
          routeWhileDragging: true,
          show: false,
          createMarker: function (i, wp) {
            return L.marker(wp.latLng).bindPopup(i === 0 ? "Usted está aquí" : "Río Melado", { closeOnClick: false });
          },
        }).addTo(map);

        routeControl.on('routesfound', function (e) {
          const route = e.routes[0];
          const distance = (route.summary.totalDistance / 1000).toFixed(2);
          const speed = transportSpeeds[transport];
          const totalTimeInHours = route.summary.totalDistance / 1000 / speed;
          const hours = Math.floor(totalTimeInHours);
          const minutes = Math.floor((totalTimeInHours - hours) * 60);
          const time = hours > 0 ? `${hours} h ${minutes} min` : `${minutes} min`;
          infoControl.update(distance, time);
          map.fitBounds(L.latLngBounds(route.coordinates));
        });
      }

      function togglePopups() {
        if (targetMarker.isPopupOpen()) {
          targetMarker.closePopup();
          setTimeout(() => userMarker.openPopup(), 200);
        } else {
          userMarker.closePopup();
          setTimeout(() => targetMarker.openPopup(), 200);
        }
        setTimeout(togglePopups, 4000);
      }

      function openInGoogleMaps() {
        if (userCoords) {
          const userLatLng = `${userCoords[0]},${userCoords[1]}`;
          const targetLatLng = `${targetCoords[0]},${targetCoords[1]}`;
          const googleMapsUrl = `https://www.google.com/maps/dir/${userLatLng}/${targetLatLng}/`;
          window.open(googleMapsUrl, '_blank');
        } else {
          alert("No se pudo obtener la ubicación actual.");
        }
      }

      // Error handling for geolocation
      function error(err) {
        alert(err.code === 1 ? "Por favor permite el acceso a tu ubicación" : "No pudimos encontrar tu ubicación");
      }

      // Add Google Maps control
      L.Control.GoogleMaps = L.Control.extend({
        onAdd: function () {
          const container = L.DomUtil.create('div', 'leaflet-control-google-maps');
          container.innerHTML = 'Ver en Google Maps';
          container.onclick = openInGoogleMaps;
          return container;
        }
      });
      L.control.googleMaps = function (opts) {
        return new L.Control.GoogleMaps(opts);
      }
      L.control.googleMaps({ position: 'bottomright' }).addTo(map);

      // Add transport controls
      L.Control.TransportControls = L.Control.extend({
        onAdd: function () {
          const container = L.DomUtil.create('div', 'transport-controls');
          container.innerHTML = `
            <button id="carButton">Auto</button>
            <button id="bicycleButton">Bicicleta</button>
            <button id="footButton">A pie</button>
          `;

          // Agregar eventos a los botones
          container.querySelector('#carButton').onclick = () => setTransport('car');
          container.querySelector('#bicycleButton').onclick = () => setTransport('bicycle');
          container.querySelector('#footButton').onclick = () => setTransport('foot');

          return container;
        }
      });
      L.control.transportControls = function (opts) {
        return new L.Control.TransportControls(opts);
      }
      L.control.transportControls({ position: 'topright' }).addTo(map);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <div id="map" />
    </div>
  );
};

export default LeafletMap;