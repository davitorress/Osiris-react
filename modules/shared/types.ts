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
  formDataBody?: boolean
  token?: string
  xml?: boolean
}

export interface RequestError {
  status: number
  message?: string
  hasError?: boolean
  [string: string]: any
}

export interface NormalizedError {
  status: number
  message?: string
  hasError?: boolean
}

type ERROR_KEYS =
  | "UNIDENTIFIED"
  | "UNAUTHORIZED"
  | "INTERNAL_SERVER_ERROR"
  | "LOGIN_NOT_FOUND"
  | "ALREADY_REGISTERED"
  | "USER_NOT_FOUND"
  | "PANC_NOT_FOUND"
  | "RECIPE_NOT_FOUND"

export interface AppError {
  key: ERROR_KEYS
  msg: string
}
