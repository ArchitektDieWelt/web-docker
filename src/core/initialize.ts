import {
  RemoteConfig,
  RemoteConfigurationService,
} from "~/core/RemoteConfigurationService";
import ModuleRegistry from "~/core/ModuleRegistry";
import { Config } from "~/core/Config";
import { ModuleConfigService } from "~/core/ModuleConfig";
import { RegisterEventType } from "~/core/RegisterEvent";
import { InitializeEventType } from "~/core/InitializeEvent";

const initialize = async (remoteConfig: RemoteConfig) => {
  const moduleConfigService = new ModuleConfigService();
  const registry = new ModuleRegistry();
  const remoteConfigurationService = new RemoteConfigurationService(
    remoteConfig
  );
  // NOTE: event registry has to be done before any async operation. Since Async operations
  // do not block the event loop and the registration event might be dispatched while another event loop is running.
  window.addEventListener(
    RegisterEventType,
    (event: CustomEvent<Config>) => {
      const config = moduleConfigService.getModuleConfig(event.detail);
      registry.addReplace(config);
    }
  );

  const remoteConfigurations = await remoteConfigurationService.fetch();
  remoteConfigurations?.forEach((config: Config) => {
    const moduleConfig = moduleConfigService.getModuleConfig(config);
    registry.add(moduleConfig);
  });
};

window.openreply = { initialize };

window.addEventListener(
  InitializeEventType,
  async (event: CustomEvent<RemoteConfig>) => {
    await initialize(event.detail);
  }
);

export default initialize;
