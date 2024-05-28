import { AppError } from "../shared/types"
import { normalizeError } from "../shared/normalizers"

export const normalizePrediction = (response: any) => {
  const error = normalizeError(response)

  console.log("predição", response, error)

  if (error.hasError) {
    switch (error.status) {
      default:
        throw {
          key: "UNIDENTIFIED",
          msg: "Ocorreu um erro ao buscar as análises, tente novamente mais tarde.",
        } as AppError
    }
  }
}

export const normalizeAddPrediction = (response: any) => {
  const error = normalizeError(response)

  if (error.hasError) {
    switch (error.status) {
      case 500:
        throw {
          key: "INTERNAL_SERVER_ERROR",
          msg: "Ocorreu um erro ao processar a análise, tente novamente mais tarde.",
        } as AppError

      default:
        throw {
          key: "UNIDENTIFIED",
          msg: "Ocorreu um erro ao processar a análise, tente novamente mais tarde.",
        } as AppError
    }
  }
}
