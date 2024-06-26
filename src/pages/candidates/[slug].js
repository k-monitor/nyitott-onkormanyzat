import { fetchCsv } from '../../utils/fetchCsv';
import Head from 'next/head';
import { useEffect, useState, useReducer, lazy, Suspense } from "react";
import reducer, { initialState } from "../../reducer";
import { MapContext, HotelContext } from "../../context";
import Layout from '@components/Layout';
import { generateImage } from 'src/img_gen';
import { config } from 'src/config';
import Map from '@components/Map';
import fs from 'fs';
import path from 'path';
import popStyles from "../../css/Popup.module.css";
import styles from "../../css/map.module.css";
import slugify from 'slugify'
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { FaMapMarked, FaListAlt, FaList } from "react-icons/fa";
import {catToColor, catToProjColor, catTotText, electToColor, electToName } from 'src/utils/categoryColor';

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQr3xG4WxuzMC3G4sDDpdFlBT9EdOuyjTw2Xd_HHYnKzs-ptHuXH4bpH67Z1fDOiDFE0qaIYZ1OUP9x/pub?gid=0&single=true&output=csv'

export async function getStaticPaths() {
  const records = (await fetchCsv(url)).filter(item => item.img && item.id && item.name && item.title);

  const paths = records.map(item => ({
    params: { slug: item.id.toLowerCase().replace(/ /g, '-') },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const records = (await fetchCsv(url)).filter(item => item.img && item.id && item.name && item.title);

  const pageData = records.find(item => item.id.toLowerCase().replace(/ /g, '-') === params.slug);

  const ogImage = await generateImage({
    outputName: pageData.id,
    options: {
      width: 1200,
      height: 600,
      img: pageData.img.trim(),
      name: pageData.name,
      title: pageData.short_title ?? pageData.title,
      problems: pageData.problems,
      details: pageData.details,
      district: pageData.district,
      category: pageData.category,
      short_problems: pageData.short_problems,
    }
  })

  const dataPath = path.join(process.cwd(), 'assets', 'kozig.geojson'); // Path to your JSON file
  const jsonData = fs.readFileSync(dataPath, 'utf8'); // Read the file
  const data = JSON.parse(jsonData); // Parse the JSON content
  data.features = data.features.filter((f) => f.properties.NAME == pageData.district)
  return {
    props: { pageData, ogImage, records, data },
  };
}

export default function Page({ pageData, ogImage, records, props, data }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapData = { ...state, dispatch };
  const [hotels, setHotels] = useState(records);
  const DEFAULT_CENTER = [pageData.lat, pageData.long]

  return (
    <>
      <HotelContext.Provider value={{ hotels }}>
        <MapContext.Provider value={mapData}>
        <Layout candidate={true} {...props} >
        <Head>
        <title>{pageData.name}</title>
        <meta name="description" content={pageData.title} />
        <meta property="og:title" content={pageData.name} />
        <meta property="og:description" content={pageData.title} />
        <meta property="og:image" content={config.baseUrl+ogImage+"?hmm=aaaa"} />
        <meta property="og:url" content={config.baseUrl+'candidates/'+pageData.id} />
        <meta property="og:type" content="website" />
      </Head>

      <div className='maindiv' style={{display: 'flex', padding: "0", position: 'relative', flexDirection: "row", justifyContent: "space-between"}}>
      <div style={{position: 'relative', width: '50%', padding: "0", marginBottom: "20px"}}>
        <div style={{paddingBottom: "20px"}}>
          <div style={{backgroundColor: "#eee",minHeight: "auto !important", display: "flex", flexDirection: "row", margin: "0", padding: "0", marginTop: "21px", borderBottom: "solid var(--cat-blue) 6px", borderColor: catToColor(pageData.category), borderRight: "1px solid #111", borderTop: "1px solid #111", borderLeft: "1px solid #111", marginBottom: "10px"}}>
            <img src={pageData.img} style={{minHeight: "auto !important", width: "100", height:"150px" }}></img>
            <div style={{minHeight: "auto !important"}}>
              <h1 style={{marginBottom: "4px", marginTop: "10px"}}>{pageData.name}</h1>
              <p style={{color: electToColor(pageData.elected), fontWeight: "bold", width: "fit-content", margin: "0px",}}>{electToName(pageData.elected)}</p>
              <p style={{marginTop: "0", marginBottom: "0", color: "var(--mid-blue)"}}><a href={'/district/'+slugify(pageData.district)}>{pageData.district}</a></p>
              <p style={{marginTop: "0", marginBottom: "5px"}}>{pageData.organisation}</p>
            </div>
            <FacebookShareButton style={{ width: '64px', height: '64px', marginLeft: "auto", marginTop: "10px", marginRight: "10px"}} url={config.baseUrl+'candidates/'+pageData.id}><FacebookIcon></FacebookIcon></FacebookShareButton>
          </div>
          <div style={{border: "1px solid #111"}}>
            <div style={{position: "absolute", right: "20px", border: "3px solid #111", backgroundColor: "#eee", borderColor: catToColor(pageData.category), width: "fit-content", margin: "20px", padding: "4px"}}>{catTotText(pageData.category)}</div>
            <h2 style={{marginBottom: "0"}}>Vállalás címe</h2>
            <p>{pageData.title}</p>
            <h2 style={{marginBottom: "0"}}>Probléma, hiányosság, amire megoldást kínál</h2>
            <p>{pageData.problems}</p>
            <h2 style={{marginBottom: "0"}}>Vállalás részletes leírása</h2>
            <p>{pageData.details}</p>
            <h2>A tevékenység eredményeként létrejövő nyitott kormányzati eszközök, gyakorlatok</h2>
            <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "start", padding: "0", marginBottom: "10px"}}>
            {pageData.practices.split(",").map((practice) => (
                <div style={{border: "2px solid #111", width: "fit-content", backgroundColor: "var(--dark-blue)", color: "white", padding: "5px", margin: "3px"}}>{practice}</div>
            ))}
            </div>
          </div>
          <footer style={{margin: "10px", marginTop: "20px"}}>A jelöltek nyílt felhívásunkra küldött vállalásait szerkesztett formában, annak tartalmi módosítása nélkül közöljük. A vállalás nyilvános közzététele a K-Monitor részéről nem jelenti a vállalt tevékenységek tartalmi jóváhagyását, vagy a jelölt támogatását. A vállalás tartalma a jelölt álláspontját tükrözi.</footer>
        </div>
        </div>

        <div style={{marginTop: '21px', paddingBottom: "20px", display: "flex", flexDirection: "row"}}>
          <div style={{minWidth: "300px", zIndex: "-1", border: "1px solid #111", padding: "0", marginRight: "20px", height: "fit-content" }}>
            <Map className={styles.homeMap} style={{position: 'relative', }} width={100} height={100} center={DEFAULT_CENTER} zoom={11} zoomControl={false} scrollWheelZoom={false} jsonData={data} pageData={records} >
              {({ TileLayer, Marker, Popup }) => (
                <>
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
                  />
                </>
              )}
            </Map>
          </div>
          <div style={{justifyContent: "start", display: "flex", padding: "0",}}>
            <div style={{top: '100px', right: '16px', width: '48px', height: '48px', padding: "0", marginBottom: "10px", backgroundColor: "#eee", border: "2px solid #111"}}>
                <a title="lista nézet" href='/list' style={{display: 'block', margin: "5px"}}><FaList  size={32} style={{pointerEvents: 'none', fill: "var(--dark-blue)"}}></FaList></a>
            </div>
            <div style={{top: '100px', right: '16px', width: '48px', height: '48px', padding: "0", backgroundColor: "#eee", border: "2px solid #111"}}>
              <a title="térkép nézet" href='/map' style={{marginBottom: "0",display: 'block', margin: "5px"}}><FaMapMarked  size={32} style={{pointerEvents: 'none', fill: "var(--dark-blue)"}}></FaMapMarked></a>
            </div>
          </div>
        </div>
        
      </div>
      </Layout>
      </MapContext.Provider>
    </HotelContext.Provider>
    <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
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
