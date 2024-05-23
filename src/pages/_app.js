import '@styles/globals.scss'
import "./index.css";
import "../header/Menu.transition.css";
import "../header/Menu.module.css";

function MyApp({ Component, pageProps }) {
  return <>
  <script
  id="tagmanager-main"
  strategy="afterInteractive"
  async
  src={`https://www.googletagmanager.com/gtag/js?id=GTM-MMHD8865`}
></script>
<script
  id="tagmanager-setup"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GTM-MMHD8865');
    `,
  }}
/>
  {/* eslint-disable-next-line react/jsx-props-no-​spreading */}
  <Component {...pageProps} />
</>

  return <Component {...pageProps} />
}

export default MyApp
