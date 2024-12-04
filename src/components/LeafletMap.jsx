import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

// eslint-disable-next-line react/prop-types
const LeafletMap = ({ latitud, longitud, mapId, googleMapUrl }) => {
  const mapRef = useRef(null);
  const targetMarkerRef = useRef(null);
  const userMarkerRef = useRef(null);
  const userCoordsRef = useRef(null);
  const targetCoords = [latitud, longitud];
  const routeControlRef = useRef(null);
  const transportSpeeds = {
    car: 50,
    bicycle: 15,
    foot: 5,
  };

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map(mapId, { zoomControl: false }).setView(targetCoords, 13);
      mapRef.current = map;

      // Capa de OpenStreetMap
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Controles de zoom
      L.control.zoom({ position: "bottomleft" }).addTo(map);

      // Control de información
      const infoControl = L.control({ position: "topright" });
      infoControl.onAdd = function () {
        this._div = L.DomUtil.create("div", "info");
        this.update();
        return this._div;
      };
      infoControl.update = function (distance, time) {
        this._div.innerHTML =
          distance && time
            ? `<b>Distancia: ${distance} km</b><br/><b>Tiempo: ${time}</b>`
            : "Calculando...";
      };
      infoControl.addTo(map);

      // Marcador de destino
      if (!targetMarkerRef.current) {
        targetMarkerRef.current = L.marker(targetCoords)
          .addTo(map)
          .bindPopup("Destino", { closeOnClick: false });
      }

      // Geolocalización del usuario
      navigator.geolocation.watchPosition(success, error);

      function success(pos) {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        userCoordsRef.current = [lat, lng];

        // Manejar el marcador del usuario
        if (!userMarkerRef.current) {
          userMarkerRef.current = L.marker(userCoordsRef.current)
            .addTo(map)
            .bindPopup("Usted está aquí", { closeOnClick: false });
        } else {
          userMarkerRef.current.setLatLng(userCoordsRef.current);
        }

        updateRoute();
      }

      function updateRoute() {
        if (userCoordsRef.current && targetCoords) {
          if (!routeControlRef.current) {
            routeControlRef.current = L.Routing.control({
              waypoints: [
                L.latLng(userCoordsRef.current),
                L.latLng(targetCoords),
              ],
              routeWhileDragging: true,
              createMarker: (i, wp) =>
                L.marker(wp.latLng).bindPopup(
                  i === 0 ? "Usted está aquí" : "Destino"
                ),
            }).addTo(map);

            routeControlRef.current.on("routesfound", function (e) {
              const route = e.routes[0];
              const distance = (route.summary.totalDistance / 1000).toFixed(2);
              const speed = transportSpeeds["car"];
              const totalTimeInHours =
                route.summary.totalDistance / 1000 / speed;
              const hours = Math.floor(totalTimeInHours);
              const minutes = Math.floor((totalTimeInHours - hours) * 60);
              const time =
                hours > 0 ? `${hours} h ${minutes} min` : `${minutes} min`;

              infoControl.update(distance, time);
            });
          } else {
            routeControlRef.current.setWaypoints([
              L.latLng(userCoordsRef.current),
              L.latLng(targetCoords),
            ]);
          }
        }
      }

      function error() {
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
    }

    // Cleanup al desmontar el componente
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        targetMarkerRef.current = null;
        userMarkerRef.current = null;
        routeControlRef.current = null;
      }
    };
  }, [latitud, longitud, mapId, googleMapUrl]);

  return (
    <div>
      <div className="generalMap" id={mapId} />
    </div>
  );
};

export default LeafletMap;
