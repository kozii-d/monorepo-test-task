import webpack from "webpack";

export function buildPlugins(): webpack.WebpackPluginInstance[] {
  return [
    new webpack.ProgressPlugin(),
  ];
}
