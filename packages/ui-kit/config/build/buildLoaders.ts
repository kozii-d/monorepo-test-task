import webpack from "webpack";

import { buildCssLoader } from "./loaders/buildCssLoader";

export function buildLoaders(): webpack.RuleSetRule[] {
  const cssLoader = buildCssLoader();

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    loader: "file-loader",
    options: {
      name: "[path][name].[ext]",
    },
  };

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  return [
    fileLoader,
    typescriptLoader,
    cssLoader,
  ];
}
