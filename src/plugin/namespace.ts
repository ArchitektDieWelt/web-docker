import { Plugin } from "vite";

export default (): Plugin => {
  return {
    name: "vite-plugin-fragment",
    generateBundle(outputOptions, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type === "chunk" && chunk.fileName.endsWith(".js")) {
          chunk.code = `(function() {${chunk.code};})()`;
        }
      }
    },
  };
};
