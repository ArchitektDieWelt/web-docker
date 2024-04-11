import { expect, describe, it } from "vitest";
import { ModuleConfigService } from "~/core/ModuleConfig";

describe("ModuleConfig", () => {
  it("constructs", () => {
    const config = new ModuleConfigService();
    expect(config).toBeTruthy();
  });
});
