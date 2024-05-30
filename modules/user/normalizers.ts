import { AppError } from "../shared/types"
import { normalizeError } from "../shared/normalizers"
import { LoginResponse, NormalizedUser, User } from "./types"

export const normalizeLogin = (response: LoginResponse): LoginResponse => {
  const error = normalizeError(response)

  if (error.hasError) {
    switch (error.status) {
      case 400:
        throw {
          key: "LOGIN_NOT_FOUND",
          msg: "Verifique as informações de login e tente novamente.",
        } as AppError
      case 403:
        throw {
          key: "LOGIN_NOT_FOUND",
          msg: "Verifique as informações de login e tente novamente.",
        } as AppError

      default:
        throw {
          key: "UNIDENTIFIED",
          msg: "Ocorreu um erro inesperado, tente novamente mais tarde.",
        } as AppError
    }
  }

  return response
}

export const normalizeRegister = (response: User): User => {
  const error = normalizeError(response)

  if (error.hasError) {
    switch (error.status) {
      case 409:
        throw {
          key: "ALREADY_REGISTERED",
          msg: "Este e-mail já está em uso.",
        } as AppError

      default:
        throw {
          key: "UNIDENTIFIED",
          msg: "Ocorreu um erro inesperado, tente novamente mais tarde.",
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
          key: "USER_NOT_FOUND",
          msg: "Usuário não encontrado.",
        } as AppError

      default:
        throw {
          key: "UNIDENTIFIED",
          msg: "Ocorreu um erro inesperado, tente novamente mais tarde.",
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

export const normalizeUpdateUserImage = (response: string) => {
  const error = normalizeError(response)

  console.error("error user image", error, response)

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
          msg: "Ocorreu um erro inesperado, tente novamente mais tarde.",
        } as AppError
    }
  }
}
