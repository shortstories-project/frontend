import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <html lang="ru" prefix="og: http://ogp.me/ns#">
        <Head />
        <body>
          <noscript>
            <div>
              <img
                src="https://mc.yandex.ru/watch/52506634"
                style={{
                  position: 'absolute',
                  left: -9999,
                }}
                alt=""
              />
            </div>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MyDocument
