import { request } from "../client";

export const testGetArticleApi = () => request("GET", "/wp-json/wp/v2/posts");

export const testPostApi = <TRequest>(data: TRequest) =>
  request("POST", "/wp-json/wp/v2/posts", { requestData: data });
