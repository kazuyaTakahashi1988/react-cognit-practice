/* -------------------------------------------------------
    ▽ 型定義 (API編) ▽
---------------------------------------------------------- */
import type { Method } from "axios";

// execute
export type TypeOptions<TRequest> = {
  apiPath: string;
  method: Method;
  requestData?: TRequest;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  baseURL?: string;
  accessToken?: string;
};

export type TypeApiError = {
  message: string;
  status?: number;
  data?: unknown;
};

export type TypeWpPostRequest = {
  title: string;
  content: string;
  status?: "draft" | "publish" | "private" | "pending";
};

export type TypeWpPostResponse = {
  id: number;
  status: string;
  title?: { rendered?: string };
  content?: { rendered?: string };
};
