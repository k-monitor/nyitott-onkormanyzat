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
import Logo from "../../assets/nyitott-onkormanyzat-logo.svg";
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })


export default function Home({ records, data, props }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hotels, setHotels] = useState(records);
  const mapData = { ...state, dispatch };

  return (
    <>
      <Head>
        <title>Nyitott önkormányzat - K-Monitor</title>
        <meta property="og:title" content="Nyitott önkormányzat" />
      </Head>
      <main className={montserrat.className} >
        <div>
        <Logo style={{scale:"2", margin: "80px", marginTop: "100px", marginLeft: "auto", marginRight: "auto", fill: '#eee', backgroundColor: "var(--dark-blue)", minHeight: "150px"}} />
        <h1>Építsünk Nyitott Önkormányzatot!</h1>

        <div style={{maxWidth: "800px", marginLeft: "auto", marginRight: "auto", width: "100%", backgroundColor: "var(--dark-blue)"}}>
          <p>A K-Monitor a 2024-es önkormányzati választásokhoz közeledve arra ösztönözte a polgármesterjelölteket, hogy köteleződjenek el az átlátható és részvételi alapon működő önkormányzatiság mellett, a választókat pedig arra, hogy legyenek aktív szereplői a választásoknak és követeljenek maguknak valódi képviseletet!</p>
          <p>Ezen az oldalon azokat a jelölteket és vállalásaikat lehet megtalálni, akik elköteleződtek a nyitott önkormányzatiság mellett. A nyertes polgármesterek esetében a jövőben ezen az oldalon követni fogjuk a vállalások teljesülését.</p>
          <p><a href="https://nyitottonkormanyzat.k-monitor.hu/paper" target="_blank">Kiadványunkból</a> bátran inspirálódhatsz! Hazai és nemzetközi példák segítenek eligazodni, hogy mit is értünk nyitott önkormányzat alatt.</p>
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          {/* <a className='button' style={{marginRight: '50px'}} href='https://docs.google.com/forms/d/e/1FAIpQLScGZmVAP0Ka_oGt7bhPkUmT7weW139NfeOHW-3ZYNTJT6SaPw/viewform'>Polgármesterjelölt vagyok, vállalást teszek!</a> */}
          <a className='button' href='/map'>Elolvasom a vállalásokat!</a>
          {/* <a className='disabled button'>Választó vagyok, megnézem a vállalásokat!</a> */}
        </div>
        <footer style={{width: "100%", marginTop: "auto", backgroundColor: "var(--dark-blue)"}}>
          {/* <p>Értesülj a K-Monitor havi beszámolójából további hasonló projektekről!</p> */}
          {/* <p>Iratkozz fel!</p> */}
          <p><a href="https://k-monitor.hu">k-monitor.hu</a></p>
        </footer>
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

        footer * {
          margin: 20px;

        }


        html, body, #__next, main {
          height: 100vh;
        }
        
        html {
          background-color: #111 !important;
        }

        main * {
          background-color: var(--dark-blue);
        }

        main {
          background-color: var(--dark-blue);
          color: #eee;
          text-align: center;
          display: flex;
          flex-direction: column;
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
