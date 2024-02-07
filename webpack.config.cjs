const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const nodeModulesSrc = path.join(__dirname, 'node_modules');
const docsDest = path.join(__dirname, 'docs');
const assetsDest = path.join(docsDest, 'assets');
const assets3rdDest = path.join(assetsDest, '3rd-party');

// 3rd party to copy
const assets3rdToCopy = [
  ['@mui/material/umd', 'material-ui.production.min.js'],
  ['react/umd', 'react.production.min.js'],
  ['react-dom/umd', 'react-dom.production.min.js'],
  ['recoil/umd', 'index.min.js', 'recoil.min.js'],
].map(([context, from, toName]) => ({
  from,
  to: path.join(assets3rdDest, toName || from),
  context: path.join(nodeModulesSrc, context),
}));

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  cache: false,
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx'),
    style: path.join(__dirname, 'src', 'components', 'style.scss'),
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    clean: true,
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    '@mui/material': 'MaterialUI',
    recoil: 'Recoil',
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
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    minimize: process.env.NODE_ENV !== 'development',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    }
  },
  plugins: [
    new copyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          to: docsDest,
          context: path.join(__dirname, 'src', 'docs'),
        },
        ...assets3rdToCopy,
      ],
    }),
    new MiniCssExtractPlugin(),
  ],
};
