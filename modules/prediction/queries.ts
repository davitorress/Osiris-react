import Toast from "react-native-toast-message"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import useUserStore from "@/storage/user"
import useTranslationStore from "@/storage/translation"

import { AddPrediction } from "./types"
import { AppError } from "../shared/types"
import { request } from "../shared/request"
import { normalizeAddPrediction, normalizePredictions } from "./normalizers"

export const useGetUserPredictions = () => {
  const { id, token } = useUserStore()
  const translate = useTranslationStore((state) => state.actions.translate)

  const query = async () => {
    const response = await request({
      url: `/predicoes/usuario/${id}`,
      token,
      method: "GET",
    })

    return normalizePredictions(response, translate)
  }

  return useQuery({
    queryKey: ["predictions", id],
    queryFn: query,
  })
}

export const useAddPrediction = () => {
  const { id, token } = useUserStore()
  const queryClient = useQueryClient()
  const translate = useTranslationStore((state) => state.actions.translate)

  const mutation = async ({ image, photo }: AddPrediction) => {
    const formData = new FormData()
    formData.append("imagem", {
      uri: image?.uri ?? photo?.uri,
      name: image?.fileName ?? photo?.uri.split("/").pop(),
      type: image?.mimeType ?? `image/${photo?.uri.split(".").pop()}`,
      lastModified: new Date().getTime(),
    } as any)

    const response = await request({
      url: "/predicoes",
      token,
      xml: true,
      method: "POST",
      body: formData,
      formDataBody: true,
      stringifyBody: false,
    })

    return normalizeAddPrediction(response, translate)
  }

  return useMutation({
    mutationFn: mutation,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["predictions", id] })
    },
    onError: (error: AppError) => {
      Toast.show({
        type: "error",
        text1: translate("requests.analysisError"),
        text2: error.msg,
      })
    },
  })
}
