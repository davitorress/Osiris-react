import { AppError } from "../shared/types"
import { NormalizedRecipe, Recipe } from "./types"
import { normalizeError } from "../shared/normalizers"

export const normalizeRecipe = (response: Recipe): NormalizedRecipe => {
  const error = normalizeError(response)

  if (error.hasError) {
    switch (error.status) {
      case 401:
        throw {
          key: "UNAUTHORIZED",
          msg: error.message,
        } as AppError
      case 404:
        throw {
          key: "RECIPE_NOT_FOUND",
          msg: error.message,
        } as AppError

      default:
        throw {
          key: "UNIDENTIFIED",
          msg: error.message,
        } as AppError
    }
  }

  return {
    type: "recipe",
    id: response.id,
    name: response.nome,
    pancs: response.pancs,
    image: response.imagem,
    author: response.usuarioId,
    preparation: response.preparo,
    description: response.descricao,
    ingredients: response.ingredientes,
  }
}

export const normalizeRecipes = (response: Recipe[]): NormalizedRecipe[] => {
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
          msg: error.message,
        } as AppError
    }
  }

  return response.map(normalizeRecipe)
}

export const normalizeUpdateRecipeImage = (response: any) => {
  const error = normalizeError(response)

  console.log("error image", error, response)

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
          msg: error.message,
        } as AppError
    }
  }
}

export const normalizeDeleteRecipe = (response: any, id: string): string => {
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
          msg: error.message,
        } as AppError
    }
  }

  return id
}
