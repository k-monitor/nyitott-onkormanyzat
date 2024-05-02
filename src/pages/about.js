import Layout from '@components/Layout';
import Head from 'next/head';
import { MapContext } from "../context";
import { useEffect, useState, useReducer, lazy, Suspense } from "react";
import reducer, { initialState } from "../reducer";

export default function About(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapData = { ...state, dispatch };

  return (
      <MapContext.Provider value={mapData}>
      <Layout {...props} >
    <div>
      <Head>
        <title>Info</title>
        <meta name="description" content="Learn more about us" />
      </Head>

      <main>
        <h1>Mi ez?</h1>
        <p>Ide kéne leírni.</p>
      </main>

      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
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
    </div>
    </Layout>
    </MapContext.Provider>
  );
}
