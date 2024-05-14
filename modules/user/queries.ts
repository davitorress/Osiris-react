import { useRouter } from "expo-router"
import { useMutation, useQuery } from "@tanstack/react-query"

import useUserStore from "@/storage/user"
import usePancStore from "@/storage/panc"
import useRecipeStore from "@/storage/recipe"

import { request } from "../shared/request"
import { LoginProps, RegisterProps } from "./types"
import { normalizeLogin, normalizeRegister, normalizeUser } from "./normalizers"

// TODO: error handling
const login = async ({ email, password }: LoginProps) => {
  const response = await request({
    url: "/login",
    method: "POST",
    body: { email, senha: password },
  })

  return normalizeLogin(response)
}

export const useLogin = () => {
  const router = useRouter()
  const {
    actions: { setToken, setId },
  } = useUserStore()

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.token)
      setId(data.idUsuario)
      router.navigate("/(tabs)/")
      // TODO: save token in storage (localStorage/cookie and context)
    },
    onError: (error) => {
      console.error(error)
      // TODO: show snackbar with error message
    },
  })
}

// TODO: error handling
const register = async ({ name, email, password }: RegisterProps) => {
  const response = await request({
    url: "/usuarios",
    method: "POST",
    body: { nome: name, email, senha: password },
  })

  return normalizeRegister(response)
}

export const useRegister = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      router.navigate("/login")
    },
    onError: (error) => {
      console.error(error)
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
