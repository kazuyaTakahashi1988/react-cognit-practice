const execute = async (method: string, path: string, data?: object, params?: string) => {
  const config = {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: data && JSON.stringify(data),
    params
  }
  return await fetch(`${path}`, config).then(res => {
    // if (res.status === 500) /* 500ページに飛ばす処理などの記述箇所 */ return
    return res.json()
  })
}

const postApi = async (path: string, data: object, params?: string) => {
  return execute('POST', path, data, params)
}

const getApi = async (path: string, params?: string) => {
  return execute('GET', path, undefined, params)
}

// テストポストAPI
export const testPostApi = (data: object) => {
  return postApi('http://wp.empty-service.com/wp-json/wp/v2/posts', data)
}
// テストゲットAPI
export const testGetApi = () => {
  return getApi('http://wp.empty-service.com/wp-json/wp/v2/posts')
}
