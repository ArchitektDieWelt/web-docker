import RegisterEvent, { RegisterEventType } from "~/core/RegisterEvent";
import InitializeEvent, { InitializeEventType } from "~/core/InitializeEvent";

export { default as initialize } from "./initialize";

declare global {
  interface WindowEventMap {
    [RegisterEventType]: RegisterEvent;
    [InitializeEventType]: InitializeEvent;
  }
  interface Window {
    openreply: {
      initialize: (config: {
        configFilePath: string;
      }) => void;
    };
  }
}
