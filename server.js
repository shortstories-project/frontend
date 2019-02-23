const express = require('express')
const { join } = require('path')
const { parse } = require('url')
const next = require('next')
const nextI18NextMiddleware = require('next-i18next/middleware')
const nextI18Next = require('./lib/i18n')

const port = parseInt(process.env.PORT, 10) || 5555
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

;(async () => {
  await app.prepare()
  const server = express()

  server.use(nextI18NextMiddleware(nextI18Next))

  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl
    if (pathname === '/service-worker.js') {
      const filePath = join(__dirname, '.next', pathname)
      app.serveStatic(req, res, filePath)
    } else {
      handle(req, res, parsedUrl)
    }
  })

  await server.listen(port)
  console.log(`> Ready on http://localhost:${port}`)
})()
