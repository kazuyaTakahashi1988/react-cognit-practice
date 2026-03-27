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
