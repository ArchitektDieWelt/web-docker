import { RemoteConfig } from "~/core/RemoteConfigurationService";

export const InitializeEventType = "web-docker:initialize" as const;

class InitializeEvent extends CustomEvent<RemoteConfig> {
  constructor(detail: RemoteConfig) {
    super(InitializeEventType, { detail });
  }
}

export default InitializeEvent;
