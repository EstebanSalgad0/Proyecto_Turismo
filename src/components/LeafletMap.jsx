import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

const LeafletMap = ({ latitud, longitud, mapId, googleMapUrl }) => {
  const mapRef = useRef(null);
  const targetCoords = [latitud, longitud];
  let userMarker = null;
  let userCoords = null;
  let routeControl = null;
  let transport = "car";

  const transportSpeeds = {
    car: 50, // km/h
    bicycle: 15, // km/h
    foot: 5, // km/h
  };

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map(mapId, { zoomControl: false }).setView(targetCoords, 13);
      mapRef.current = map;

      // Cargar capa de OpenStreetMap
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const customIcon = L.icon({
        iconUrl: "/assets/img/map-marker-blue.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const userIcon = L.icon({
        iconUrl: "/assets/img/map-marker-blue.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      // Marcador de destino
      const targetMarker = L.marker(targetCoords, { icon: customIcon })
        .addTo(map)
        .bindPopup("Destino", { closeOnClick: false })
        .openPopup();

      const infoControl = L.control({ position: "topright" });
      infoControl.onAdd = function () {
        this._div = L.DomUtil.create("div", "info text-black bg-white shadow");
        this.update();
        return this._div;
      };
      infoControl.update = function (distance, time) {
        this._div.innerHTML = distance && time
          ? `<b>Distancia: ${distance} km</b><br/><b>Tiempo: ${time}</b>`
          : "Calculando...";
      };
      infoControl.addTo(map);

      const updateRoute = () => {
        if (routeControl) map.removeControl(routeControl);
        routeControl = L.Routing.control({
          waypoints: [L.latLng(userCoords), L.latLng(targetCoords)],
          routeWhileDragging: false,
          show: false,
          createMarker: (i, wp) =>
            L.marker(wp.latLng, {
              icon: i === 0 ? userIcon : customIcon,
            }).bindPopup(i === 0 ? "Usted está aquí" : "Destino"),
        }).addTo(map);

        routeControl.on("routesfound", (e) => {
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
      };

      // Obtener ubicación del usuario
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          userCoords = [lat, lng];
          userMarker = L.marker(userCoords, { icon: userIcon })
            .addTo(map)
            .openPopup();

          updateRoute();
        },
        () => {
          // En caso de error al obtener la ubicación, cargar el mapa predeterminado de Google Maps
          if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
          }
          document.getElementById(mapId).innerHTML = `
            <iframe
              src="${googleMapUrl}"
              width="100%"
              height="100%"
              allowfullscreen=""
              loading="lazy"
            ></iframe>`;
        }
      );

      const transportControl = L.control({ position: "topright" });
      transportControl.onAdd = function () {
        const container = L.DomUtil.create("div", "transport-controls");
        container.innerHTML = `
          <button id="carButton">Auto</button>
          <button id="bicycleButton">Bicicleta</button>
          <button id="footButton">A pie</button>
        `;
        container.querySelector("#carButton").onclick = () => {
          transport = "car";
          updateRoute();
        };
        container.querySelector("#bicycleButton").onclick = () => {
          transport = "bicycle";
          updateRoute();
        };
        container.querySelector("#footButton").onclick = () => {
          transport = "foot";
          updateRoute();
        };
        return container;
      };
      transportControl.addTo(map);

      const googleMapsControl = L.control({ position: "bottomright" });
      googleMapsControl.onAdd = function () {
        const container = L.DomUtil.create("div", "leaflet-control-google-maps");
        container.innerHTML = `Ver en Google Maps`;
        container.onclick = () => {
          if (userCoords) {
            const googleMapsUrl = `https://www.google.com/maps/dir/${userCoords[0]},${userCoords[1]}/${targetCoords[0]},${targetCoords[1]}/`;
            window.open(googleMapsUrl, "_blank");
          } else {
            alert("No se pudo obtener la ubicación actual.");
          }
        };
        return container;
      };
      googleMapsControl.addTo(map);

      L.control.zoom({ position: "bottomleft" }).addTo(map);

      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    }
  }, [googleMapUrl]);

  return <div className="generalMap" id={mapId} />;
};

export default LeafletMap;