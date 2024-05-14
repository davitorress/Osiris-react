import { useQuery } from "@tanstack/react-query"

import useUserStore from "@/storage/user"
import useRecipeStore from "@/storage/recipe"

import { request } from "../shared/request"
import { normalizeRecipe, normalizeRecipes } from "./normalizers"

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
