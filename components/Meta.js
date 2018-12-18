import Head from 'next/head'

function Meta() {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="/static/favicon.png" />
      <link
        href="https://fonts.googleapis.com/css?family=Alegreya|Montserrat:400,600|Pacifico"
        rel="stylesheet"
      />
      <link rel="stylesheet" type="text/css" href="/static/react-crop.css" />
      <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
      <title>Shortstories</title>
    </Head>
  )
}

export default Meta
