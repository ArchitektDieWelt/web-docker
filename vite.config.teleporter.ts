import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "url";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const noHash = env.VITE_APP_REMOVE_HASH_FROM_ASSETS === "true";

  const entries = noHash
    ? {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "chunks/[name].js",
      }
    : {};

  const base = (env.VITE_APP_BASE_PATH ?? "/").concat("teleporter/");
  return {
    base: base,
    build: {
      lib: {
        entry: resolve(__dirname, "src/core/main.ts"),
        name: "WebDocker",
        fileName: "index",
      },
      sourcemap: env.VITE_APP_SOURCE_MAPS_ENABLED === "true",
      outDir: "dist/teleporter",
      rollupOptions: {
        output: {
          ...entries,
          format: env.VITE_APP_MODULE_FORMAT as
            | "es"
            | "cjs"
            | "amd"
            | "iife"
            | "umd"
            | "system"
            | undefined,
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
