// var postcss = require('postcss')

module.exports = {
  use: [
    'postcss-import',
    'postcss-cssnext',
    'cssnano'
  ],
  input: 'src/css/main.css',
  output: './../static/css/main.min.css',
  'postcss-cssnext': {
    features: {
      autoprefixer: false
    }
  },
  cssnano: {
    discardComments: {
      removeAll: true
    },
    minifyFontValues: false,
    autoprefixer: {
      'browsers': '> 5%'
    }
  }
}
