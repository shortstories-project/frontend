const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  webpack: (config, { defaultLoaders, dev }) => {
    const jsRule = config.module.rules.findIndex(loader =>
      loader.test.test('test.jsx')
    )

    // hack for css-in-js without runtime
    config.module.rules[jsRule].use = [
      defaultLoaders.babel,
      {
        loader: 'linaria/loader',
        options: {
          sourceMap: dev,
        },
      },
    ]

    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        verbose: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^https?.*/,
          },
        ],
      })
    )

    return config
  },
})
