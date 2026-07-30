import { fetchAuthSession } from "aws-amplify/auth";
import axios from "axios";

import { loadingFlagDown, loadingFlagUp, store } from "../storeHelper";

import type { ApiResult } from "./errors";
import type { RequestOptions } from "./types";
import type { AxiosRequestConfig, Method } from "axios";

const DEFAULT_BASE_URL = import.meta.env.VITE_APP_PUBLIC_API_BASE_URL ?? "";

const getAccessToken = async (override?: string) => {
  if (override != null) return override;
  const session = await fetchAuthSession();
  return session.tokens?.accessToken.toString();
};

const setHeaders = async (
  accessToken?: string,
  headers?: Record<string, string>,
) => {
  const bearerToken = await getAccessToken(accessToken);
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(bearerToken != null ? { Authorization: `Bearer ${bearerToken}` } : {}),
    ...headers,
  };
};

const execute = async <TResponse, TRequest>(
  options: RequestOptions<TRequest>,
): Promise<ApiResult<TResponse>> => {
  const {
    accessToken,
    apiPath,
    baseURL = DEFAULT_BASE_URL,
    headers,
    isLoading = true,
    method,
    params,
    requestData,
  } = options;
  if (isLoading) store.dispatch(loadingFlagUp());

  try {
    const requestConfig: AxiosRequestConfig = {
      data: requestData,
      headers: await setHeaders(accessToken, headers),
      method,
      params,
      url: `${baseURL}${apiPath}`,
    };
    const response = await axios.request<TResponse>(requestConfig);
    return { ok: true, response };
  } catch (error) {
    if (axios.isAxiosError(error)) {
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
  } finally {
    if (isLoading) store.dispatch(loadingFlagDown());
  }
};

export const request = <TResponse = unknown, TRequest = unknown>(
  method: Method,
  apiPath: string,
  options: Omit<RequestOptions<TRequest>, "apiPath" | "method"> = {},
) => execute<TResponse, TRequest>({ ...options, apiPath, method });
