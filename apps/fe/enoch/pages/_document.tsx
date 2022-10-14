import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="white" />
          <meta name="theme-color" content="white" />
          <meta name="msapplication-navbutton-color" content="white" />
          <link rel="icon" href="/favicon.ico" />

          {/* 
            Adding css @import rule is making browser wait for the fonts to download, which is resulting in low page speed, 
            so moving this to link ref: http://www.stevesouders.com/blog/2009/04/09/dont-use-import/
          */}
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com/"
            crossOrigin="crossorigin"
          />
          <link rel="preload" href="https://fonts.googleapis.com/" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />

          {/* Auth Form CSS*/}
          <link rel="stylesheet" href="/styles/signup-signin-style.css" />

          {/* OnBoarding Style CSS */}
          <link rel="stylesheet" href="/styles/boarding-style.css" />
          <link rel="stylesheet" href="/styles/onboarding-newstyle.css" />
          <link rel="stylesheet" href="/styles/manage-community.css" />
          <link rel="stylesheet" href="/styles/global.css" />
          <link rel="stylesheet" href="/styles/responsive.css" />
          {/* Info page styles */}
          <link rel="stylesheet" href="/styles/dApp-S-home.css" />
          <link rel="stylesheet" href="/styles/dashboard-header.css" />
          <link rel="stylesheet" href="/styles/dashboard-style.css" />
          <link rel="stylesheet" href="/styles/comunitySettings.css" />
          <link rel="stylesheet" href="/styles/userProfile-manage-media.css" />
          <link rel="stylesheet" href="/styles/select_walle.css" />
          <link rel="stylesheet" href="/styles/shop-cart.css" />
          <link rel="stylesheet" href="../styles/create-profile.css" />
          <link rel="stylesheet" href="/styles/write-article.css" />
          {/* <!-- Add the slick-theme.css if you want default styling --> */}
          <link
            rel="stylesheet"
            type="text/css"
            href="//cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick.css"
          />
          {/* <!-- Add the slick-theme.css if you want default styling --> */}
          <link
            rel="stylesheet"
            type="text/css"
            href="//cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick-theme.css"
          />

          {/* home post */}
          <link rel="stylesheet" href="/styles/home-post.css" />
          <link rel="stylesheet" href="/styles/communitySettings.css" />
          <link rel="stylesheet" href="/styles/social.css" />

          {/* user profile */}
          <link rel="stylesheet" href="/styles/userProfile-manage-media.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
