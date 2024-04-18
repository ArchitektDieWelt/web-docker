import { fileURLToPath, URL } from "url";

import { defineConfig, loadEnv } from "vite";
import * as path from "path";
import { viteWebDockerRemoteFile } from "./src/plugin/remote";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const entries =
    env.VITE_APP_REMOVE_HASH_FROM_ASSETS === "true"
      ? { entryFileNames: "assets/[name].js" }
      : {};
  return {
    plugins: [
      viteWebDockerRemoteFile({
        fileName: "fragment-on-page.json",
        basePath: "http://localhost:3010/page-module/",
        entry: "src/fragment/page-module.ts",
        module: "fragment-on-page",
        type: "page",
        pages: [".*"],
      }),
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
