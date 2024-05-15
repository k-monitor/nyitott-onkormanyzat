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
import path from 'path';
// import MarkerClusterGroup from 'react-leaflet-cluster'
import { useState } from "react";


export default function Home({ records, data, props }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hotels, setHotels] = useState(records);
  const mapData = { ...state, dispatch };

  return (
    <>
      <Head>

      </Head>
      <div>
      <main>
        <h1>Nyitott önkormányzat</h1>
        <p>Ide kéne írni valamit.</p>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <a style={{marginRight: '50px'}} href='/'>jelölt vagyok</a>
          <a href='/list'>látogató</a>
        </div>
      </main>

      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
        }

        main {
          text-align: center;
        }

        h1 {
          font-size: 2em;
          color: #333;
        }

        p {
          font-size: 1.2em;
          color: #555;
        }
      `}</style>
    </div>
    </>
  )
}
