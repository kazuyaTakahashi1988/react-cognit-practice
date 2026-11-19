import { request } from "../client";

/* -----------------------------------------------
 * 各 APIリクエスト
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
 *    accessToken?, // アクセストークン
 *    baseURL?, // DEFAULT_BASE_URL を使わない際のベースURL
 *    headers?, // 追加ヘッダー情報を付与
 *    isLoading?, // ローディングフラグ制御
 *    params?, // クエリパラム
 *    requestData?, // リクエストデータ（リクエストボディ）
 *  };
 *  return request('POST', '/xxxx/xxxx', options);
 * };
 */
