export function buildCssLoader() {
  return {
    test: /\.s[ac]ss$/i,
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: (resPath: string) => resPath.includes(".module."),
            localIdentName: "[hash:base64:8]",
          },

        },
      },
      "sass-loader",
    ],
  };
}
