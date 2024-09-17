const path = require("path");
module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: {
      react: path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom"),
    },
  },
};
