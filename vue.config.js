/* eslint-disable */

const privateAssets = require('./.config.assets.js')

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'
// cdn链接
const cdn = {
  externals: {
  },
  // cdn的css链接
  css: [
    ...privateAssets.css
  ],
  // cdn的js链接
  js: [
    ...privateAssets.js
  ]
}

module.exports = {
  outputDir: 'docs',
  assetsDir: 'static',
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')

    config.plugin('html').tap(args => {
      if (isProduction || process.env.VUE_APP_DEV_NEED_CDN !== 'false') args[0].cdn = cdn
      return args
    })

    if (isProduction) {
      config.output
        .set('filename', 'static/js/[name].[contenthash:8].js')
        .set('chunkFilename', 'static/js/[name].[contenthash:8].js')
      config.optimization.minimize(true)
      config.optimization.splitChunks({
        chunks: 'all'
      })
    }
  },
  configureWebpack: config => {
    if (isProduction || process.env.VUE_APP_DEV_NEED_CDN !== 'false') config.externals = cdn.externals
    config.module.rules.push({
      test: /\.md$/,
      use: [
        {
          loader: 'vue-loader'
        },
        {
          loader: require.resolve('./plugin/markdown')
        }
      ]
    })
  },
  devServer: {
    open: true
  },
  pluginOptions: {
    i18n: {
      locale: 'zh-cn',
      fallbackLocale: 'en',
      localeDir: 'locale',
      enableInSFC: false
    }
  }
}
