const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {join} = require('path')
const devBuild = process.env.NODE_ENV != "production";

if (devBuild){
    console.log("In Development")
}else{
    console.log("In Production")
}

module.exports = {
    entry: {
    	"login/bundle": "./src/client/js/login/index.js"
    },
    output: {
        path: join(__dirname, "/src/main/resources/"),
        filename:  "js/[name].js",
        publicPath: '/src/main/resources/'
    },
    devServer: {
        port: 3000
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"]
            },
            {
                test: /.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000&name=css/fonts/[hash].[ext]' }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new ExtractTextPlugin({
            filename: 'css/[name]-bundle.css',
            allChunks: true,
            disable: devBuild
        }),
    ]
};