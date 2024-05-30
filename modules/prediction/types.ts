import { CameraCapturedPicture } from "expo-camera"
import { ImagePickerAsset } from "expo-image-picker"

export interface AddPrediction {
  image?: ImagePickerAsset
  photo?: CameraCapturedPicture
}

export type PredictionStatus = "CONCLUIDA" | "PROCESSANDO" | "CANCELADA"

export interface Prediction {
  id: string
  data: string
  imagem: string
  classe: string
  acuracia: number
  usuarioId: string
  status: PredictionStatus
}

export const PredictionStatusEnum = {
  CONCLUIDA: "Concluída",
  PROCESSANDO: "Processando",
  CANCELADA: "Cancelada",
} as const

export type NormalizedPredictionStatus =
  (typeof PredictionStatusEnum)[keyof typeof PredictionStatusEnum]

export interface NormalizedPrediction {
  id: string
  date: Date
  image: string
  author: string
  accuracy: number
  classification: string
  status: NormalizedPredictionStatus
}
