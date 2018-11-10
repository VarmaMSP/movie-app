const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const srcPath = __dirname
const staticPath = path.resolve(__dirname, '..', 'doc', 'static')

module.exports = {
  entry: [
    'regenerator-runtime/runtime',
    path.resolve(srcPath, 'web.js')
  ],
  output: { path: staticPath, filename: 'js/index.js' },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(srcPath, '..', 'node_modules'),
        options: {
          presets: [
            ['@babel/preset-env', { 'targets': 'last 3 version' }],
            '@babel/preset-flow',
            '@babel/preset-react'
          ],
          plugins: [
            ['@babel/plugin-proposal-class-properties', { 'loose': true }],
            ['import', { libraryName: 'antd', style: true }],
            ['module-resolver', { 'root': [path.resolve(srcPath, '..', 'web')] }]
          ]
        }
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/index.css' })
  ]
}
