import { fetchCsv } from '../../utils/fetchCsv';
import Head from 'next/head';
import { useEffect, useState, useReducer, lazy, Suspense } from "react";
import reducer, { initialState } from "../../reducer";
import { MapContext, HotelContext } from "../../context";
import Layout from '@components/Layout';
import { config } from 'src/config';
import Map from '@components/Map';
import fs from 'fs';
import path from 'path';
import popStyles from "../../css/Popup.module.css";
import styles from "../../css/map.module.css";
import slugify from 'slugify'
import { Source_Code_Pro, Montserrat } from 'next/font/google'
import {catToColor, catToProjColor} from 'src/utils/categoryColor';
import { FaMapMarked, FaListAlt, FaList } from "react-icons/fa";

const scp = Source_Code_Pro({ subsets: ['latin'] })

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQr3xG4WxuzMC3G4sDDpdFlBT9EdOuyjTw2Xd_HHYnKzs-ptHuXH4bpH67Z1fDOiDFE0qaIYZ1OUP9x/pub?gid=0&single=true&output=csv'

export async function getStaticPaths() {
  // const records = await fetchCsv(url);
  const dataPath = path.join(process.cwd(), 'assets', 'kozig.geojson'); // Path to your JSON file
  const jsonData = fs.readFileSync(dataPath, 'utf8'); // Read the file
  const data = JSON.parse(jsonData); // Parse the JSON content

  const paths = data.features.map(item => ({
    params: { slug: slugify(item.properties.NAME) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const records = (await fetchCsv(url)).filter(item => item.img && item.id && item.name && item.title);
  const pageData = records.filter(item => slugify(item.district) === params.slug);

  const dataPath = path.join(process.cwd(), 'assets', 'kozig.geojson'); // Path to your JSON file
  const jsonData = fs.readFileSync(dataPath, 'utf8'); // Read the file
  const data = JSON.parse(jsonData); // Parse the JSON content
  const districtName = data.features.find(item => slugify(item.properties.NAME) === params.slug).properties.NAME
  data.features = data.features.filter((f) => f.properties.NAME == districtName)
  return {
    props: { pageData, records, data, districtName },
  };
}

export default function Page({ pageData, records, props, data, districtName }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapData = { ...state, dispatch };
  const [hotels, setHotels] = useState(records);
  const DEFAULT_CENTER = (pageData.length > 0) ? [pageData[0].lat, pageData[0].long] : []

  return (
    <>
        <Head>
        <title>{districtName}</title>
        <meta name="description" content={districtName} />
        <meta property="og:title" content={districtName} />
        <meta property="og:description" content={districtName} />
        <meta property="og:url" content={config.baseUrl+'district/'+slugify(districtName)} />
        <meta property="og:type" content="website" />
      </Head>

      <HotelContext.Provider value={{ hotels }}>
        <MapContext.Provider value={mapData}>
        <Layout candidate={true} {...props} >

      <div className="maindiv" style={{display: 'flex', position: 'relative', height: '', justifyContent: 'space-between'}}>
        <div style={{position: 'relative', width: '50%', marginLeft: "20px"}}>
            <h1 style={{marginBottom: "4px"}}>{districtName}</h1>
            <p style={{marginTop: "0"}}>{pageData.length} db jelölt</p>
            <div style={{fontSize: '21px', display: "flex", flexDirection: "column", position: "absolute"}} className={scp.className}>
              <div style={{padding: "0px", marginLeft: "auto", marginRight: "auto"}}>
              {pageData.map((record) => (
                <div className='entry' style={{backgroundColor: "#eee", borderBottom: "solid var(--cat-blue) 6px", borderColor: catToColor(record.category), borderRight: "solid #777 1px",borderLeft: "solid #777 1px",borderTop: "solid #777 1px", marginLeft: "auto", marginRight: "auto", marginTop: "20px", marginBottom: "5px", alignSelf: "center", display: "flex"}}>
                  <a style={{fontSize: "25px"}} href={'/candidates/'+record.id}><div style={{
                    // border: "solid var(--cat-blue) 3px",
                    // borderColor: catToProjColor(record.category),
                    // backgroundColor: catToProjColor(record.category),
                    height: "150px", width: "100px",  }}>
                    <img src={record.img} style={{height: "150px", width: "100px"}}></img>
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
        </div>
        <div style={{margin: '21px', display: "flex", marginRight: "0px", flexDirection: "row"}}>
          <div style={{minWidth: "300px", zIndex: "-1", border: "1px solid #111", padding: "0", marginRight: "20px", height: "fit-content" }}>
            {(pageData.length > 0) && <Map className={styles.homeMap} style={{position: 'relative', }} zoomControl={false} width={100} height={100} center={DEFAULT_CENTER} zoom={11} scrollWheelZoom={false} jsonData={data} pageData={pageData} >
              {({ TileLayer, Marker, Popup }) => (
                <>
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
                  />
                </>
              )}
            </Map>}
          </div>
          <div style={{justifyContent: "start", display: "flex", flexDirection: "column", padding: "0", marginRight: "20px"}}>
            <div style={{top: '100px', right: '16px', width: '48px', height: '48px', padding: "0", marginBottom: "10px", backgroundColor: "#eee", border: "2px solid #111"}}>
                <a href='/list' style={{display: 'block', margin: "5px"}}><FaList  size={32} style={{pointerEvents: 'none', fill: "var(--dark-blue)"}}></FaList></a>
            </div>
            <div style={{top: '100px', right: '16px', width: '48px', height: '48px', padding: "0", backgroundColor: "#eee", border: "2px solid #111"}}>
              <a href='/map' style={{marginBottom: "0",display: 'block', margin: "5px"}}><FaMapMarked  size={32} style={{pointerEvents: 'none', fill: "var(--dark-blue)"}}></FaMapMarked></a>
            </div>
          </div>
        </div>
      </div>
      </Layout>
      </MapContext.Provider>
    </HotelContext.Provider>
    <style jsx>{`
        main {
          text-align: center;
        }

        h1 {
          font-size: 2em;
          color: #333;
        }
        .entry:hover {
          -webkit-filter: brightness(90%);
        }

        p {
          font-size: 1.2em;
          color: #555;
        }

        @media only screen and (max-width: 800px) {
          .maindiv {
            flex-direction: column !important;
            margin: 0;
            padding: 0;
          }
          .maindiv > div {
            width: 100% !important;
          }
        }

      `}</style>

    </>
  );
}
