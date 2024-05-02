import { useEffect } from 'react';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import styles from './Map.module.scss';

const { MapContainer } = ReactLeaflet;

const Map = ({ children, className, width, height, jsonData, ...rest }) => {
  let mapClassName = styles.map;

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
        iconUrl: 'leaflet/images/marker-icon.png',
        shadowUrl: 'leaflet/images/marker-shadow.png',
      });
    })();
  }, []);

  const hasCandidate = [];

  return (
    <MapContainer className={mapClassName} {...rest}>
      {children(ReactLeaflet, Leaflet)}
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
