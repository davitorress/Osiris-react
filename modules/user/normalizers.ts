import { AppError } from "../shared/types"
import { LoginResponse, NormalizedUser, User } from "./types"
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

export const normalizeUser = (response: User): NormalizedUser => {
  const error = normalizeError(response)

  if (error.hasError) {
    switch (error.status) {
      case 404:
        throw {
          error: { key: "USER_NOT_FOUND", msg: error.message },
        } as AppError

      default:
        throw {
          error: { key: "UNIDENTIFIED", msg: error.message },
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
