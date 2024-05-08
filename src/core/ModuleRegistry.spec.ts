import { describe, it, expect, afterEach, beforeEach } from "vitest";
import ModuleRegistry from "~/core/ModuleRegistry";
import { Asset } from "~/core/Asset";
import AssetFactory from "~/core/AssetFactory";
import { ModuleConfig } from "~/core/ModuleConfig";

const asset: Asset = {
  async: false,
  name: "chunk1.js",
  position: undefined,
  priority: 1,
  src: "http://src/1",
  deferred: false,
  type: "js",
};

const config: ModuleConfig = {
  pages: [],
  module: "test-module",
  type: "page",
  version: "1.0.0",
  assets: [asset],
};

afterEach(() => {
  document.body.innerHTML = "";
  document.head.innerHTML = "";
});

describe("ModuleRegistry", () => {
  it("constructs", () => {
    const moduleRegistry = new ModuleRegistry(false);

    expect(moduleRegistry).toBeTruthy();
  });
  it("adds new component service", async () => {
    const assetFactoryMock: AssetFactory = {
      create(): (HTMLLinkElement | HTMLScriptElement)[] {
        return [document.createElement("link")];
      },
    };
    const moduleRegistry = new ModuleRegistry(false, assetFactoryMock);

    const service = moduleRegistry.add(config);

    expect(service.module).toBe("test-module");
  });

  it("does not allow services with similar custom component names", () => {
    const assetFactoryMock: AssetFactory = {
      create(): (HTMLLinkElement | HTMLScriptElement)[] {
        return [document.createElement("link")];
      },
    };
    const moduleRegistry = new ModuleRegistry(false, assetFactoryMock);

    moduleRegistry.add(config);

    expect(() => moduleRegistry.add(config)).toThrow();
  });

  it("does not allow services with similar journey names", () => {
    const assetFactoryMock: AssetFactory = {
      create(): (HTMLLinkElement | HTMLScriptElement)[] {
        return [document.createElement("link")];
      },
    };
    const moduleRegistry = new ModuleRegistry(false, assetFactoryMock);

    moduleRegistry.add(config);

    expect(() => moduleRegistry.add(config)).toThrow();
  });

  it("does not allow services with duplicate assets", () => {
    const assetFactoryMock: AssetFactory = {
      create(): (HTMLLinkElement | HTMLScriptElement)[] {
        return [document.createElement("link")];
      },
    };
    const moduleRegistry = new ModuleRegistry(false, assetFactoryMock);

    const assetB: Asset = {
      async: false,
      name: "chunk2.js",
      position: undefined,
      priority: 1,
      src: "http://src/1",
      deferred: false,
      type: "js",
    };

    const configA: ModuleConfig = {
      pages: [],
      module: "test",
      type: "page",
      version: "1.0.0",
      assets: [asset, assetB],
    };

    moduleRegistry.add(config);

    expect(() => moduleRegistry.add(configA)).toThrow();
  });

  it("overrides service with similar module names", () => {
    const assetFactoryMock: AssetFactory = {
      create(): (HTMLLinkElement | HTMLScriptElement)[] {
        return [document.createElement("link")];
      },
    };
    const moduleRegistry = new ModuleRegistry(false, assetFactoryMock);

    const initialConfig: ModuleConfig = {
      pages: [],
      type: "page",
      version: "1.0.0",
      assets: [asset],
      module: "test-module",
    };

    moduleRegistry.add(initialConfig);

    const configOverride: ModuleConfig = {
      pages: [],
      version: "1.0.0",
      type: "page",
      assets: [asset],
      module: "test-module",
    };

    moduleRegistry.addReplace(configOverride);

    expect(document.body).toMatchSnapshot();
  });


  it("adds a shared page module", () => {
    const assetFactoryMock: AssetFactory = {
      create(): (HTMLLinkElement | HTMLScriptElement)[] {
        return [document.createElement("link")];
      },
    };
    const moduleRegistry = new ModuleRegistry(false, assetFactoryMock);

    const initialConfig: ModuleConfig = {
      pages: [],
      type: "page",
      version: "1.0.0",
      assets: [asset],
      module: "test-module",
      share: {
        name: "test",
        version: "1.0.0",
      }
    };

    moduleRegistry.add(initialConfig);

    expect(document.head).toMatchSnapshot();
  });
});
