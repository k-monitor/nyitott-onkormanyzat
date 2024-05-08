import { useEffect } from 'react';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapEvents } from 'react-leaflet';
import { useState } from "react";

import styles from './Map.module.scss';
import { config } from 'src/config';

const { MapContainer } = ReactLeaflet;

function LocationMarker() {
  const map = useMapEvents({
    click(e) {
      navigator.clipboard.writeText(e.latlng.lat+'\t'+e.latlng.lng);
      console.log(e.latlng.lat)
      console.log(e.latlng.lng)
    },
  })
}

const Map = ({ children, className, width, height, jsonData, ...rest }) => {
  let mapClassName = styles.map;

  const handleClick = (e) => {
    console.log(e)
  }

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        console.log(e.latlng.lat);
        console.log(e.latlng.lng);
      },
    });
    return false;
  }

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: config.baseUrl+'leaflet/images/marker-icon-2x.png',
        iconUrl: config.baseUrl+'leaflet/images/marker-icon.png',
        shadowUrl: config.baseUrl+'leaflet/images/marker-shadow.png',
      });
    })();
  }, []);

  const hasCandidate = [];
    
  return (
    <MapContainer className={mapClassName} onClick={handleClick} {...rest}>
      {children(ReactLeaflet, Leaflet)}
      <LocationMarker />
      <ReactLeaflet.GeoJSON data={jsonData} style={
        function(feature) {
          return {
            fillColor: hasCandidate.indexOf(feature.properties.NAME)==-1 ? "#aaaaaa" : "#44aa44",
            weight: 0.5,
            opacity: 1,
            color: "#000000",
            dashArray: '0',
            fillOpacity: 0.5
        }
      }
} />
    </MapContainer>
  )
}

export default Map;
