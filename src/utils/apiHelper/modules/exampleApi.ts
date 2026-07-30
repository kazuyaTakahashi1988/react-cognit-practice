import { request } from "../client";

/* -----------------------------------------------
 * 各 APIリクエスト例
 * （並べくswaggerの順序と揃える）
 * ----------------------------------------------- */

export const testGetArticleApi = () => {
  return request("GET", "/wp-json/wp/v2/posts");
};

export const testPostApi = <TRequest>(data: TRequest) => {
  const options = { requestData: data };
  return request("POST", "/wp-json/wp/v2/posts", options);
};

/*
 * export const postXXXXApi = (params, baseURL, headers, requestData, accessToken, isLoading) => {
 *  const options = {
 *    params, // クエリパラム
 *    baseURL, // DEFAULT_BASE_URL を使わない際のベースURL
 *    headers, // 追加ヘッダー情報を付与
 *    requestData, // リクエストデータ（リクエストボディ）
 *    accessToken, // アクセストークン
 *    isLoading, // ローディングフラグ制御
 *  };
 *  return request('POST', '/xxxx/xxxx', options);
 * };
 */
