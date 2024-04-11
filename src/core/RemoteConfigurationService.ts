import { Logger } from "~/core/Logger";
import { Config } from "~/core/Config";

export type RemoteConfig = {
  configFilePath?: string;
};

class RemoteConfigurationService {
  private readonly logger = new Logger("RemoteConfigurationService");
  private readonly configFilePath: string | undefined = undefined;

  constructor(remoteConfig: RemoteConfig) {
    if (!remoteConfig.configFilePath) {
      this.logger.log(
        `No CONFIG_FILE_PATH has been set. Disabling teleporter's remote configs.`
      );
    } else {
      this.configFilePath = remoteConfig.configFilePath;
      this.logger.log(
        `Initializing RemoteConfigurationService with CONFIG_FILE_PATH: ${this.configFilePath}.`
      );
    }
  }

  private async fetchConfigurations(configFilePath: string): Promise<Config[]> {
    try {
      const data = await fetch(configFilePath);
      return await data.json();
    } catch (err) {
      this.logger.log(
        `Could not fetch automatic configuration from: ${configFilePath}. Returning empty array instead.`,
        err
      );
      return [];
    }
  }

  async fetch(): Promise<Config[] | undefined> {
    if (this.configFilePath) {
      return this.fetchConfigurations(this.configFilePath);
    }
  }
}

export { RemoteConfigurationService };
