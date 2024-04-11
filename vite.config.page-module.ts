import { fileURLToPath, URL } from "url";

import { defineConfig, loadEnv } from "vite";
import * as path from "path";
import { generateJs } from "./src/plugin/plugin";
import namespace from "./src/plugin/namespace";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const entries =
    env.VITE_APP_REMOVE_HASH_FROM_ASSETS === "true"
      ? { entryFileNames: "assets/[name].js" }
      : {};
  return {
    plugins: [
      generateJs({
        basePath: "http://localhost:3010/page-module/",
        id: "src/fragment/page-module.ts",
        module: "fragment-on-page",
        type: "page",
        selector: "fragment-on-page",
      }),
      namespace(),
    ],
    build: {
      outDir: "dist/fragment/page-module",
      sourcemap: env.VITE_APP_SOURCE_MAPS_ENABLED !== "false",
      rollupOptions: {
        input: path.join(__dirname, "./src/fragment/page-module.ts"),
        output: {
          ...entries,
          format: "module",
        },
      },
    },
    resolve: {
      alias: {
        "~": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
