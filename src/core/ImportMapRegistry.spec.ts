import { beforeEach, describe, expect, it } from "vitest";
import { ImportMapRegistry } from "~/core/ImportMapRegistry";

describe("ImportMapRegistry", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    document.head.innerHTML = "";
  });
  it("constructs", () => {
    const service = new ImportMapRegistry();

    expect(service).toBeTruthy();
  });

  it("injects import map to page", async () => {
    window.location.href = "http://localhost/match";

    const service = new ImportMapRegistry();

    expect(document.head).toMatchSnapshot();
  });

  it("injects new entry to import map", async () => {
    window.location.href = "http://localhost/match";

    const service = new ImportMapRegistry();

    service.add({
      "test-module": "/test-module.js",
    });

    expect(document.head).toMatchSnapshot();
  });

  it("injects multiple entries to import map", async () => {
    window.location.href = "http://localhost/match";

    const service = new ImportMapRegistry();

    service.add({
      "test-module": "/test-module.js",
      "test-module2": "/test-module2.js",
    });

    expect(document.head).toMatchSnapshot();
  });
});
