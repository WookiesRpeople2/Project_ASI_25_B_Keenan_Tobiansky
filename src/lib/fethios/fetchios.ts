import http, { IncomingMessage } from "http"
import https from "https"
import { FetchRequest, FetchResponse } from "./types"
import * as URL from "url"

export class Fetchios {
  private baseUrl?: string

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl
  }

  private static makeRequest = async <T>(
    url: string,
    options: FetchRequest<T>,
  ): Promise<FetchResponse<T>> => {
    const typeOfUrl = url.startsWith("http:") ? http : https

    return await new Promise((resolve, reject) => {
      const request = typeOfUrl.request(
        options,
        (response: IncomingMessage) => {
          let data = ""

          response.on("data", (chunk) => {
            data += chunk
          })

          response.on("end", () => {
            if (
              response.statusCode &&
              response.statusCode >= 200 &&
              response.statusCode < 300
            ) {
              const res: FetchResponse<T> = {
                data: JSON.parse(data),
                statusCode: response.statusCode,
                statusMessage: response.statusMessage,
                headers: response.headers,
              }

              resolve(res)
            } else {
              reject(new Error("Bad request"))
            }
          })

          response.on("error", (error) => {
            reject(error)
          })
        },
      )

      if (options.body) {
        request.write(options.body)
      }

      request.end()
    })
  }

  private sendReq = async <T>(
    endPoint: string,
    method: FetchRequest<T>["method"],
    opt?: FetchRequest<T>,
  ) => {
    let url = this.baseUrl || ""

    if (this.baseUrl && !url.endsWith("/")) {
      url += "/"
    }

    url += endPoint
    const uri = URL.parse(url)
    const reqOptions: FetchRequest<T> = {
      hostname: uri.hostname,
      path: uri.path,
      port: uri.port,
      method,
      ...opt,
    }
    const res = await Fetchios.makeRequest<T>(url, reqOptions)

    return res
  }

  public async get<T>(endPoint: string, options?: FetchRequest<T>) {
    return await this.sendReq<T>(endPoint, "GET", options)
  }

  public async post<T>(endPoint: string, options?: FetchRequest<T>) {
    return await this.sendReq<T>(endPoint, "POST", options)
  }

  public async patch<T>(endPoint: string, options?: FetchRequest<T>) {
    return await this.sendReq<T>(endPoint, "PATCH", options)
  }

  public async delete<T>(endPoint: string, options?: FetchRequest<T>) {
    return await this.sendReq<T>(endPoint, "DELETE", options)
  }
}
