import { Plugin } from "vite";

export function runtime({
  entry,
  type,
  module,
  selector,
  basePath,
}: {
  entry: string;
  type: "page" | "observed";
  module: string;
  selector?: string;
  basePath: string;
}): Plugin {
  let ref1: string;

  return {
    name: "ViteWebDockerFile",
    buildStart() {
      ref1 = this.emitFile({
        type: "chunk",
        id: entry,
      });
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "index.js",
        source: `
          (function () {
            const config = {
              version: "1.0.0",
              assets: [
                {
                  type: "js",
                  src: "${basePath.concat(this.getFileName(ref1))}"
                }
              ],
              type: "${type}",
              module: "${module}",
              pages: [".*"],
              selector: "${selector}",
            };
            window.dispatchEvent(new CustomEvent('web-docker:register', {detail: config}));
          })();
        `,
      });
    },
  };
}
