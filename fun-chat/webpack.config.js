import { fileURLToPath } from "url";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: {
    main: path.resolve(__dirname, "./src/index.ts"),
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      img: path.join(__dirname, "src", "assets", "img"),
      svg: path.join(__dirname, "src", "assets", "svg"),
    },
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/feafania-JSFEEN2024Q4/fun-chat/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ts$/i,
        use: "ts-loader",
      },
      {
        test: /\.svg$/i,
        type: "asset/resource",
        generator: {
          // filename: 'assets/svg/[name][hash][ext]',
          filename: "assets/svg/[name][ext]",
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
        generator: {
          // filename: 'assets/img/[name][hash][ext]',
          filename: "assets/img/[name][ext]",
        },
      },
      {
        test: /\.svg$/i,
        type: "asset/source",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
      filename: "index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          to: path.resolve(__dirname, "dist/public"),
          globOptions: {
            ignore: ["**/*.html"],
          },
        },
        // { from: path.resolve(__dirname, "src/assets"), to: path.resolve(__dirname, "dist/assets") },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public/404.html"),
          to: path.resolve(__dirname, "dist/404.html"),
        },
      ],
    }),
    new ESLintPlugin({
      eslintPath: require.resolve("eslint"), // Цяпер require працуе
      extensions: ["js", "ts", "tsx"],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3020,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
};
