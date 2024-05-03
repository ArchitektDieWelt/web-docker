import { InitializeEventType } from "~/core/InitializeEvent";
import initialize, { WebDockerOptions } from "~/core/initialize";

window.webdocker = { initialize };

window.addEventListener(
  InitializeEventType,
  async (event: CustomEvent<WebDockerOptions>) => {
    await initialize(event.detail);
  }
);

