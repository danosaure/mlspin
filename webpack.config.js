const path = require('path');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    cache: false,
    entry: {
        app: './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[name].min.js'
    },
    resolve: {
        extensions: [
            '.ts',
            '.tsx'
        ]
    },
    module: {
        rules: [{
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                        '@babel/preset-flow'
                    ]
                }
            }
        }]
    },
    optimization: {
        minimize: process.env.NODE_ENV !== 'development'
    }
};
