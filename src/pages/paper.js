import Head from 'next/head';
import Layout from '@components/Layout';
import { MapContext, HotelContext } from "../context";
import { useReducer } from "react";
import reducer, { initialState } from "../reducer";
import { useState } from "react";
import { FaMapMarked } from "react-icons/fa";


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
            <iframe src="https://drive.google.com/file/d/1bY_8IDRlutW7103vRZYfvnsUeoj8Aosy/preview" style={{ top: "85px", position: "absolute", height: "calc(100% - 85px)", width: "100%" }} width="640" height="480" allow="autoplay"></iframe>
          </Layout>
        </MapContext.Provider>
      </HotelContext.Provider>
    </>
  )
}
