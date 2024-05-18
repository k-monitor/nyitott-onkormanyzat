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
import catToColor from 'src/utils/categoryColor';
import { Source_Code_Pro, Montserrat } from 'next/font/google'

const scp = Source_Code_Pro({ subsets: ['latin'] })


const DEFAULT_CENTER = [47.497913, 19.040236]

export async function getStaticProps() {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQr3xG4WxuzMC3G4sDDpdFlBT9EdOuyjTw2Xd_HHYnKzs-ptHuXH4bpH67Z1fDOiDFE0qaIYZ1OUP9x/pub?gid=0&single=true&output=csv'
  const records = await fetchCsv(url);

  const dataPath = path.join(process.cwd(), 'assets', 'kozig.geojson'); // Path to your JSON file
  const jsonData = fs.readFileSync(dataPath, 'utf8'); // Read the file
  const data = JSON.parse(jsonData); // Parse the JSON content
  return { props: { records, data } }
}

export default function Home({ records, data, props }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hotels, setHotels] = useState(records);
  const mapData = { ...state, dispatch };

  return (
    <>
      <Head>

      </Head>
      <HotelContext.Provider value={{ hotels }}>
        <MapContext.Provider value={mapData}>
          <Layout {...props} >
            <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={12} jsonData={data}  >
              {({ TileLayer, Marker, Popup }) => (
                <>
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
                  />
                  {/* <MarkerClusterGroup> */}
                  {records.map((record) => (
                    <Marker key={record.id} position={[record.lat,record.long]}>
                      <Popup>
                        <div className={scp.className} style={{border: "solid #eee 3px", borderColor: catToColor(record.category), padding: "5px", margin: "0 !important", display: "flex"}}>
                          <div style={{height: "200px", width: "150px", marginRight: "4px", }}>
                            <img width={150} height={200} style={{height: "200px", width: "150px", border: "solid #eee 3px"}} src={record.img}></img>
                          </div>
                          <div style={{minWidth: "200px", display: "flex", flexDirection: 'column'}}>
                            <h1 style={{margin: "0"}}>{record.name}</h1>
                            <p style={{margin: "0"}}><a href={'/district/'+slugify(record.district)}>{record.district}</a></p>
                            <p style={{margin: "0", fontSize: "17px"}}>{record.title}</p>
                            <Button style={{marginTop: "auto", bottom: "0", backgroundColor: "var(--dark-blue)"}} isPlainAnchor={true} href={config.prefix+'/'+"candidates/"+record.id+''}>Részletek</Button>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                  {/* </MarkerClusterGroup> */}
                </>
              )}
            </Map>
          </Layout>
        </MapContext.Provider>
      </HotelContext.Provider>
    </>
  )
}
