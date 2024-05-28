import { Webdocker, WebDockerOptions } from "~/core/Webdocker";

export async function initialize(option: WebDockerOptions) {
  console.log("default initialization");

  const webdocker = new Webdocker(option);

  await webdocker.run();
}
