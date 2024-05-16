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
import Logo from "../../assets/nh-logo.svg";


export default function Home({ records, data, props }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hotels, setHotels] = useState(records);
  const mapData = { ...state, dispatch };

  return (
    <>
      <Head>

      </Head>
      <main>
        <Logo style={{scale:"2", margin: "80px", fill: '#eee'}} />
        <h1>Nyitott önkormányzat</h1>

        <p>Ide kéne írni valamit.</p>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <a style={{marginRight: '50px'}} href='https://docs.google.com/forms/d/e/1FAIpQLScGZmVAP0Ka_oGt7bhPkUmT7weW139NfeOHW-3ZYNTJT6SaPw/viewform'>jelölt vagyok</a>
          <a className='disabled'>látogató</a>
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

        html, body, #__next, main {
          height: 100vh;
        }

        main {
          background-color: #126ca5;
          color: #eee;
          text-align: center;
        }

        h1 {
          font-size: 2em;
        }

        p {
          font-size: 1.2em;
        }

        a {
          background: #eee;
          padding: 8px;
          color: #111;
          border-radius: 5px;
        }
        a:hover {
          color: #888;
        }

        a.disabled {
          color: #888;
        }
      `}</style>
    </>
  )
}
