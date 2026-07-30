import type { Method } from "axios";

export type RequestOptions<TRequest> = {
  accessToken?: string;
  apiPath: string;
  baseURL?: string;
  headers?: Record<string, string>;
  isLoading?: boolean;
  method: Method;
  params?: Record<string, unknown>;
  requestData?: TRequest;
};
