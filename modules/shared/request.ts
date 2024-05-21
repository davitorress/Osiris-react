import Constants from "expo-constants"

import { AppError, HttpMethods, RequestProps } from "./types"

export const request = async ({
  url,
  body,
  token,
  params,
  stringifyBody = true,
  formDataBody = false,
  headers = new Headers(),
  method = HttpMethods.GET,
}: RequestProps) => {
  const baseUrl =
    Constants.expoConfig && Constants.expoConfig.hostUri
      ? `http://${Constants.expoConfig.hostUri.split(":").shift()}:8080`
      : "http://localhost:8080"
  const requestUrl = new URL(`${baseUrl}${url}`)

  if (params) {
    Object.keys(params).forEach((key) => {
      requestUrl.searchParams.append(key, params[key])
    })
  }

  headers.append("Accept", "application/json")
  headers.append("Content-Type", formDataBody ? "multipart/form-data" : "application/json")

  if (token) {
    headers.append("Authorization", token)
  }

  const options: RequestInit = {
    method,
    headers,
    body: body && stringifyBody && !formDataBody ? JSON.stringify(body) : body,
  }

  return await fetch(requestUrl.toString(), options)
    .then(async (response) => {
      return response
    })
    .then(async (response) => {
      const json = await response.json()

      if (!response.ok) {
        return { ...json, hasError: true }
      }

      return json
    })
    .catch((error) => {
      throw {
        key: "INTERNAL_SERVER_ERROR",
        msg: error.message,
      } as AppError
    })
}
