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
  isLoading?: boolean;
};

export type TypeApiError = { message: string; status?: number; data?: unknown };

/* -----------------------------------------------
 * 各 APIリクエスト用の型定義
 * ----------------------------------------------- */
// テストポストAPI（てきとーなやつ）
export type TypeFormExampleValues = {
  inputName: string;
  checkBoxName: string[];
  radioButtonName: string;
  switchButtonName: string;
  selectName: string;
  selectCustomName: string;
  textAreaName: string;
};
