module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/pinyin-match' : '/',
    productionSourceMap: false,
    chainWebpack: config => {
        config
          .plugin('html')
          .tap(args => {
            args[0].minify = false
            return args
          })
      }
}