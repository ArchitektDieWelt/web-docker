import { Plugin } from "vite";
import { runtime } from "./runtime";
import namespace from "./namespace";

export function viteWebDockerFile({
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
}): Plugin[] {
  return [runtime({ entry, type, module, selector, basePath }), namespace()];
}
