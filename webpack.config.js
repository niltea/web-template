const path = require('path');
const webpack = require('webpack');
const DEBUG = !process.argv.includes('--release');
// postcss plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const cssimport = require('postcss-import');
// const cssnested = require('postcss-nested');
// const customProperties = require('postcss-custom-properties');
// const autoprefixer = require('autoprefixer');
// const csswring = require('csswring');

const plugins = [
new webpack.optimize.OccurrenceOrderPlugin(),
];

if(DEBUG){
	console.log('###########################\n## Debug mode is enabled ##\n###########################');
} else {
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({ compress: { screw_ie8: true, warnings: false } }),
		new webpack.optimize.AggressiveMergingPlugin()
		);
}

module.exports = [
{
	entry: {
		app: './src/js/app.js',
	},
	output: {
		path: path.join(__dirname, './public/js/'),
		filename: '[name].js'
	},
	module: {
		rules: [
		{
			test: /\.js$|\.tag$/,
			exclude: /node_modules/,
			use: 'babel-loader'
		}
		]
	},
	resolve: {
		extensions: ['*', '.js']
	},
	plugins: plugins
},{
	entry: {
		style: './src/sass/style.scss'
	},
	output: {
		path: path.join(__dirname, './public/css/'),
		filename: '[name].css'
	},
	module: {
		rules: [
		{
			test: /\.scss$/,
			exclude: /node_modules/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: [
				{
					loader: 'css-loader?-url!postcss-loader!sass-loader',
					options: {
						url: false,
						minimize: !DEBUG
					}
				},
				"sass-loader"
				]
			})
		}
		]
	},
	plugins: [
	new ExtractTextPlugin({
		filename: '[name].css'
	})
	]
}
];