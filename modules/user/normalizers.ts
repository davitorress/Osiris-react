import { AppError } from "../shared/types"
import { LoginResponse, User } from "./types"
import { normalizeError } from "../shared/normalizers"

export const normalizeLogin = (response: LoginResponse): LoginResponse => {
  const error = normalizeError(response)

  if (error.hasError) {
    switch (error.status) {
      case 400:
        throw {
          error: { key: "LOGIN_NOT_FOUND", msg: error.message },
        } as AppError

      default:
        throw {
          error: { key: "UNIDENTIFIED", msg: error.message },
        } as AppError
    }
  }

  return response
}

export const normalizeRegister = (response: User): User => {
  const error = normalizeError(response)

  if (error.hasError) {
    switch (error.status) {
      default:
        throw {
          error: { key: "UNIDENTIFIED", msg: error.message },
        } as AppError
    }
  }

  return response
}
