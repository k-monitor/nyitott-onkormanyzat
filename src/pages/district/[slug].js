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
  const records = await fetchCsv(url);
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
      <HotelContext.Provider value={{ hotels }}>
        <MapContext.Provider value={mapData}>
        <Layout candidate={true} {...props} >
        <Head>
        <title>{districtName}</title>
        <meta name="description" content={districtName} />
        <meta property="og:title" content={districtName} />
        <meta property="og:description" content={districtName} />
        <meta property="og:url" content={config.baseUrl+'district/'+slugify(districtName)} />
        <meta property="og:type" content="website" />
      </Head>

      <div style={{display: 'flex', position: 'relative', height: '', justifyContent: 'space-between'}}>
        <div style={{position: 'relative', width: '50%'}}>
          <h1 style={{marginBottom: "4px"}}>{districtName}</h1>
          <p style={{marginTop: "0"}}>{pageData.length} db jelölt</p>
        </div>
        <div style={{left: '50%', top: '120px', width: '30%', left: '50%', position: 'fixed'}}>
        {(pageData.length > 0) && <Map className={styles.homeMap} style={{position: 'relative', }} width={100} height={100} center={DEFAULT_CENTER} zoom={13} scrollWheelZoom={false} jsonData={data} >
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
                />
                  {pageData.map((record) => (
                    <Marker key={record.id} position={[record.lat,record.long]}></Marker>
                  ))}
              </>
            )}
          </Map>}
        </div>
      </div>
      </Layout>
      </MapContext.Provider>
    </HotelContext.Provider>
    <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
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

    </>
  );
}
