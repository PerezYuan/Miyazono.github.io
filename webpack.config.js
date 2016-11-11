var path = require('path'); //node自带的path模块
var config = {
  entry: path.join(__dirname, 'src', 'entry'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  }
}

module.exports = config