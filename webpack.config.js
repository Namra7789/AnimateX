const path = require('path');

module.exports = {
    entry: './src/main/java/com/example/animationcreator/components/HomePage.jsx',
    output: {
        path: path.resolve(__dirname, 'src/main/resources/static'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
