import { create } from "zustand"

import { NormalizedRecipe } from "@/modules/recipe/types"

interface RecipeStoreProps {
  recipes: NormalizedRecipe[]
  saved: NormalizedRecipe[]
}

interface RecipeActions {
  clearRecipes: () => void
  setRecipes: (recipes: NormalizedRecipe[]) => void
  setSaved: (ids: string[]) => void

  getIsSaved: (id: string) => boolean
}

type RecipeStore = RecipeStoreProps & {
  actions: RecipeActions
}

const initialState: RecipeStoreProps = {
  recipes: [],
  saved: [],
}

const useRecipeStore = create<RecipeStore>((set, get) => ({
  ...initialState,
  actions: {
    clearRecipes: () => {
      if (get().recipes.length === 0 && get().saved.length === 0) return
      set(initialState)
    },

    setRecipes: (recipes) => {
      if (recipes === get().recipes) return
      set({ recipes })
    },
    setSaved: (ids) => {
      if (ids === get().saved.map((save) => save.id)) return

      const saved = get().recipes.filter((recipe) => ids.includes(recipe.id))
      set({ saved })
    },

    getIsSaved: (id) => get().saved.some((save) => save.id === id),
  },
}))

export default useRecipeStore
