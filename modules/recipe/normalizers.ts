import { AppError } from "../shared/types"
import { NormalizedRecipe, Recipe } from "./types"
import { normalizeError } from "../shared/normalizers"

export const normalizeRecipe = (response: Recipe): NormalizedRecipe => {
  const error = normalizeError(response)

  if (error.hasError) {
    switch (error.status) {
      case 401:
        throw {
          error: { key: "UNAUTHORIZED", msg: error.message },
        } as AppError
      case 404:
        throw {
          error: { key: "RECIPE_NOT_FOUND", msg: error.message },
        } as AppError

      default:
        throw {
          error: { key: "UNIDENTIFIED", msg: error.message },
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
          error: { key: "UNAUTHORIZED", msg: error.message },
        } as AppError

      default:
        throw {
          error: { key: "UNIDENTIFIED", msg: error.message },
        } as AppError
    }
  }

  return response.map(normalizeRecipe)
}
