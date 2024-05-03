import RegisterEvent, { RegisterEventType } from "~/core/RegisterEvent";

declare global {
  interface WindowEventMap {
    [RegisterEventType]: RegisterEvent;
  }
}
