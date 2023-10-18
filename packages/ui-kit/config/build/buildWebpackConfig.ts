import webpack from "webpack";

import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/config";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
  const { paths, mode, isDev } = options;
  return {
    mode,
    entry: paths.entry,
    output: {
      filename: "index.js",
      path: paths.build,
      libraryTarget: "umd",
      clean: true,
    },
    plugins: buildPlugins(),
    module: {
      rules: buildLoaders(),
    },
    resolve: buildResolvers(options),
    devtool: isDev ? "inline-source-map" : undefined,
    externals: {
      react: "react",
    },
  };
}
