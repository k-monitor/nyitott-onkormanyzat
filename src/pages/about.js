import Head from 'next/head';

export default function About() {
  return (
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
  );
}
