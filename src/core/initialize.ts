import {
  RemoteConfigurationService,
} from "~/core/RemoteConfigurationService";
import ModuleRegistry from "~/core/ModuleRegistry";
import { Config } from "~/core/Config";
import { ModuleConfigService } from "~/core/ModuleConfig";
import { RegisterEventType } from "~/core/RegisterEvent";
import ScopeRegistry from "~/core/ScopeRegistry";
import { forEachSeries } from "~/core/utils";

export type WebDockerOptions = {
  configFilePath?: string;
  logEvents?: boolean;
  scope?: string;
};

const initialize = async (options: WebDockerOptions) => {
  new ScopeRegistry(options.scope ?? "webdocker");
  const moduleConfigService = new ModuleConfigService();
  const registry = new ModuleRegistry(options.logEvents ?? false);
  const remoteConfigurationService = new RemoteConfigurationService(options);
  // NOTE: event registry has to be done before any async operation. Since Async operations
  // do not block the event loop and the registration event might be dispatched while another event loop is running.
  window.addEventListener(RegisterEventType, (event: CustomEvent<Config>) => {
    const config = moduleConfigService.getModuleConfig(event.detail);
    registry.addReplace(config);
  });

  const remoteConfigurations = await remoteConfigurationService.fetch();

  if (remoteConfigurations) {
    const reorderedPageConfigs = remoteConfigurationService.reorderPageConfigs(remoteConfigurations);

    await forEachSeries(reorderedPageConfigs, async (config: Config) => {
      const moduleConfig = moduleConfigService.getModuleConfig(config);
      await registry.add(moduleConfig);
    });
  }
};

export default initialize;
