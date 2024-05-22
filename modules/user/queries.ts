import { useRouter } from "expo-router"
import Toast from "react-native-toast-message"
import { ImagePickerAsset } from "expo-image-picker"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import useUserStore from "@/storage/user"
import usePancStore from "@/storage/panc"
import useRecipeStore from "@/storage/recipe"

import { AppError } from "../shared/types"
import { request } from "../shared/request"
import { LoginProps, RegisterProps } from "./types"
import { EditUserData } from "@/components/forms/types"
import {
  normalizeLogin,
  normalizeRegister,
  normalizeUpdateUserImage,
  normalizeUser,
} from "./normalizers"

export const useLogout = () => {
  const router = useRouter()
  const {
    actions: { clearUser },
  } = useUserStore()
  const {
    actions: { clearPancs },
  } = usePancStore()
  const {
    actions: { clearRecipes },
  } = useRecipeStore()

  const mutation = async () => {
    clearUser()
    clearPancs()
    clearRecipes()
    router.push("/")
  }

  return useMutation({
    mutationFn: mutation,
  })
}

export const useLogin = () => {
  const router = useRouter()
  const {
    actions: { setToken, setId },
  } = useUserStore()

  const mutation = async ({ email, password }: LoginProps) => {
    const response = await request({
      url: "/login",
      method: "POST",
      body: { email, senha: password },
    })

    return normalizeLogin(response)
  }

  return useMutation({
    mutationFn: mutation,
    onSuccess: (data) => {
      setToken(data.token)
      setId(data.idUsuario)
      router.push("/(tabs)/")
    },
    onError: (error: AppError) => {
      Toast.show({
        type: "error",
        text1: "Erro ao logar!",
        text2: error.msg,
      })
    },
  })
}

export const useRegister = () => {
  const router = useRouter()

  const mutation = async ({ name, email, password }: RegisterProps) => {
    const response = await request({
      url: "/usuarios",
      method: "POST",
      body: { nome: name, email, senha: password },
    })

    return normalizeRegister(response)
  }

  return useMutation({
    mutationFn: mutation,
    onSuccess: () => {
      router.push("/login")
    },
    onError: (error: AppError) => {
      Toast.show({
        type: "error",
        text1: "Erro no cadastro!",
        text2: error.msg,
      })
    },
  })
}

export const useCurrentUser = () => {
  const { id, token } = useUserStore()
  const {
    actions: { setFavorites },
  } = usePancStore()
  const {
    actions: { setSaved },
  } = useRecipeStore()

  const query = async () => {
    const response = await request({
      url: `/usuarios/${id}`,
      token,
    })

    const user = normalizeUser(response)
    setFavorites(user.favoritePancsId)
    setSaved(user.savedRecipesId)

    return user
  }

  return useQuery({
    queryKey: ["currentUser", id],
    queryFn: query,
    enabled: !!id && !!token,
  })
}

export const useUpdateUser = () => {
  const { token } = useUserStore()
  const queryClient = useQueryClient()

  const mutation = async ({ id, data }: { id: string; data: EditUserData }) => {
    const response = await request({
      url: `/usuarios/${id}`,
      token,
      method: "PATCH",
      body: {
        nome: data.name,
        email: data.email,
        senha: data.newPassword,
      },
    })

    return normalizeUser(response)
  }

  return useMutation({
    mutationFn: mutation,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
  })
}

export const useUpdateUserImage = () => {
  const { token } = useUserStore()
  const queryClient = useQueryClient()

  const mutation = async ({ id, image }: { id: string; image: ImagePickerAsset }) => {
    const formData = new FormData()
    formData.append("imagem", {
      uri: image.uri,
      name: image.fileName,
      type: image.mimeType,
      lastModified: new Date().getTime(),
    } as any)

    const response = await request({
      url: `/usuarios/${id}/imagem`,
      token,
      xml: true,
      method: "PATCH",
      body: formData,
      stringifyBody: false,
      formDataBody: true,
    })

    return normalizeUpdateUserImage(response)
  }

  return useMutation({
    mutationFn: mutation,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
    onError: (error) => {
      console.error(error)
    },
  })
}

export const updateUserPancs = async (id: string, token: string, pancs: string[]) => {
  const response = await request({
    url: `/usuarios/${id}`,
    method: "PATCH",
    token,
    body: {
      pancsFavoritasId: pancs,
    },
  })

  return normalizeUser(response)
}

export const updateUserRecipes = async (id: string, token: string, recipes: string[]) => {
  const response = await request({
    url: `/usuarios/${id}`,
    method: "PATCH",
    token,
    body: {
      receitasSalvasId: recipes,
    },
  })

  return normalizeUser(response)
}
