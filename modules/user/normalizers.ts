import { AppError } from "../shared/types"
import { normalizeError } from "../shared/normalizers"
import { TranslateFunction } from "@/storage/translation"
import { LoginResponse, NormalizedUser, User } from "./types"

export const normalizeLogin = (
  response: LoginResponse,
  translate: TranslateFunction
): LoginResponse => {
  const error = normalizeError(response)

  if (error.hasError) {
    switch (error.status) {
      case 400:
        throw {
          key: "LOGIN_NOT_FOUND",
          msg: translate("requests.loginNotFound"),
        } as AppError
      case 403:
        throw {
          key: "LOGIN_NOT_FOUND",
          msg: translate("requests.loginNotFound"),
        } as AppError

      default:
        throw {
          key: "UNIDENTIFIED",
          msg: translate("requests.unidentified"),
        } as AppError
    }
  }

  return response
}

export const normalizeRegister = (response: User, translate: TranslateFunction): User => {
  const error = normalizeError(response)

  if (error.hasError) {
    switch (error.status) {
      case 409:
        throw {
          key: "ALREADY_REGISTERED",
          msg: translate("requests.alreadyRegistered"),
        } as AppError

      default:
        throw {
          key: "UNIDENTIFIED",
          msg: translate("requests.unidentified"),
        } as AppError
    }
  }

  return response
}

export const normalizeUser = (response: User, translate: TranslateFunction): NormalizedUser => {
  const error = normalizeError(response)

  if (error.hasError) {
    switch (error.status) {
      case 404:
        throw {
          key: "USER_NOT_FOUND",
          msg: translate("requests.userNotFound"),
        } as AppError

      default:
        throw {
          key: "UNIDENTIFIED",
          msg: translate("requests.unidentified"),
        } as AppError
    }
  }

  return {
    id: response.id,
    name: response.nome,
    email: response.email,
    image: response.imagem,
    signature: response.assinatura,
    favoritePancsId: response.pancsFavoritasId,
    savedRecipesId: response.receitasSalvasId,
  }
}

export const normalizeUpdateUserImage = (response: string, translate: TranslateFunction) => {
  const error = normalizeError(response)

  if (error.hasError) {
    switch (error.status) {
      case 401:
        throw {
          key: "UNAUTHORIZED",
          msg: error.message,
        } as AppError

      default:
        throw {
          key: "UNIDENTIFIED",
          msg: translate("requests.unidentified"),
        } as AppError
    }
  }
}
