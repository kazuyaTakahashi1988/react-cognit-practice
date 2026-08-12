import { fetchAuthSession } from "aws-amplify/auth";
import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { request } from "../../src/utils/apiHelper/client";

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
      signal: undefined,
      timeout: 10_000,
      url: "https://example.com/articles",
    });
    expect(result).toEqual({ ok: true, response });
  });

  it("トークン未指定時は認証セッションを確認する", async () => {
    mockedAxiosRequest.mockResolvedValue({ data: null });

    await request("GET", "/profile", {
      baseURL,
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
  });

  it("AxiosエラーをApiErrorに変換する", async () => {
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
  });

  it("Axios以外のエラーは再送出する", async () => {
    const error = new Error("unexpected error");
    mockedAxiosRequest.mockRejectedValue(error);
    mockedIsAxiosError.mockReturnValue(false);

    await expect(request("GET", "/articles", { baseURL })).rejects.toThrow(
      "unexpected error",
    );
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
  });

  it("認証セッションの取得失敗を再送出する", async () => {
    mockedFetchAuthSession.mockRejectedValue(new Error("session unavailable"));
    mockedIsAxiosError.mockReturnValue(false);

    await expect(request("GET", "/profile", { baseURL })).rejects.toThrow(
      "session unavailable",
    );
    expect(mockedAxiosRequest).not.toHaveBeenCalled();
  });

  it("タイムアウトとキャンセルシグナルをHTTP層へ渡す", async () => {
    const controller = new AbortController();
    mockedAxiosRequest.mockResolvedValue({ data: null });

    await request("GET", "/slow", {
      accessToken: "token",
      baseURL,
      signal: controller.signal,
      timeout: 2_000,
    });

    expect(mockedAxiosRequest).toHaveBeenCalledWith(
      expect.objectContaining({ signal: controller.signal, timeout: 2_000 }),
    );
  });
});
