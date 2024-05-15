import Head from 'next/head';
import Layout from '@components/Layout';
import { fetchCsv } from '../utils/fetchCsv';
import { MapContext, HotelContext } from "../context";
import { useReducer } from "react";
import reducer, { initialState } from "../reducer";
// import MarkerClusterGroup from 'react-leaflet-cluster'
import { useState } from "react";
import MapIcon from "../../assets/my-location.svg";


export async function getStaticProps() {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQr3xG4WxuzMC3G4sDDpdFlBT9EdOuyjTw2Xd_HHYnKzs-ptHuXH4bpH67Z1fDOiDFE0qaIYZ1OUP9x/pub?gid=0&single=true&output=csv'
  const records = await fetchCsv(url);

  return { props: { records } }
}

export default function Home({ records, props }) {
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
            <div style={{fontSize: '21px'}}>
              <ul>
                {records.map((record) => (
                  <li><a href={'/candidates/'+record.id}>{record.name}</a></li>
                ))}
              </ul>
            </div>
            <div style={{top: '100px', right: '10px', width: '48px', height: '48px'}}>
              <a href='/map' style={{display: 'block'}}><MapIcon style={{pointerEvents: 'none'}}></MapIcon></a>
            </div>

          </Layout>
        </MapContext.Provider>
      </HotelContext.Provider>
    </>
  )
}
