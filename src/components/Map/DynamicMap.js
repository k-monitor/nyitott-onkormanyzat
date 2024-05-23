import { useEffect } from 'react';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapEvents } from 'react-leaflet';
import { useState } from "react";

import styles from './Map.module.scss';
import { config } from 'src/config';
import { useRouter } from 'next/navigation'
import slugify from 'slugify';
 
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

  const iconPerson = new L.Icon({
    iconUrl: 'http://localhost:3000/leaflet/images/marker-icon-blue.png',
    iconRetinaUrl: 'http://localhost:3000/leaflet/images/marker-icon-blue.png',
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
  });

  useEffect(() => {
    (async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/images/marker-icon-blue.png',
        iconUrl: '/leaflet/images/marker-icon-blue.png',
        shadowUrl: '/leaflet/images/marker-shadow.png',
      });
    })();
  }, []);

  const hasCandidate = [];
  const router = useRouter()

  function handleGeoJSONClick(event){
    console.log(event.layer.feature.properties.NAME)
     
    router.push('/district/'+slugify(event.layer.feature.properties.NAME), { scroll: false })
  }
  return (
    <MapContainer className={mapClassName} onClick={handleClick} {...rest}>
      {children(ReactLeaflet, Leaflet)}
      <LocationMarker />
      <ReactLeaflet.GeoJSON eventHandlers={{click: handleGeoJSONClick}} data={jsonData} style={
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
