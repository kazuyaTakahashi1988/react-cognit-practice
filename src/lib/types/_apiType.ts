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

export type TypeApiError = { message: string; status?: number; data?: unknown };

export type TypeApiSuccess<TData> = { ok: true; data: TData };

export type TypeApiFailure<TError = TypeApiError> = { ok: false; error: TError };

export type TypeApiResult<TData, TError = TypeApiError> =
  | TypeApiSuccess<TData>
  | TypeApiFailure<TError>;
