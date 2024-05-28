import { initialize } from "~/core/initialize";

initialize({
  configFilePath: import.meta.env.VITE_CONFIG_FILE_PATH,
  logEvents: import.meta.env.VITE_APP_LOG_EVENTS || false,
  scope: "webdocker"
})
  .then(() => {
    console.log("Web Docker initialized");
  })
  .catch((error) => {
    console.error("Web Docker initialization failed", error);
  });
