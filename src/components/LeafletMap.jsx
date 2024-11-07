import React, { useEffect, useRef , useState } from 'react';
import L from  'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';


const LeafletMap = ({ latitud, longitud}) => {
    const mapRef = useRef(null);
    const coordenadas = [latitud, longitud];
  return (
    <div>
        <div id="map" />
    </div>
  )
}

export default LeafletMap