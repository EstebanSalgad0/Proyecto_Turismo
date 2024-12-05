import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';

// eslint-disable-next-line react/prop-types
const LeafletMap = ({ latitud, longitud, mapId, googleMapUrl }) => {
  const mapRef = useRef(null); // Referencia para almacenar el mapa
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
    // Verificamos si el mapa no ha sido inicializado aún
    if (!mapRef.current) {
      const map = L.map(mapId, { zoomControl: false }).setView(targetCoords, 13);
      mapRef.current = map;

      // Cargar capa de OpenStreetMap
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Define un ícono personalizado
    const customIcon = L.icon({
      iconUrl: 'https://mueblescaracol.cl/productos/map-marker-blue.png', // Ruta a tu imagen
      iconSize: [32, 32], // Tamaño del ícono
      iconAnchor: [16, 32], // Punto de anclaje (base del ícono)
      popupAnchor: [0, -32], // Punto de anclaje para el popup
    });

    // Define otro ícono para el marcador del usuario, si es necesario
    const userIcon = L.icon({
      iconUrl: 'https://mueblescaracol.cl/productos/map-marker-blue.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    // Crear marcador de destino con ícono personalizado
    let targetMarker = L.marker(targetCoords, { icon: customIcon })
      .addTo(map)
      .bindPopup("Destino", { closeOnClick: false });

    navigator.geolocation.watchPosition(success, error);

      // Agregar controles de zoom
      L.control.zoom({ position: 'bottomleft' }).addTo(map);

      function success(pos) {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        userCoords = [lat, lng];
        // Crear marcador del usuario con ícono personalizado
        userMarker = L.marker(userCoords, { icon: userIcon })
          .addTo(map)
          .bindPopup("Usted está aquí", { closeOnClick: false });
  
        updateRoute();
        togglePopups();
      }

      // Información de distancia y tiempo
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
            // Usar íconos personalizados
      const icon = i === 0 ? userIcon : customIcon;
      return L.marker(wp.latLng, { icon }).bindPopup(
        i === 0 ? "Usted está aquí" : "Destino",
        { closeOnClick: false }
      );
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

      function error() {
        // En caso de error, eliminar el mapa Leaflet y cargar el iframe de Google Maps
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
        // Cargar el iframe de Google Maps
        document.getElementById(mapId).innerHTML = `
          <iframe
            src="${googleMapUrl}"
            width="100%"
            height="100%"
            allowfullscreen=""
            loading="lazy"
          ></iframe>`;
      }

      // Agregar control de Google Maps
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

      // Agregar controles de transporte
      L.Control.TransportControls = L.Control.extend({
        onAdd: function () {
          const container = L.DomUtil.create('div', 'transport-controls');
          container.innerHTML = `
            <button id="carButton">Auto</button>
            <button id="bicycleButton">Bicicleta</button>
            <button id="footButton">A pie</button>
          `;
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

      // Limpieza al desmontar el componente
      return () => {
        if (mapRef.current) {
          mapRef.current.remove(); // Elimina el mapa Leaflet
          mapRef.current = null; // Limpia la referencia
        }
      };
    }
  }, [googleMapUrl]); // Dependencia para el caso cuando cambie la URL de Google Map

  return (
    <div>
      <div className={"generalMap"} id={mapId} />
    </div>
  );
};

export default LeafletMap;