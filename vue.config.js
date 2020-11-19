const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const compress = new CompressionWebpackPlugin({
  filename: info => {
    return `${info.path}.gz${info.query}`
  },
  algorithm: 'gzip',
  threshold: 10240,
  test: new RegExp('\\.(' + ['js'].join('|') + ')$'),
  minRatio: 0.8,
  deleteOriginalAssets: false
})

module.exports = {
  publicPath: './',
  productionSourceMap: false,

  // devServer: {
  //   port: 8082,
  //   proxy: {
  //     '/hantang': {
  //       target: 'https://ht.wego168.com/hantang',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '/hantang': 'hantang'
  //       }
  //     }
  //   }
  // },


  // devServer: {
  //   // port: 8181,
  //   proxy: {
  //     '/mrguyu': {
  //       // target: 'http://192.168.1.9:8180/mrguyu',
  //       target: 'https://fy.wego168.com/mrguyu_test',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '/mrguyu': 'mrguyu'
  //       }
  //     }
  //   }
  // },

  devServer: {
    port: 8080,
    // host: "0.0.0.0",
    proxy: {
      '/mrguyu': {
        target: 'https://fy.wego168.com/mrguyu',
        changeOrigin: true,
        pathRewrite: {
          '/mrguyu': 'mrguyu'
        }
      },
      '/hantang': {
        target: 'http://192.168.1.42:8180/hantang',
        changeOrigin: true,
        pathRewrite: {
          '^/hantang': ''
        }
      },
      '/mrguyu_test': {
        target: 'https://fy.wego168.com/mrguyu_test',
        changeOrigin: true,
        pathRewrite: {
          '/mrguyu_test': 'mrguyu_test'
        }
      },
    }
  },

  // configureWebpack: {
  //   plugins: [compress]
  // },

  css: {
    extract: process.env.NODE_ENV === 'production' ? true : false,
    loaderOptions: {
      sass: {
        data: `@import "@/theme/element.scss";`
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // config.plugins.push(
      //   new TerserPlugin({
      //     terserOptions: {
      //       compress: {
      //         drop_console: true
      //       }
      //     }
      //   })
      // )
    }
  },
  chainWebpack: config => {
    config.entry('index').add('babel-polyfill')
    config.externals({
      UE: 'UE',
      qq: 'qq'
    })
    // config.optimization.minimize(true);
    // config.optimization.splitChunks({
    //   chunks: 'all'
    // });
    // 热更新
    config.resolve.symlinks(true)
    config.resolve.alias.set('@', resolve('src'))
  }
}
