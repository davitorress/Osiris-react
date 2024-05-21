import { AppError } from "../shared/types"
import { NormalizedPanc, Panc } from "./types"
import { normalizeError } from "../shared/normalizers"

export const normalizePanc = (response: Panc): NormalizedPanc => {
  const error = normalizeError(response)

  if (error.hasError) {
    switch (error.status) {
      case 401:
        throw {
          key: "UNAUTHORIZED",
          msg: "Acesso inválido, faça login novamente.",
        } as AppError
      case 404:
        throw {
          key: "PANC_NOT_FOUND",
          msg: "PANC não encontrada ou não existe.",
        } as AppError

      default:
        throw {
          key: "UNIDENTIFIED",
          msg: "Ocorreu um erro inesperado, tente novamente mais tarde.",
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
          key: "UNAUTHORIZED",
          msg: "Acesso inválido, faça login novamente.",
        } as AppError

      default:
        throw {
          key: "UNIDENTIFIED",
          msg: "Ocorreu um erro inesperado, tente novamente mais tarde.",
        } as AppError
    }
  }

  return response.map(normalizePanc)
}
