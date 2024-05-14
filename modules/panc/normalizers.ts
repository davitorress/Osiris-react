import { AppError } from "../shared/types"
import { NormalizedPanc, Panc } from "./types"
import { normalizeError } from "../shared/normalizers"

export const normalizePanc = (response: Panc): NormalizedPanc => {
  const error = normalizeError(response)

  if (error.hasError) {
    switch (error.status) {
      case 401:
        throw {
          error: { key: "UNAUTHORIZED", msg: error.message },
        } as AppError
      case 404:
        throw {
          error: { key: "PANC_NOT_FOUND", msg: error.message },
        } as AppError

      default:
        throw {
          error: { key: "UNIDENTIFIED", msg: error.message },
        } as AppError
    }
  }

  return {
    type: "panc",
    id: response.id,
    name: response.nome,
    image: response.imagem,
    benefits: response.beneficios,
    description: response.descricao,
    cultivation: response.cultivo,
  }
}

export const normalizePancs = (response: Panc[]): NormalizedPanc[] => {
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

  return response.map(normalizePanc)
}
