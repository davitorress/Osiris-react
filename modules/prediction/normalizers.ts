import { AppError } from "../shared/types"
import { normalizeError } from "../shared/normalizers"
import { TranslateFunction } from "@/storage/translation"
import { NormalizedPrediction, Prediction, PredictionStatusEnum } from "./types"

export const normalizePrediction = (
  response: Prediction,
  translate: TranslateFunction
): NormalizedPrediction => {
  const error = normalizeError(response)

  if (error.hasError) {
    switch (error.status) {
      default:
        throw {
          key: "UNIDENTIFIED",
          msg: translate("requests.analysesNotFound"),
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

export const normalizePredictions = (
  response: Prediction[],
  translate: TranslateFunction
): NormalizedPrediction[] => {
  const error = normalizeError(response)

  if (error.hasError) {
    switch (error.status) {
      default:
        throw {
          key: "UNIDENTIFIED",
          msg: translate("requests.analysesNotFound"),
        } as AppError
    }
  }

  return response
    .map((prediction) => normalizePrediction(prediction, translate))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
}

export const normalizeAddPrediction = (response: any, translate: TranslateFunction) => {
  const error = normalizeError(response)

  if (error.hasError) {
    switch (error.status) {
      case 500:
        throw {
          key: "INTERNAL_SERVER_ERROR",
          msg: translate("requests.processingAnalysis"),
        } as AppError

      default:
        throw {
          key: "UNIDENTIFIED",
          msg: translate("requests.processingAnalysis"),
        } as AppError
    }
  }
}
