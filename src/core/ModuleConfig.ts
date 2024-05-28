import { Asset } from "~/core/Asset";
import { Config } from "~/core/Config";

export interface IncludeTypeMap {
  observed: string;
  page: string;
  userDefined: string;
}

export type IncludeType = keyof IncludeTypeMap;

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
  exposes?: {
    [key: string]: string;
  };
  use?: {
    [key: string]: string;
  };
}

export interface UserDefinedModuleConfig extends ModuleConfigBase {
  type: "userDefined";
  [key: string]: unknown;
}

export type ModuleConfig = ObservedModuleConfig | PageModuleConfig | UserDefinedModuleConfig;

export class ModuleConfigService {
  public getModuleConfig(config: Config): ModuleConfig {
    if (!config.version)
      throw Error(
        `webdocker config:  ${JSON.stringify(config)} missing the version field`
      );

    if (!config.assets)
      throw Error(
        `webdocker config:  ${JSON.stringify(
          config
        )}  it was missing the assets field`
      );

    if (!config.module)
      throw Error(
        `webdocker config:  ${JSON.stringify(
          config
        )}  it was missing the module field`
      );

    if (!config.type)
      throw Error(
        `webdocker config: ${JSON.stringify(config)}  missing the type field`
      );

    if (config.type === "page" && !config.pages)
      throw Error(
        `webdocker config:  ${JSON.stringify(config)}  missing the pages field`
      );

    return config;
  }
}
