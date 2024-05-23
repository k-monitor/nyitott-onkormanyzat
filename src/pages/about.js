import Layout from '@components/Layout';
import Head from 'next/head';
import { MapContext } from "../context";
import { useEffect, useState, useReducer, lazy, Suspense } from "react";
import reducer, { initialState } from "../reducer";
import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] })

export default function About(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapData = { ...state, dispatch };

  return (
      <MapContext.Provider value={mapData}>
      <Layout {...props} >
    <div>
    <Head>
        <title>Nyitott önkormányzat - K-Monitor</title>
      </Head>

      <main className={montserrat.className}>
        <h1>Mi ez?</h1>
        <p>A Nyitott Önkormányzatok programban a K-Monitor arra kéri fel a hazai nagyvárosok és kerületek polgármesterjelöltjeit, hogy megválasztásuk esetén építsenek nyitott önkormányzatot! Ezen az oldalon azokat a jelölteket és vállalásaikat lehet megtalálni, akik elköteleződtek a nyitott önkormányzatiság mellett. Látogatóként és választóként ellenőrizheted, hogy a saját településedről van-e már olyan polgármesterjelölt, aki tett vállalást, a választások után pedig nyomon követheted majd, hogy a megválasztott polgármester teljesíti-e az ígéretét. Ha nem találsz a saját településedről jelöltet, küldd el neki ezt az oldalt és fogalmazd meg a saját elvárásaidat, igényeidet, hogy milyen vállalást tegyen. </p>
        <p>Egy nyitott önkormányzat átláthatóan, számonkérhető döntéshozókkal és az állampolgárokat partnerként kezelve, őket a döntéshozatalba bevonva működik. A cél, hogy minél több jelölt tegyen olyan nyilvános vállalást, amely </p>
        <ul>
          <li>megfelel a nyitott önkormányzatiság elveinek,</li>
          <li>egy létező helyi problémára kínál megoldást,</li>
          <li>innovatív megoldás megvalósítására vonatkozik és példával szolgálhat más hazai önkormányzatok számára is, </li>
          <li>elég konkrét ahhoz, hogy utólag számonkérhető is legyen. </li>
        </ul>
        <p>2019-ben arra kértük a jelölteket, hogy vállalják az általunk megfogalmazott <a href="https://ezaminimum.hu/" target="_blank">átláthatósági minimumot</a>, most viszont a jelöltektől várjuk, hogy megfogalmazzák a saját közösségük számára releváns és ambiciózus terveiket, amelyek túlmutatnak a minimumon, ha úgy tetszik, a maximumra törnek. A K-Monitor segítségül hazai és nemzetközi jó gyakorlatokat gyűjtött össze egy <a href="https://nyitottonkormanyzat.k-monitor.hu/paper" target="_blank">kiadványban</a>, amelyet a jelöltekkel is megosztott. A jelölteknek hitelességet jelent, hogy Magyarország vezető korrupcióellenes szervezeteként követni fogjuk a vállalások teljesítését, sőt, a leginkább ambiciózus és innovatív tervek megvalósulásában fel is ajánljuk szakmai támogatásunkat a megválasztott polgármestereknek. </p>
        <p>Magyarország legjelentősebb önkormányzatainak - nagyvárosoknak és budapesti kerületeknek - megvan a lehetőségük, hogy az országos szinten egyre zártabb kormányzással szemben jó példával járjanak elől, legyen szó felelős gazdálkodásról, demokratikus gyakorlatokról, jó kormányzásról. Azoknak a jelölteknek, akik ilyen településen lesznek polgármesterek, lehetőségük van tenni egy demokratikusabb országért, azáltal, hogy meghonosítanak olyan gyakorlatokat, amelyek inspirálóak, átvehetőek, és az egész ország közigazgatási kultúráját fejlesztik.</p>
        <p>Célunk, hogy ösztönözzük a polgármesterjelöltek demokratikus gondolkodását, a választókat pedig bátorítsuk arra, hogy várjanak el programvállalásokat a jelöltjeiktől, amiket utólag számon is kérhetnek rajtuk. A programunkkal ahhoz szeretnénk hozzájárulni, hogy a 2024-es önkormányzati választás után minél több önkormányzat éljen is ezzel a lehetőséggel. </p>
        <p>Részletekért olvasd el <a href="https://nyitottonkormanyzat.k-monitor.hu/paper" target="_blank">kiadványunkat</a>!</p>
        <p>Polgármesterjelölt vagy és szeretnél csatlakozni? <a href="https://forms.gle/fH16kcTwb6kAb4SC7" target="_blank">Itt</a> megteheted!</p>

        <h1>A felhasznált adatok</h1>
        <p>A Nyitott Önkormányzatok program elsődleges célközönsége azok a polgármesterjelöltek, akik megválasztásuk esetén olyan önkormányzat vezetés fogják átvenni (vagy folytatni), ahol a napi működésen túl is elvárhatóak újító kezdeményezések. Úgy gondoljuk, hogy ezeknek az önkormányzatoknak adottak leginkább a lehetőségei arra, hogy országos szinten is példaértékű gyakorlatokat valósítsanak meg és kitapossák az utat a demokratikusabb működés felé a kisebb társaik számára is. A programhoz ezért elsősorban a 30 ezer lakos feletti és a megyei jogú városok, a budapesti kerületek, valamint a fővárosi (fő)polgármesterjelöltek csatlakozását várjuk. </p>
        <p>A honlapon megtalálható adatokat (fénykép, vállalás címe, probléma megjelölése, vállalás részletei, megvalósuló eszközök) a polgármesterjelöltek küldték be önkéntesen, az <a href="https://forms.gle/fH16kcTwb6kAb4SC7" target="_blank">alábbi űrlapon</a> keresztül. A beküldött vállalásokat a K-Monitor csapata kategorizálta be, aszerint, hogy a projektterv leginkább az <span style={{color: "var(--)"}}>átláthatóság</span>, a számonkérhetőség vagy a részvételiség elvét erősítené. A neveket és jelölőszervezeteket a valasztas.hu oldalról töltöttük le. </p>
        <p>Adatkezelési tájékoztatónk <a href="https://docs.google.com/document/d/1xVjbil5f8vi7ve6kJFblWahgvso9EBDWC0nT3Ao7QDY/" target="_blank">itt</a> elérhető.</p>
      </main>

      <style jsx>{`
        div {
          position: relative;
          flex-direction: column;
          padding: 0 20px;
        }

        main {
          text-align: left;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          padding: 20px;
          font-size: 17px;
        }

        h1 {
          font-size: 2em;
          color: #333;
        }

        ul {
          text-align: left;
          font-size: 19px;
        }

        p {
          color: #333;
        }

        a {
          text-decoration: underline;
          color: #111;
        }

        a:hover {
          color: #888;
        }
      `}</style>
    </div>
    </Layout>
    </MapContext.Provider>
  );
}
