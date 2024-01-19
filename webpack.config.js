const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  cache: false,
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].min.js',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    '@mui/material': 'MaterialUI',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: ['node_modules'],
  },
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: process.env.NODE_ENV !== 'development',
  },
};
