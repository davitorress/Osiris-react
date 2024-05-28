import Toast from "react-native-toast-message"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import useUserStore from "@/storage/user"

import { AddPrediction } from "./types"
import { AppError } from "../shared/types"
import { request } from "../shared/request"
import { normalizeAddPrediction } from "./normalizers"

export const useAddPrediction = () => {
  const { id, token } = useUserStore()
  const queryClient = useQueryClient()

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

    return normalizeAddPrediction(response)
  }

  return useMutation({
    mutationFn: mutation,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["predictions", id] })
    },
    onError: (error: AppError) => {
      Toast.show({
        type: "error",
        text1: "Erro na análise!",
        text2: error.msg,
      })
    },
  })
}
