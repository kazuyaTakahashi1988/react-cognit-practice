import { store } from "../store";

const execute = async (method: string, path: string, data?: object, params?: string) => {
  store.dispatch({ type: "LOADING_FLUG_UP" });

  const config = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: data && JSON.stringify(data),
    params,
  };

  try {
    return await fetch(`${path}`, config).then((res) => {
      // if (res.status === 500) return
      return res.json();
    });
  } catch (error) {
    //例外が発生した場合の処理
  } finally {
    store.dispatch({ type: "LOADING_FLUG_DOWN" });
  }
};

const postApi = async (path: string, data: object, params?: string) => {
  return execute("POST", path, data, params);
};

const getApi = async (path: string, params?: string) => {
  return execute("GET", path, undefined, params);
};

// テストポストAPI（てきとーなやつ）
export const testPostApi = (data: object) => {
  return postApi("http://wp.empty-service.com/wp-json/wp/v2/posts", data);
};
// テストゲットAPI（てきとーなやつ）
export const testGetApi = () => {
  return getApi("http://wp.empty-service.com/wp-json/wp/v2/posts");
};
