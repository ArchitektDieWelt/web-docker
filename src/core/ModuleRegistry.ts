import { ModuleService } from "./ModuleService";
import AssetFactory from "~/core/AssetFactory";
import { Logger } from "~/core/Logger";
import { Config } from "~/core/Config";
import { ModuleConfig } from "~/core/ModuleConfig";
import { PageModuleService } from "~/core/PageModuleService";
import { ObservedModuleService } from "~/core/ObservedModuleService";

export interface ModuleRegistryInterface {
  add(config: Config): ModuleService;
}

class ModuleRegistry implements ModuleRegistryInterface {
  private readonly logger;
  private readonly moduleServices: ModuleService[] = [];
  constructor(private readonly logEvents: boolean, private readonly assetFactory = new AssetFactory()) {
    this.logger = new Logger("ModuleRegistry", logEvents);
  }

  add(config: ModuleConfig): ModuleService {
    const registeredAssets: string[] = this.moduleServices.reduce<string[]>(
      (prev, service) => service.assetSources.concat(prev),
      []
    );

    const intersection = registeredAssets.filter((value) =>
      config.assets.map((asset) => asset.src).includes(value)
    );

    if (intersection.length > 0) {
      throw Error(
        `A module including same sources: ${intersection} has already been registered. ${JSON.stringify(
          config
        )}`
      );
    }

    if (config.module) {
      const registeredModule: string[] = this.moduleServices
        .map((service) => service.module)
        .filter((item): item is string => !!item);

      if (registeredModule.includes(config.module)) {
        throw Error(
          `A module with same name: ${
            config.module
          } has already been registered. ${JSON.stringify(config)}`
        );
      }
    }

    return this.addModule(config);
  }

  // overrides existing module service if one is already registered
  addReplace(config: ModuleConfig): ModuleService {
    if (config.module) {
      let foundIndex = -1;
      const service = this.moduleServices.find((service, index) => {
        foundIndex = index;
        return service.module && service.module === config.module;
      });

      if (service && foundIndex > -1) {
        this.moduleServices.splice(foundIndex, 1);
        service.remove();
      }
    }

    return this.addModule(config);
  }

  private addModule(moduleConfig: ModuleConfig) {
    if (moduleConfig.type === "page") {
      const service = new PageModuleService(moduleConfig, this.assetFactory, this.logEvents);
      this.logger.log("registered page module: ", moduleConfig.module);
      this.moduleServices.push(service);
      return service;
    } else {
      const service = new ObservedModuleService(moduleConfig, this.assetFactory, this.logEvents);
      this.logger.log("registered observed module: ", moduleConfig.module);
      this.moduleServices.push(service);
      return service;
    }
  }
}

export default ModuleRegistry;
