import { RequestOptions, IncomingHttpHeaders } from "http"

export interface FetchRequest<T> extends RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE"
  body?: T
}

export type FetchResponse<T> = {
  data: T
  statusCode?: number
  statusMessage?: string
  headers: IncomingHttpHeaders
}
