import Head from 'next/head';
import Layout from '@components/Layout';
import Section from '@components/Section';
import Map from '@components/Map';
import Button from '@components/Button';
import { fetchCsv } from '../utils/fetchCsv';
import { MapContext } from "../context";
import { useEffect, useState, useReducer, lazy, Suspense } from "react";
import reducer, { initialState } from "../reducer";

import styles from '@styles/Home.module.scss';

import fs from 'fs';
import path from 'path';

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
  const mapData = { ...state, dispatch };

  return (
    <>
      <Head>

      </Head>
      <MapContext.Provider value={mapData}>
        <Layout {...props} >
          <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={12} jsonData={data} >
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
                />
                {records.map((record) => (
                  <Marker key={record.id} position={[record.lat,record.long]}>
                    <Popup>
                      <h3>{record.name}</h3> <br /> {record.district} <br /> <img src={record.img}></img> <br/> <p>{record.program}</p> <br /> <Button href={"/candidates/"+record.id+'.html'}>Részletek</Button>
                    </Popup>
                  </Marker>
                ))}
              </>
            )}
          </Map>
        </Layout>
      </MapContext.Provider>
    </>
  )
}
