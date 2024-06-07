import { useEffect } from 'react';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapEvents } from 'react-leaflet';
import { useState } from "react";
import { Source_Code_Pro, Montserrat } from 'next/font/google'
const scp = Source_Code_Pro({ subsets: ['latin'] })
import {catToColorName, electToPin, catToColor} from 'src/utils/categoryColor';
import Button from '@components/ui/Button';

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

const Map = ({ children, className, width, height, jsonData, pageData, ...rest }) => {
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

  const createCustomIcon = (iconUrl) => {
    return new Leaflet.Icon({
      iconUrl: iconUrl,
      iconAnchor: new L.Point(12, 36),
      popupAnchor: new L.Point(0, 0),
      iconSize: new L.Point(24, 36),
      iconRetinaUrl: iconUrl,
      className: 'leaflet-div-icon-transparent'
    });
  };


  const markers = pageData.map((record) => {
    const customIcon = createCustomIcon(electToPin(record.elected));
    return (
      <ReactLeaflet.Marker key={record.id} position={[record.lat, record.long]} icon={customIcon}>
        <ReactLeaflet.Popup>
          <div className={scp.className} style={{backgroundColor: "#eee", borderBottom: "solid var(--cat-blue) 6px", borderColor: catToColor(record.category), borderRight: "solid #777 1px",borderLeft: "solid #777 1px",borderTop: "solid #777 1px", margin: "0 !important", display: "flex"}}>
            <div style={{height: "225px", width: "150px", }}>
              <img width={150} height={225} style={{height: "225px", width: "150px", maxWidth: 'none' }} src={record.img}></img>
            </div>
            <div style={{minWidth: "200px", display: "flex", padding: "5px", flexDirection: 'column'}}>
              <h1 style={{margin: "0", fontSize: "18px", marginRight: '30px'}}>{record.name}</h1>
              <p style={{margin: "0", width: "fit-content", }}><a style={{color: "var(--dark-blue)"}} href={'/district/'+slugify(record.district)}>{record.district}</a></p>
              <p style={{margin: "0", fontSize: "17px"}}>{record.title}</p>
              <Button className='candidateButton' style={{marginTop: "auto", bottom: "0", backgroundColor: "var(--dark-blue)"}} isPlainAnchor={true} href={config.prefix+'/'+"candidates/"+record.id+''}>Részletek</Button>
            </div>
          </div>
        </ReactLeaflet.Popup>
      </ReactLeaflet.Marker>
    );
  });


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
    {markers}
    </MapContainer>
  )
}

export default Map;
