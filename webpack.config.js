const path = require('path');
const webpack = require('webpack');

const config = {
 entry: path.join(__dirname, './src/index.js'),
 output: {
   filename: 'bundle.js',
   path: path.join(__dirname, './src/public')
 },
 plugins: [
   new webpack.ProgressPlugin()
 ],
 devtool: 'source-map',
 target: 'node'
};

module.exports = config;
