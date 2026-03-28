import axios from "axios";

import type { TypeApiError, TypeApiResult, TypeFormExample, TypeOptions } from "../../lib/types";
import type { AxiosRequestConfig, Method } from "axios";

/* -----------------------------------------------
 * axios および API 処理
 * ----------------------------------------------- */

const DEFAULT_BASE_URL = import.meta.env.VITE_APP_PUBLIC_API_BASE_URL ?? "";
const API_REQUEST_FAILED_MESSAGE = "API request failed:";

const setHeaders = (
  accessToken?: string,
  headers?: Record<string, string>,
): Record<string, string> => {
  const bearerToken =
    accessToken ??
    (typeof sessionStorage !== "undefined" ? (sessionStorage.getItem("access_token") ?? undefined) : undefined);

  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(bearerToken != null ? { Authorization: `Bearer ${bearerToken}` } : {}),
    ...headers,
  };
};

const execute = async <TResponse = unknown, TRequest = unknown>(
  options: TypeOptions<TRequest>,
): Promise<TypeApiResult<TResponse, TypeApiError>> => {
  const { apiPath, method, requestData, params, headers, baseURL = DEFAULT_BASE_URL, accessToken } = options;

  const requestConfig: AxiosRequestConfig = {
    method,
    url: `${baseURL}${apiPath}`,
    data: requestData,
    params,
    headers: setHeaders(accessToken, headers),
  };

  try {
    const response = await axios.request<TResponse>(requestConfig);
    return {
      ok: true,
      data: response.data,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const message = err.response?.data ?? err.message;
      console.error(API_REQUEST_FAILED_MESSAGE, message);

      return {
        ok: false,
        error: {
          message: typeof err.message === "string" ? err.message : API_REQUEST_FAILED_MESSAGE,
          status: err.response?.status,
          data: err.response?.data,
        },
      };
    }

    console.error(API_REQUEST_FAILED_MESSAGE, err);
    throw err;
  }
};

const request = async <TResponse = unknown, TRequest = unknown>(
  method: Method,
  apiPath: string,
  options: Omit<TypeOptions<TRequest>, "apiPath" | "method"> = {},
): Promise<TypeApiResult<TResponse, TypeApiError>> => execute<TResponse, TRequest>({ method, apiPath, ...options });

type TypePost = {
  id: number;
  title?: { rendered?: string };
  content?: { rendered?: string };
};

export const testGetArticleApi = (): Promise<TypeApiResult<TypePost[]>> => {
  return request<TypePost[]>("GET", "/wp-json/wp/v2/posts");
};

export const testPostApi = (data: TypeFormExample): Promise<TypeApiResult<TypePost>> => {
  return request<TypePost, TypeFormExample>("POST", "/wp-json/wp/v2/posts", { requestData: data });
};
