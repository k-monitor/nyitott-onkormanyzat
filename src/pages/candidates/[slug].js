import { fetchCsv } from '../../utils/fetchCsv';
import Head from 'next/head';
import { MapContext } from "../../context";
import { useEffect, useState, useReducer, lazy, Suspense } from "react";
import reducer, { initialState } from "../../reducer";
import Layout from '@components/Layout';

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQr3xG4WxuzMC3G4sDDpdFlBT9EdOuyjTw2Xd_HHYnKzs-ptHuXH4bpH67Z1fDOiDFE0qaIYZ1OUP9x/pub?gid=0&single=true&output=csv'

export async function getStaticPaths() {
  const records = await fetchCsv(url);

  const paths = records.map(item => ({
    params: { slug: item.id.toLowerCase().replace(/ /g, '-') },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const records = await fetchCsv(url);

  const pageData = records.find(item => item.id.toLowerCase().replace(/ /g, '-') === params.slug);

  return {
    props: { pageData },
  };
}

export default function Page({ pageData, props }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapData = { ...state, dispatch };

  return (
    <>
      <MapContext.Provider value={mapData}>
      <Layout {...props} >
      <Head>
      <title>{pageData.name}</title>
      <meta name="description" content={'todo'} />
      <meta property="og:title" content={pageData.name} />
      <meta property="og:description" content={'todo'} />
      <meta property="og:image" content={pageData.img} />
      {/* <meta property="og:url" content="" /> */}
      <meta property="og:type" content="website" />
    </Head>

    <div>
      <h1>{pageData.name}</h1>
      <p>{pageData.district}</p>
      <img src={pageData.img} width="400"></img>
      <p>{pageData.program}</p>
    </div>
    </Layout>
    </MapContext.Provider>
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
