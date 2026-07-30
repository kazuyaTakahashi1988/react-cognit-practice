export type ApiError = {
  data?: unknown;
  message: string;
  status?: number;
};

export type ApiSuccess<T> = { data: T; headers: unknown; status: number };
export type ApiResult<T> =
  | { error: ApiError; ok: false }
  | { ok: true; response: ApiSuccess<T> };
