import axios from "axios";

import type { TypeOptions, TypeApiError, TypeFormExample } from "../../lib/types";
import type { Method, AxiosRequestConfig, AxiosResponse } from "axios";

/* -----------------------------------------------
 * axios および API 処理
 * ----------------------------------------------- */

// デフォルトのベースURL
const DEFAULT_BASE_URL = import.meta.env.VITE_APP_PUBLIC_API_BASE_URL ?? "";

/*
 * APIリクエスト 実行処理
 */
const execute = async <TResponse = unknown, TRequest = unknown>(
  options: TypeOptions<TRequest>,
): Promise<AxiosResponse<TResponse> | TypeApiError> => {
  const {
    apiPath,
    method,
    requestData,
    params,
    headers,
    baseURL = DEFAULT_BASE_URL, // デフォルトのベースURL
    accessToken,
  } = options;

  // ヘッダー情報のセット
  const setHeaders = (
    accessToken?: string,
    headers?: Record<string, string>,
  ): Record<string, string> => {
    const bearerToken =
      accessToken ??
      (typeof sessionStorage !== "undefined"
        ? (sessionStorage.getItem("access_token") ?? undefined)
        : undefined);

    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(bearerToken != null ? { Authorization: `Bearer ${bearerToken}` } : {}),
      ...headers,
    };
  };

  const requestConfig: AxiosRequestConfig = {
    method,
    url: `${baseURL}${apiPath}`,
    data: requestData,
    params,
    headers: setHeaders(accessToken, headers), // ヘッダー情報のセット
  };

  try {
    return await axios.request<TResponse>(requestConfig);
  } catch (err) {
    const failed_message = "API request failed";

    if (axios.isAxiosError(err)) {
      const message = err.response?.data ?? err.message;
      console.error(failed_message, message);

      return {
        message: typeof err.message === "string" ? err.message : failed_message,
        status: err.response?.status,
        data: err.response?.data,
      };
    }

    console.error(failed_message, err);
    throw err;
  }
};

/*
 * APIリクエスト（フォーマット） 処理
 */
const request = async <TResponse = unknown, TRequest = unknown>(
  method: Method,
  apiPath: string,
  options: Omit<TypeOptions<TRequest>, "apiPath" | "method"> = {},
): Promise<AxiosResponse<TResponse> | TypeApiError> =>
  // APIリクエスト 実行処理
  execute<TResponse, TRequest>({ method, apiPath, ...options });

/* -----------------------------------------------
 * 各 APIリクエスト
 * （並べくswaggerの順序と揃える）
 * ----------------------------------------------- */

// テストゲットAPI（てきとーなやつ）
export const testGetArticleApi = () => {
  return request("GET", "/wp-json/wp/v2/posts");
};

// テストポストAPI（てきとーなやつ）
export const testPostApi = (data: TypeFormExample) => {
  const options = { requestData: data };

  return request("POST", "/wp-json/wp/v2/posts", options);
};

/*
 * export const postXXXXApi = (params, baseURL, headers, requestData, accessToken) => {
 *  const options = {
 *    params, // クエリパラム
 *    baseURL, // DEFAULT_BASE_URL を使わない際のベースURLの指定
 *    headers, // 追加ヘッダー情報を付与
 *    requestData, // リクエストデータ（リクエストボディ）
 *    accessToken, // アクセストークン
 *  };
 *  return request('POST', '/xxxx/xxxx', options);
 * };
 */
