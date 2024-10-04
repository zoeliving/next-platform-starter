// pages/_app.js
import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Elementor CSS Files */}
        <link
          rel="stylesheet"
          href="https://patchingtohealth.com/wp-content/plugins/elementor/assets/css/common.min.css"
        />
        <link
          rel="stylesheet"
          href="https://patchingtohealth.com/wp-content/plugins/elementor/assets/css/conditionals/shapes.min.css"
        />
        <link
          rel="stylesheet"
          href="https://patchingtohealth.com/wp-content/plugins/elementor/assets/css/frontend.min.css"
        />

        {/* Elementor JS Files */}
        <script
          src="https://patchingtohealth.com/wp-content/plugins/elementor/assets/js/common.min.js"
          defer
        ></script>
        <script
          src="https://patchingtohealth.com/wp-content/plugins/elementor/assets/js/frontend.min.js"
          defer
        ></script>
        <script
          src="https://patchingtohealth.com/wp-content/plugins/elementor/assets/js/preload.min.js"
          defer
        ></script>
        <script
          src="https://patchingtohealth.com/wp-content/plugins/elementor/assets/js/webpack.runtime.min.js"
          defer
        ></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
