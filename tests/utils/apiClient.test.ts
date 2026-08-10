import { fetchAuthSession } from "aws-amplify/auth";
import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { request } from "../../src/utils/apiHelper/client";
import { store } from "../../src/utils/storeHelper";

vi.mock("aws-amplify/auth", () => ({ fetchAuthSession: vi.fn() }));
vi.mock("axios", () => ({
  default: {
    isAxiosError: vi.fn(),
    request: vi.fn(),
  },
}));

const mockedFetchAuthSession = vi.mocked(fetchAuthSession);
const mockedAxiosRequest = vi.mocked(axios.request);
const mockedIsAxiosError = vi.mocked(axios.isAxiosError);
const baseURL = "https://example.com";
const jsonContentType = "application/json";

const createDeferred = <T>() => {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((promiseResolve) => {
    resolve = promiseResolve;
  });
  return { promise, resolve };
};

describe("api client", () => {
  beforeEach(() => {
    mockedFetchAuthSession.mockResolvedValue({ tokens: undefined });
  });

  it("認証トークンとオプションを指定してリクエストできる", async () => {
    const response = { data: { id: 1 }, status: 200 };
    mockedAxiosRequest.mockResolvedValue(response);

    const result = await request<{ id: number }, { title: string }>(
      "POST",
      "/articles",
      {
        accessToken: "provided-token",
        baseURL,
        headers: { "X-Custom-Header": "custom-value" },
        params: { preview: true },
        requestData: { title: "test article" },
      },
    );

    expect(mockedFetchAuthSession).not.toHaveBeenCalled();
    expect(mockedAxiosRequest).toHaveBeenCalledWith({
      data: { title: "test article" },
      headers: {
        Accept: jsonContentType,
        Authorization: "Bearer provided-token",
        "Content-Type": jsonContentType,
        "X-Custom-Header": "custom-value",
      },
      method: "POST",
      params: { preview: true },
      url: "https://example.com/articles",
    });
    expect(result).toEqual({ ok: true, response });
    expect(store.getState().loading.count).toBe(0);
  });

  it("トークン未指定時は認証セッションを確認する", async () => {
    mockedAxiosRequest.mockResolvedValue({ data: null });

    await request("GET", "/profile", {
      baseURL,
      isLoading: false,
    });

    expect(mockedFetchAuthSession).toHaveBeenCalledOnce();
    expect(mockedAxiosRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: {
          Accept: jsonContentType,
          "Content-Type": jsonContentType,
        },
      }),
    );
    expect(store.getState().loading.count).toBe(0);
  });

  it("AxiosエラーをApiErrorに変換しローディングを解除する", async () => {
    const error = {
      message: "Request failed with status code 422",
      response: { data: { reason: "invalid" }, status: 422 },
    };
    mockedAxiosRequest.mockRejectedValue(error);
    mockedIsAxiosError.mockReturnValue(true);

    const result = await request("GET", "/articles", {
      baseURL,
    });

    expect(result).toEqual({
      error: {
        data: { reason: "invalid" },
        message: "Request failed with status code 422",
        status: 422,
      },
      ok: false,
    });
    expect(store.getState().loading.count).toBe(0);
  });

  it("Axios以外のエラーは再送出しローディングを解除する", async () => {
    const error = new Error("unexpected error");
    mockedAxiosRequest.mockRejectedValue(error);
    mockedIsAxiosError.mockReturnValue(false);

    await expect(request("GET", "/articles", { baseURL })).rejects.toThrow(
      "unexpected error",
    );
    expect(store.getState().loading.count).toBe(0);
  });

  it("401レスポンスをステータスとレスポンスデータを含むApiErrorに変換する", async () => {
    const error = {
      message: "Request failed with status code 401",
      response: { data: { message: "Unauthorized" }, status: 401 },
    };
    mockedAxiosRequest.mockRejectedValue(error);
    mockedIsAxiosError.mockReturnValue(true);

    await expect(request("GET", "/profile", { baseURL })).resolves.toEqual({
      error: {
        data: { message: "Unauthorized" },
        message: "Request failed with status code 401",
        status: 401,
      },
      ok: false,
    });
    expect(store.getState().loading.count).toBe(0);
  });

  it("認証セッションの取得失敗を再送出しローディングを解除する", async () => {
    mockedFetchAuthSession.mockRejectedValue(new Error("session unavailable"));
    mockedIsAxiosError.mockReturnValue(false);

    await expect(request("GET", "/profile", { baseURL })).rejects.toThrow(
      "session unavailable",
    );
    expect(mockedAxiosRequest).not.toHaveBeenCalled();
    expect(store.getState().loading.count).toBe(0);
  });

  it("同時リクエストが完了するたびにloading countを減らす", async () => {
    const firstResponse = createDeferred<{ data: string }>();
    const secondResponse = createDeferred<{ data: string }>();
    mockedAxiosRequest
      .mockImplementationOnce(() => firstResponse.promise)
      .mockImplementationOnce(() => secondResponse.promise);

    const firstRequest = request("GET", "/first", { baseURL });
    const secondRequest = request("GET", "/second", { baseURL });

    expect(store.getState().loading.count).toBe(2);

    firstResponse.resolve({ data: "first" });
    await firstRequest;
    expect(store.getState().loading.count).toBe(1);

    secondResponse.resolve({ data: "second" });
    await secondRequest;
    expect(store.getState().loading.count).toBe(0);
  });
});
