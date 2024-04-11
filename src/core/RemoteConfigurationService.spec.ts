import { expect, describe, it, vi, Mock, afterEach } from "vitest";
import { RemoteConfigurationService } from "~/core/RemoteConfigurationService";
import createFetchMock from "vitest-fetch-mock";

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe("RemoteConfigurationService", function () {
  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("should disable fetch when no file has been specified", async function () {
    fetchMock.mockResponse(JSON.stringify([{ journey: "test-journey" }]));

    const components = await new RemoteConfigurationService({
    }).fetch();
    expect(components).toBeUndefined();
  });

  it("should fetch configuration without specifying any CONFIG_FILE_PATH", async function () {
    fetchMock.mockResponse(JSON.stringify([{ journey: "test-journey" }]));
    const remoteConfigurationService = await new RemoteConfigurationService({
      configFilePath: "/config.json",
    });
    const components = await remoteConfigurationService.fetch();
    expect((fetch as Mock).mock.calls.length).toEqual(1);
    expect((fetch as Mock).mock.calls[0][0]).toEqual("/config.json");
    expect(components).toEqual([{ journey: "test-journey" }]);
  });

  it("should fetch configuration from URL set as a parameter to fetchComponents when its present", async function () {
    fetchMock.mockResponse(JSON.stringify([{ journey: "test-journey" }]));

    const remoteConfigurationService = await new RemoteConfigurationService({
      configFilePath: "/config.json",
    });
    const components = await remoteConfigurationService.fetch();
    expect((fetch as Mock).mock.calls.length).toEqual(1);
    expect((fetch as Mock).mock.calls[0][0]).toEqual("/config.json");
    expect(components).toEqual([{ journey: "test-journey" }]);
  });

  it("should return empty array as a fallback", async function () {
    fetchMock.mockReject(new Error("Test error"));

    const remoteConfigurationService = await new RemoteConfigurationService({
      configFilePath: "/config.json",
    });
    const components = await remoteConfigurationService.fetch();
    expect(components).toEqual([]);
  });
});
