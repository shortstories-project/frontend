import Head from 'next/head'

function Meta() {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="/static/images/icons/favicon.ico" />
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
