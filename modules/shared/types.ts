export type HTTP_METHODS = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export enum HttpMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export interface RequestProps {
  url: string
  method?: HTTP_METHODS
  headers?: Headers
  params?: Record<string, any>
  body?: any
  stringifyBody?: boolean
}
