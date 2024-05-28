import { Logger } from "~/core/Logger";
import { Config } from "~/core/Config";
import { WebDockerOptions } from "~/core/Webdocker";

class RemoteConfigurationService {
  private readonly logger;
  private readonly configFilePath: string | undefined = undefined;

  constructor(options: WebDockerOptions) {
    this.logger = new Logger(
      "RemoteConfigurationService",
      options.logEvents ?? false
    );
    if (!options.configFilePath) {
      this.logger.log(
        `No CONFIG_FILE_PATH has been set. Disabling web docker's remote configs.`
      );
    } else {
      this.configFilePath = options.configFilePath;
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

  reorderPageConfigs(configs: Config[]): Config[] {
    return configs.sort((a, b) => {
      if (a.type === "page" && b.type !== "page") {
        return -1;
      }
      if (a.type !== "page" && b.type === "page") {
        return 1;
      }
      if (a.type === "page" && b.type === "page") {
        if (!a.exposes) return 1;
        for (const expose in a.exposes) {
          for (const use in b.use) {
            if (expose === use) {
              return -1;
            }
          }
        }
      }
      return -1;
    });
  }
}

export { RemoteConfigurationService };
