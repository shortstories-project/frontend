import Head from 'next/head'

function Meta() {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <meta charSet="utf-8" />
      <meta name="title" content="Shortstories" />
      <link rel="manifest" href="/static/other/manifest.webmanifest" />
      <meta name="theme-color" content="#766ac3" />
      <meta name="description" content="Write story" />
      <meta name="keywords" content="" />
      <meta property="og:site_name" content="Shortstories" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://shortstories.io/" />
      <meta property="og:title" content="Shortstories" />
      <meta property="og:description" content="Write story" />
      <meta
        property="og:image"
        content="https://shortstories.io/static/images/share.png"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:url"
        content="https://shortstories.io/static/images/share.png"
      />
      <meta name="twitter:title" content="Shortstories" />
      <meta name="twitter:text:title" content="Shortstories" />
      <meta name="twitter:description" content="Write story" />
      <meta
        name="twitter:image:src"
        content="https://shortstories.io/static/images/share.png"
      />
      <link
        rel="image_src"
        href="https://shortstories.io/static/images/share.png"
      />
      <link rel="shortcut icon" href="/static/images/icons/favicon.png" />
      <link rel="apple-touch-icon" href="/static/images/icons/favicon.png" />
      <meta name="apple-mobile-web-app-title" content="Shortstories" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css?family=Alegreya|Montserrat:400,600|Pacifico"
        as="fetch"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="/static/styles/nprogress.css"
      />
      <script
        type="text/javascript"
        src="/static/scripts/google-fonts-fast-render.js"
      />
      <script type="text/javascript" src="/static/scripts/yandex-metrika.js" />
      <title>Shortstories</title>
    </Head>
  )
}

export default Meta
