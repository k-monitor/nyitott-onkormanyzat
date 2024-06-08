import Head from 'next/head';
import Layout from '@components/Layout';
import Map from '@components/Map';
import Button from '@components/ui/Button';
import { fetchCsv } from '../utils/fetchCsv';
import { MapContext, HotelContext } from "../context";
import { useReducer } from "react";
import reducer, { initialState } from "../reducer";
import styles from "../css/map.module.css";
import popStyles from "../css/Popup.module.css";
import { config } from "src/config";
import fs from 'fs';
import path from 'path';
// import MarkerClusterGroup from 'react-leaflet-cluster'
import { useState } from "react";
import slugify from 'slugify'
import {catToColor} from 'src/utils/categoryColor';
import { Source_Code_Pro, Montserrat } from 'next/font/google'
const scp = Source_Code_Pro({ subsets: ['latin'] })
import { FaList } from "react-icons/fa";
import { FaVoteYea } from "react-icons/fa";



const DEFAULT_CENTER = [47.2195681123155,	19.077758789062504]

export async function getStaticProps() {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQr3xG4WxuzMC3G4sDDpdFlBT9EdOuyjTw2Xd_HHYnKzs-ptHuXH4bpH67Z1fDOiDFE0qaIYZ1OUP9x/pub?gid=0&single=true&output=csv'
  const records = (await fetchCsv(url)).filter(item => item.img && item.id && item.name && item.title);

  const dataPath = path.join(process.cwd(), 'assets', 'kozig.geojson'); // Path to your JSON file
  const jsonData = fs.readFileSync(dataPath, 'utf8'); // Read the file
  const data = JSON.parse(jsonData); // Parse the JSON content
  return { props: { records, data } }
}

export default function Home({ records, data, props }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapData = { ...state, dispatch };
  const [hotels, setHotels] = useState(records);
  const [electedOnly, setelectedOnly] = useState(false);

  const clicked = (e) => {
    setelectedOnly(!electedOnly)
    if (electedOnly)
      setHotels(records)
    else
      setHotels(records.filter((r) => r.elected == 'TRUE'))
  }

  return (
    <>
      <Head>
        <title>Nyitott önkormányzat - K-Monitor</title>
      </Head>
      <HotelContext.Provider value={{ hotels }}>
        <MapContext.Provider value={mapData}>
          <Layout {...props} >
          <style>{`
            a:hover {
              -webkit-filter: brightness(90%);
            }
          `}</style>
            <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={7} jsonData={data} pageData={hotels} >
              {({ TileLayer, Marker, Popup }) => (
                <>
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
                  />
                  {/* <MarkerClusterGroup> */}
                  {/* {records.map((record) => ( */}
                  {/* ))} */}
                  {/* </MarkerClusterGroup> */}
                </>
              )}
            </Map>
            <div style={{top: '100px', right: '16px', width: '48px', height: '48px', backgroundColor: "#eee", border: "2px solid #111"}}>
              <a title="lista nézet" href='/list' style={{display: 'block', margin: "5px"}}><FaList  size={32} style={{pointerEvents: 'none', fill: "var(--dark-blue)"}}></FaList></a>
            </div>
            <div style={{top: '160px', right: '16px', width: '48px', height: '48px', backgroundColor: "#eee", border: "2px solid #111"}}>
              <a title="megválasztottak mutatása" href='#' onClick={clicked} style={{display: 'block', margin: "5px"}}><FaVoteYea  size={32} style={{pointerEvents: 'none', fill: electedOnly ? '#111':'#aaa'}}></FaVoteYea></a>
            </div>

          </Layout>
        </MapContext.Provider>
      </HotelContext.Provider>
    </>
  )
}
