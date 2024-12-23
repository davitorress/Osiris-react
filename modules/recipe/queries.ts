import { ImagePickerAsset } from "expo-image-picker"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import useUserStore from "@/storage/user"
import useRecipeStore from "@/storage/recipe"
import useTranslationStore from "@/storage/translation"

import { request } from "../shared/request"
import { CreateRecipe, EditRecipe } from "./types"
import { updateUserRecipes, useCurrentUser } from "../user/queries"
import {
  normalizeDeleteRecipe,
  normalizeRecipe,
  normalizeRecipes,
  normalizeUpdateRecipeImage,
} from "./normalizers"

export const useGetRecipe = (id: string) => {
  const token = useUserStore((state) => state.token)

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
  const token = useUserStore((state) => state.token)
  const setRecipes = useRecipeStore((state) => state.actions.setRecipes)

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
  const { data: user } = useCurrentUser()
  const token = useUserStore((state) => state.token)
  const setSaved = useRecipeStore((state) => state.actions.setSaved)
  const getIsSaved = useRecipeStore((state) => state.actions.getIsSaved)
  const translate = useTranslationStore((state) => state.actions.translate)

  const mutation = async (id: string) => {
    if (user && token && !getIsSaved(id)) {
      return updateUserRecipes(user.id, token, [...user.savedRecipesId, id], translate)
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
  const { data: user } = useCurrentUser()
  const token = useUserStore((state) => state.token)
  const setSaved = useRecipeStore((state) => state.actions.setSaved)
  const getIsSaved = useRecipeStore((state) => state.actions.getIsSaved)
  const translate = useTranslationStore((state) => state.actions.translate)

  const mutation = async (id: string) => {
    if (user && token && getIsSaved(id)) {
      return updateUserRecipes(
        user.id,
        token,
        user.savedRecipesId.filter((savedId) => savedId !== id),
        translate
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
  const token = useUserStore((state) => state.token)
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
  const token = useUserStore((state) => state.token)
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
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: ["recipes"] })
      void queryClient.invalidateQueries({ queryKey: ["recipe", data.id] })
    },
  })
}

export const useUpdateRecipeImage = () => {
  const token = useUserStore((state) => state.token)
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
      url: `/receitas/${id}/imagem`,
      token,
      xml: true,
      method: "PATCH",
      body: formData,
      formDataBody: true,
      stringifyBody: false,
    })

    return normalizeUpdateRecipeImage(response)
  }

  return useMutation({
    mutationFn: mutation,
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: ["recipes"] })
      void queryClient.invalidateQueries({ queryKey: ["recipe", data.id] })
    },
    onError: (error) => {
      console.error(error)
    },
  })
}

export const useDeleteRecipe = () => {
  const token = useUserStore((state) => state.token)
  const queryClient = useQueryClient()

  const mutation = async (id: string) => {
    const response = await request({
      url: `/receitas/${id}`,
      token,
      method: "DELETE",
    })

    return normalizeDeleteRecipe(response, id)
  }

  return useMutation({
    mutationFn: mutation,
    onSuccess: (id) => {
      void queryClient.removeQueries({ queryKey: ["recipe", id] })
      void queryClient.invalidateQueries({ queryKey: ["recipes"] })
    },
    onError: (error) => {
      console.error(error)
    },
  })
}
