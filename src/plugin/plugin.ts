import { Plugin } from "vite";
import { runtime } from "./runtime";
import namespace from "./namespace";

export function viteWebDockerFile({
  id,
  type,
  module,
  selector,
  basePath,
}: {
  id: string;
  type: "page" | "observed";
  module: string;
  selector?: string;
  basePath: string;
}): Plugin[] {
  return [runtime({ id, type, module, selector, basePath }), namespace()];
}
