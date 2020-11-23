const path = require('path');

module.exports = {
  entry: {
    "index": "./src/index.tsx", // 最初のは [name] の名前
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  module: {
    rules: [
      { // tsx 用
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      
      { // css 用
        test: /\.css?$/,
        use: ["style-loader", "css-loader"]
      },
      
      { // scss 用
        test: /\.scss?$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          "postcss-loader", "sass-loader"
        ],
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  }
};
