import { Asset } from "~/core/Asset";
import { Config } from "~/core/Config";

export type IncludeType = "observed" | "page";

export interface ModuleConfigBase {
  version: string;
  assets: Asset[];
  module: string;
  type: IncludeType;
}

export interface ObservedModuleConfig extends ModuleConfigBase {
  type: "observed";
  selector: string;
}

export interface PageInclude {
  include: string;
  exclude?: string;
  exact?: boolean;
}

export interface PageModuleConfig extends ModuleConfigBase {
  type: "page";
  pages: (string | PageInclude)[];
}

export type ModuleConfig = ObservedModuleConfig | PageModuleConfig;

export class ModuleConfigService {
  public getModuleConfig(config: Config): ModuleConfig {
    if (!config.version)
      throw Error(
        `Your tried to register a config with new structure:  ${JSON.stringify(
          config
        )}  it was missing the version field`
      );

    if (!config.assets)
      throw Error(
        `Your tried to register a config with new structure:  ${JSON.stringify(
          config
        )}  it was missing the assets field`
      );

    if (!config.module)
      throw Error(
        `Your tried to register a config with new structure:  ${JSON.stringify(
          config
        )}  it was missing the module field`
      );

    if (!config.type)
      throw Error(
        `Your tried to register a config with new structure: ${JSON.stringify(
          config
        )}  it was missing the type field`
      );

    if (config.type === "page" && !config.pages)
      throw Error(
        `Your tried to register a config with new structure of page include type:  ${JSON.stringify(
          config
        )}  it was missing the pages field`
      );

    return config;
  }
}
