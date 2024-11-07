import { AppError } from "../shared/types"
import { NormalizedPanc, Panc } from "./types"
import { normalizeError } from "../shared/normalizers"
import { TranslateFunction } from "@/storage/translation"

export const normalizePanc = (response: Panc, translate: TranslateFunction): NormalizedPanc => {
  const error = normalizeError(response)

  if (error.hasError) {
    switch (error.status) {
      case 401:
        throw {
          key: "UNAUTHORIZED",
          msg: translate("requests.unauthorized"),
        } as AppError
      case 404:
        throw {
          key: "PANC_NOT_FOUND",
          msg: translate("requests.pancNotFound"),
        } as AppError

      default:
        throw {
          key: "UNIDENTIFIED",
          msg: translate("requests.unidentified"),
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

export const normalizePancs = (
  response: Panc[],
  translate: TranslateFunction
): NormalizedPanc[] => {
  const error = normalizeError(response)

  if (error.hasError) {
    switch (error.status) {
      case 401:
        throw {
          key: "UNAUTHORIZED",
          msg: translate("requests.unauthorized"),
        } as AppError

      default:
        throw {
          key: "UNIDENTIFIED",
          msg: translate("requests.unidentified"),
        } as AppError
    }
  }

  return response.map((panc) => normalizePanc(panc, translate))
}
