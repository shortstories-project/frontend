import React, { useEffect } from 'react'
import { css } from 'linaria'
import { node } from 'prop-types'
import Meta from './Meta'

const theme = css`
  --black: #272727;
  --white: #fcfcfc;
  --yellow: #ffc600;
  --soft-violet: #6d47d9;
  --pink: #f4c4f3;
  --red: #f00;
  --grey: #dcdcdc;
  --light-grey: #eee;
  --dark-grey: #aaa;
  --night-grey: #b8b8b8;
  --ui-font: Montserrat, system-ui;
  --text-font: Alegreya, serif;
  --logo-font: Pacifico, cursive;
  --box-shadow: 0 1px 16px rgba(0, 0, 0, 0.25);
`

function Page({ children }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => {
          console.log('service worker registration successful') // eslint-disable-line
        })
        .catch(err => {
          console.warn('service worker registration failed', err.message) // eslint-disable-line
        })
    }
  })

  return (
    <div className={theme}>
      <Meta />
      {children}
    </div>
  )
}

Page.propTypes = {
  children: node.isRequired,
}

export default Page
