export type AssetPosition = "head" | "body";

export type AssetBase = {
  src: string;
  name?: string;
  position?: AssetPosition;
  priority?: number;
  countries?: string[];
};

export type AssetScript = AssetBase & {
  type: "js";
  async?: boolean;
  buildType?: "modern" | "legacy";
  deferred?: boolean;
};

export type AssetLink = AssetBase & {
  type: "css";
  media?: string;
};

export type Asset = AssetLink | AssetScript;
