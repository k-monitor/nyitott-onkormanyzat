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
        <h1>Építsünk Nyitott Önkormányzatot!</h1>

        <div style={{maxWidth: "800px", marginLeft: "auto", marginRight: "auto"}}>
          <p>Itt hamarosan a K-Monitor Nyitott Önkormányzatok projekt keretében tett polgármesterjelölti vállalások lesznek böngészhetők egy interaktív térképen!</p>

          <p>Addig is olvasd el <a href="https://drive.google.com/file/d/1bY_8IDRlutW7103vRZYfvnsUeoj8Aosy/view">kiadványunkat</a>, ahol hazai és nemzetközi példákkal illusztráltuk, mit értünk a gyakorlatban a nyitott önkormányzatiság alatt. </p>
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <a className='button' style={{marginRight: '50px'}} href='https://docs.google.com/forms/d/e/1FAIpQLScGZmVAP0Ka_oGt7bhPkUmT7weW139NfeOHW-3ZYNTJT6SaPw/viewform'>Polgármesterjelölt vagyok, vállalást teszek!</a>
          {/* <a className='button' href='/list'>Választó vagyok, megnézem a vállalásokat!</a> */}
          <a className='disabled button'>Választó vagyok, megnézem a vállalásokat!</a>
        </div>
        <footer style={{bottom: "20px", position: "absolute", width: "100%"}}>
        <p>Értesülj a K-Monitor havi beszámolójából további hasonló projektekről!</p>
        <p>Iratkozz fel!</p>
        <p>k-monitor.hu</p>
        </footer>

      </main>

      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
        }

        footer * {
          margin: 0;
        }

        html, body, #__next, main {
          height: 100vh;
        }

        main {
          background-color: var(--dark-blue);
          color: #eee;
          text-align: center;
        }

        h1 {
          font-size: 2em;
        }

        p {
          font-size: 1.2em;
        }

        a:hover {
          color: #fff;
        }

        a {
          text-decoration: underline;
        }

        a.button {
          background: #eee;
          padding: 12px;
          color: #111;
          border-radius: 8px;
          text-decoration: none;
        }
        a.button:hover {
          color: #888;
        }

        a.disabled {
          color: #888;
          cursor: not-allowed;
        }
      `}</style>
    </>
  )
}
