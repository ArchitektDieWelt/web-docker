import { describe, it, expect, beforeEach } from "vitest";
import { Asset } from "~/core/Asset";
import AssetFactory from "~/core/AssetFactory";

import { PageModuleConfig } from "~/core/ModuleConfig";
import { PageModuleService } from "~/core/PageModuleService";

const asset: Asset = {
  async: false,
  name: "chunk1.js",
  position: undefined,
  priority: 1,
  src: "http://src/1",
  deferred: false,
  type: "js",
};

describe("PageModuleService", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  it("constructs", () => {
    window.location.href = "http://localhost/match";
    const config: PageModuleConfig = {
      assets: [asset],
      type: "page",
      module: "test-module",
      pages: [".*"],
      version: "",
    };
    const assetFactoryMock: AssetFactory = {
      create(): (HTMLLinkElement | HTMLScriptElement)[] {
        return [document.createElement("link")];
      },
    };
    const service = new PageModuleService(config, assetFactoryMock);

    expect(service).toBeTruthy();
  });

  it("injects assets if URL of the page matches", async () => {
    window.location.href = "http://localhost/match";
    const config: PageModuleConfig = {
      assets: [asset],
      type: "page",
      module: "test-module",
      pages: [".*"],
      version: "",
    };
    const assetFactoryMock: AssetFactory = {
      create(): (HTMLLinkElement | HTMLScriptElement)[] {
        return [document.createElement("link")];
      },
    };

    const service = new PageModuleService(config, assetFactoryMock);

    await service.load();

    expect(document.body).toMatchSnapshot();
  });

  it("injects assets without custom element if URL of the page matches", async () => {
    window.location.href = "http://localhost/match";
    const config: PageModuleConfig = {
      assets: [asset],
      type: "page",
      module: "test-module",
      pages: [".*"],
      version: "",
    };
    const assetFactoryMock: AssetFactory = {
      create(): (HTMLLinkElement | HTMLScriptElement)[] {
        return [document.createElement("link")];
      },
    };

    const service = new PageModuleService(config, assetFactoryMock);

    await service.load();

    expect(document.body).toMatchSnapshot();
  });

  it("injects assets if empty page arrays was provided", async () => {
    window.location.href = "http://localhost/match";
    const config: PageModuleConfig = {
      assets: [asset],
      type: "page",
      module: "test-module",
      pages: [],
      version: "",
    };
    const assetFactoryMock: AssetFactory = {
      create(): (HTMLLinkElement | HTMLScriptElement)[] {
        return [document.createElement("link")];
      },
    };

    const service = new PageModuleService(config, assetFactoryMock);

    await service.load();

    expect(document.body).toMatchSnapshot();
  });

  it("does not inject assets if URL of the page does not match", async () => {
    window.location.href = "http://localhost/match";
    const config: PageModuleConfig = {
      assets: [asset],
      type: "page",
      module: "test-module",
      pages: ["does-not-match"],
      version: "",
    };
    const assetFactoryMock: AssetFactory = {
      create(): (HTMLLinkElement | HTMLScriptElement)[] {
        return [document.createElement("link")];
      },
    };

    const service = new PageModuleService(config, assetFactoryMock);

    await service.load();

    expect(document.body).toMatchSnapshot();
  });

  it("injects assets if URL of the page matches the given regex pattern - as string", async () => {
    window.location.href = "http://localhost/matches/page";
    const config: PageModuleConfig = {
      assets: [asset],
      type: "page",
      module: "test-module",
      pages: ["/matches/page"],
      version: "",
    };
    const assetFactoryMock: AssetFactory = {
      create(): (HTMLLinkElement | HTMLScriptElement)[] {
        return [document.createElement("link")];
      },
    };

    const service = new PageModuleService(config, assetFactoryMock);

    await service.load();

    expect(document.body).toMatchSnapshot();
  });

  it("injects assets if URL of the page matches subpath of the given regex pattern - as string", async () => {
    window.location.href = "http://localhost/matches/page";
    const config: PageModuleConfig = {
      assets: [asset],
      type: "page",
      module: "test-module",
      pages: ["/matches"],
      version: "",
    };
    const assetFactoryMock: AssetFactory = {
      create(): (HTMLLinkElement | HTMLScriptElement)[] {
        return [document.createElement("link")];
      },
    };

    const service = new PageModuleService(config, assetFactoryMock);

    await service.load();

    expect(document.body).toMatchSnapshot();
  });
});
