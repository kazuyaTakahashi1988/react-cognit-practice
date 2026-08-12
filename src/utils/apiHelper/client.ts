import { fetchAuthSession } from "aws-amplify/auth";
import axios from "axios";

import type { ApiResult, RequestOptions } from "../../lib/types";
import type { AxiosRequestConfig, Method } from "axios";

const DEFAULT_BASE_URL = import.meta.env.VITE_APP_PUBLIC_API_BASE_URL ?? "";
const DEFAULT_TIMEOUT = 10_000;

/* -----------------------------------------------
 * APIリクエスト処理
 * ----------------------------------------------- */

// リクエストヘッダー生成 処理
const setHeaders = async (
  accessToken?: string,
  headers?: Record<string, string>,
) => {
  // Bearerトークン 生成・取得
  const getBearerToken = async () => {
    if (accessToken != null) return accessToken;
    const session = await fetchAuthSession();
    return session.tokens?.accessToken.toString();
  };
  const bearerToken = await getBearerToken();

  // リクエストヘッダー内容
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}),
    ...headers,
  };
};

/*
 * リクエスト 処理
 */
export const request = async <TResponse = unknown, TRequest = unknown>(
  method: Method,
  apiPath: string,
  options: Omit<RequestOptions<TRequest>, "apiPath" | "method"> = {},
): Promise<ApiResult<TResponse>> => {
  const {
    accessToken,
    baseURL = DEFAULT_BASE_URL,
    headers,
    params,
    requestData,
    signal,
    timeout = DEFAULT_TIMEOUT,
  } = options;

  try {
    // リクエスト内容
    const requestConfig: AxiosRequestConfig = {
      data: requestData,
      headers: await setHeaders(accessToken, headers), // リクエストヘッダー生成
      method,
      params,
      signal,
      timeout,
      url: `${baseURL}${apiPath}`,
    };

    // リクエスト実行
    const response = await axios.request<TResponse>(requestConfig);
    return { ok: true, response };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // エラー内容
      return {
        error: {
          data: error.response?.data,
          message: error.message || "API request failed",
          status: error.response?.status,
        },
        ok: false,
      };
    }
    throw error;
  }
};
