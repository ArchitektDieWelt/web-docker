import RegisterEvent, { RegisterEventType } from "~/core/RegisterEvent";

declare global {
  interface Window {
    [key: string]: unknown;
  }
  interface WindowEventMap {
    [RegisterEventType]: RegisterEvent;
  }
}
