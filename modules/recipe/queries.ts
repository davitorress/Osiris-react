import { ImagePickerAsset } from "expo-image-picker"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import useUserStore from "@/storage/user"
import useRecipeStore from "@/storage/recipe"

import { CreateRecipe, EditRecipe } from "./types"
import { request } from "../shared/request"
import { normalizeRecipe, normalizeRecipes, normalizeUpdateRecipeImage } from "./normalizers"
import { updateUserRecipes, useCurrentUser } from "../user/queries"

export const useGetRecipe = (id: string) => {
  const { token } = useUserStore()

  const query = async () => {
    const response = await request({
      url: `/receitas/${id}`,
      token,
    })

    return normalizeRecipe(response)
  }

  return useQuery({
    queryKey: ["recipe", id],
    queryFn: query,
    enabled: !!token && !!id,
  })
}

export const useListRecipes = () => {
  const { token } = useUserStore()
  const {
    actions: { setRecipes },
  } = useRecipeStore()

  const query = async () => {
    const response = await request({
      url: "/receitas",
      token,
    })

    const recipes = normalizeRecipes(response)
    setRecipes(recipes)

    return recipes
  }

  return useQuery({
    queryKey: ["recipes"],
    queryFn: query,
    enabled: !!token,
  })
}

export const useAddRecipeToSaved = () => {
  const queryClient = useQueryClient()
  const {
    actions: { getIsSaved, setSaved },
  } = useRecipeStore()
  const { token } = useUserStore()
  const { data: user } = useCurrentUser()

  const mutation = async (id: string) => {
    if (user && token && !getIsSaved(id)) {
      return updateUserRecipes(user.id, token, [...user.savedRecipesId, id])
    }
    return
  }

  return useMutation({
    mutationFn: mutation,
    onSuccess: (data) => {
      if (data) {
        setSaved(data.savedRecipesId)
        void queryClient.invalidateQueries({ queryKey: ["currentUser"] })
      }
    },
    onError: (error) => {
      console.error(error)
    },
  })
}

export const useRemoveRecipeFromSaved = () => {
  const queryClient = useQueryClient()
  const {
    actions: { getIsSaved, setSaved },
  } = useRecipeStore()
  const { token } = useUserStore()
  const { data: user } = useCurrentUser()

  const mutation = async (id: string) => {
    if (user && token && getIsSaved(id)) {
      return updateUserRecipes(
        user.id,
        token,
        user.savedRecipesId.filter((savedId) => savedId !== id)
      )
    }
    return
  }

  return useMutation({
    mutationFn: mutation,
    onSuccess: (data) => {
      if (data) {
        setSaved(data.savedRecipesId)
        void queryClient.invalidateQueries({ queryKey: ["currentUser"] })
      }
    },
    onError: (error) => {
      console.error(error)
    },
  })
}

export const useCreateRecipe = () => {
  const { token } = useUserStore()
  const queryClient = useQueryClient()

  const mutation = async (data: CreateRecipe) => {
    const response = await request({
      url: "/receitas",
      token,
      method: "POST",
      body: {
        nome: data.name,
        pancs: data.pancs,
        usuarioId: data.author,
        preparo: data.preparation,
        descricao: data.description,
        ingredientes: data.ingredients,
      },
    })

    return normalizeRecipe(response)
  }

  return useMutation({
    mutationFn: mutation,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["recipes"] })
    },
    onError: (error) => {
      console.error(error)
    },
  })
}

export const useUpdateRecipe = () => {
  const { token } = useUserStore()
  const queryClient = useQueryClient()

  const mutation = async (data: EditRecipe) => {
    const response = await request({
      url: `/receitas/${data.id}`,
      token,
      method: "PATCH",
      body: {
        nome: data.name,
        pancs: data.pancs,
        preparo: data.preparation,
        descricao: data.description,
        ingredientes: data.ingredients,
      },
    })

    return normalizeRecipe(response)
  }

  return useMutation({
    mutationFn: mutation,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["recipes"] })
    },
  })
}

export const useUpdateRecipeImage = () => {
  const { token } = useUserStore()
  const queryClient = useQueryClient()

  const mutation = async ({ id, image }: { id: string; image: ImagePickerAsset }) => {
    const fetchImage = await fetch(image.uri)
    const blob = await fetchImage.blob()
    const file = new File([blob], image.fileName as string, {
      type: image.mimeType,
      lastModified: new Date().getTime(),
    })

    const formData = new FormData()
    formData.append("imagem", file)

    const response = await request({
      url: `/receitas/${id}/imagem`,
      token,
      method: "PATCH",
      body: formData,
      formDataBody: true,
      stringifyBody: false,
    })

    return normalizeUpdateRecipeImage(response)
  }

  return useMutation({
    mutationFn: mutation,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["recipes"] })
    },
    onError: (error) => {
      console.error(error)
    },
  })
}
