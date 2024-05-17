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
import catToColor from 'src/utils/categoryColor';

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
            <div style={{fontSize: '21px', display: "flex", flexDirection: "column", position: "absolute"}} className={scp.className}>
                {records.map((record) => (
                  <div style={{marginLeft: "auto", marginRight: "auto", marginTop: "20px", paddingBottom: "10px", alignSelf: "center", display: "flex"}}>
                    <div style={{
                      border: "solid var(--cat-blue) 3px",
                      borderColor: catToColor(record.category),
                      backgroundColor: catToColor(record.category),
                      height: "134px", width: "40" }}>
                      <img src={record.img} style={{height: "128px", width: "96px"}}></img>
                    </div>
                    <div style={{
                      border: "solid var(--cat-blue) 3px",
                      borderColor: catToColor(record.category),
                      backgroundColor: catToColor(record.category),
                      padding: "10px",
                      width: "700px",
                      color: "#eee",
                      marginLeft: "10px"}}>
                      <p style={{margin: 0}}><a style={{fontSize: "25px"}} href={'/candidates/'+record.id}>{record.name}</a></p>
                      <p style={{margin: 0}}><a style={{fontSize: "15px"}} href={'/district/'+slugify(record.district)}>{record.district}</a></p>
                      <p style={{margin: 0, fontSize: "15px"}}>{record.organisation}</p>
                      <p style={{margin: 0, marginTop: "5px", fontSize: "20px"}}>{record.title}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div style={{top: '100px', right: '16px', width: '48px', height: '48px'}}>
              <a href='/map' style={{display: 'block'}}><FaMapMarked size={48} style={{pointerEvents: 'none'}}></FaMapMarked></a>
            </div>

          </Layout>
        </MapContext.Provider>
      </HotelContext.Provider>
    </>
  )
}
