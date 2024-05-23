import Head from 'next/head';
import Layout from '@components/Layout';
import { fetchCsv } from '../utils/fetchCsv';
import { MapContext, HotelContext } from "../context";
import { useReducer } from "react";
import reducer, { initialState } from "../reducer";
// import MarkerClusterGroup from 'react-leaflet-cluster'
import { useState } from "react";
import MapIcon from "../../assets/my-location.svg";
import { FaMapMarked } from "react-icons/fa";
import slugify from 'slugify';
import { Source_Code_Pro, Montserrat } from 'next/font/google'
import {catToColor, catToProjColor} from 'src/utils/categoryColor';

const scp = Source_Code_Pro({ subsets: ['latin'] })

// Source_Code_Pro Montserrat

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
          <style jsx>{`
              .entry:hover {
                -webkit-filter: brightness(90%);
              }
            `}</style>
            <div style={{fontSize: '21px', display: "flex", flexDirection: "column", position: "absolute"}} className={scp.className}>
            <div style={{padding: "10px", marginLeft: "auto", marginRight: "auto"}}>
                {records.map((record) => (
                  <div className='entry' style={{backgroundColor: "#eee", borderBottom: "solid var(--cat-blue) 6px", borderColor: catToColor(record.category), borderRight: "solid #777 1px",borderLeft: "solid #777 1px",borderTop: "solid #777 1px", marginLeft: "auto", marginRight: "auto", marginTop: "20px", marginBottom: "5px", alignSelf: "center", display: "flex"}}>
                    <a style={{fontSize: "25px"}} href={'/candidates/'+record.id}><div style={{
                      // border: "solid var(--cat-blue) 3px",
                      // borderColor: catToProjColor(record.category),
                      // backgroundColor: catToProjColor(record.category),
                      height: "144px", width: "96px",  }}>
                      <img src={record.img} style={{height: "144px", width: "96px"}}></img>
                    </div></a>
                    <a style={{
                      // border: "solid var(--cat-blue) 3px",
                      // borderColor: catToProjColor(record.category),
                      // backgroundColor: catToColor(record.category),
                      padding: "10px",
                      maxWidth: "700px",
                      width: "100%",
                      color: "#111",
                      marginLeft: "4px",
                      }} href={'/candidates/'+record.id}>
                      <div>
                      <h3 style={{margin: 0, fontSize: "20px"}}>{record.name}</h3>
                      <p style={{margin: 0, fontSize: "15px"}}>{record.district}</p>
                      <p style={{margin: 0, fontSize: "15px"}}>{record.organisation}</p>
                      <p style={{margin: 0, marginTop: "5px", fontSize: "20px"}}>{record.title}</p>
                    </div></a>
                  </div>
                ))}
            </div>
            </div>
            <div style={{top: '100px', right: '16px', width: '48px', height: '48px', padding: "0", backgroundColor: "#eee", border: "2px solid #111"}}>
              <a href='/map' style={{marginBottom: "0",display: 'block', margin: "5px"}}><FaMapMarked  size={32} style={{pointerEvents: 'none', fill: "var(--dark-blue)"}}></FaMapMarked></a>
            </div>
          </Layout>
        </MapContext.Provider>
      </HotelContext.Provider>
    </>
  )
}
