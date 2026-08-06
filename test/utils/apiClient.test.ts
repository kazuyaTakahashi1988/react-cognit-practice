import { beforeEach, describe, expect, it, vi } from "vitest";

import { request } from "../../src/utils/apiHelper/client";
import { loadingFlagDown, store } from "../../src/utils/storeHelper";

const mocks = vi.hoisted(() => ({
  fetchAuthSession: vi.fn(),
  isAxiosError: vi.fn(),
  request: vi.fn(),
}));

vi.mock("aws-amplify/auth", () => ({
  fetchAuthSession: mocks.fetchAuthSession,
}));

vi.mock("axios", () => ({
  default: {
    isAxiosError: mocks.isAxiosError,
    request: mocks.request,
  },
}));

const resetLoadingCount = () => {
  while (store.getState().loading.count > 0) {
    store.dispatch(loadingFlagDown());
  }
};

describe("API client", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetLoadingCount();
    mocks.fetchAuthSession.mockResolvedValue({
      tokens: { accessToken: { toString: () => "session-token" } },
    });
  });

  it("adds the session token without changing global loading", async () => {
    mocks.request.mockResolvedValue({
      data: { id: 1 },
      headers: {},
      status: 200,
    });

    const result = await request("GET", "/articles", {
      baseURL: "https://example.com",
    });

    expect(mocks.request).toHaveBeenCalledWith({
      data: undefined,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer session-token",
        "Content-Type": "application/json",
      },
      method: "GET",
      params: undefined,
      url: "https://example.com/articles",
    });
    expect(result).toEqual({
      ok: true,
      response: { data: { id: 1 }, headers: {}, status: 200 },
    });
    expect(store.getState().loading.count).toBe(0);
  });

  it("normalizes an Axios error without changing global loading", async () => {
    const error = {
      message: "Request failed",
      response: { data: { reason: "invalid" }, status: 400 },
    };
    mocks.request.mockRejectedValue(error);
    mocks.isAxiosError.mockReturnValue(true);

    await expect(request("POST", "/articles")).resolves.toEqual({
      error: {
        data: { reason: "invalid" },
        message: "Request failed",
        status: 400,
      },
      ok: false,
    });
    expect(store.getState().loading.count).toBe(0);
  });

  it("rethrows an unexpected error", async () => {
    const error = new Error("Unexpected failure");
    mocks.request.mockRejectedValue(error);
    mocks.isAxiosError.mockReturnValue(false);

    await expect(request("GET", "/articles")).rejects.toBe(error);
    expect(store.getState().loading.count).toBe(0);
  });
});
