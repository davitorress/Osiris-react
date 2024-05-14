import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import useUserStore from "@/storage/user"
import useRecipeStore from "@/storage/recipe"

import { request } from "../shared/request"
import { normalizeRecipe, normalizeRecipes } from "./normalizers"
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
