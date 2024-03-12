/* eslint-disable no-undef */

const createReq =
  (method: "GET" | "POST" | "PATCH" | "DELETE") =>
  async (url: string, options: RequestInit): Promise<any> => {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })
    const json = await response.json()

    if (!response.ok) {
      throw new Error(`${json.message}: ${response.status}`)
    }

    return json
  }

export const fetchios = {
  get: createReq("GET"),
  post: createReq("POST"),
  patch: createReq("PATCH"),
  delete: createReq("DELETE"),
}
