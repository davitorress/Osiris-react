import { AppError } from "../shared/types"
import { normalizeError } from "../shared/normalizers"
import { NormalizedPrediction, Prediction, PredictionStatusEnum } from "./types"

export const normalizePrediction = (response: Prediction): NormalizedPrediction => {
  const error = normalizeError(response)

  if (error.hasError) {
    switch (error.status) {
      default:
        throw {
          key: "UNIDENTIFIED",
          msg: "Ocorreu um erro ao buscar as análises, tente novamente mais tarde.",
        } as AppError
    }
  }

  return {
    id: response.id,
    image: response.imagem,
    author: response.usuarioId,
    accuracy: response.acuracia,
    date: new Date(response.data),
    classification: response.classe,
    status: PredictionStatusEnum[response.status],
  }
}

export const normalizePredictions = (response: Prediction[]): NormalizedPrediction[] => {
  const error = normalizeError(response)

  if (error.hasError) {
    switch (error.status) {
      default:
        throw {
          key: "UNIDENTIFIED",
          msg: "Ocorreu um erro ao buscar as análises, tente novamente mais tarde.",
        } as AppError
    }
  }

  return response.map(normalizePrediction).sort((a, b) => b.date.getTime() - a.date.getTime())
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
