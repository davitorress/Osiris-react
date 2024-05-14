import usePancStore from "@/storage/panc"
import useRecipeStore from "@/storage/recipe"
import { NormalizedProduct, Product } from "./types"

export const convertToProductCarousel = (product: Product): NormalizedProduct => {
  const { favorites } = usePancStore()
  const { saved } = useRecipeStore()

  return {
    id: product.id,
    type: product.type,
    name: product.name,
    image: product.image,
    isFavorite:
      product.type === "panc"
        ? favorites.some((favorite) => favorite.id === product.id)
        : saved.some((save) => save.id === product.id),
  }
}

export const convertToProductList = (product: Product): NormalizedProduct => {
  const { favorites } = usePancStore()
  const { saved } = useRecipeStore()

  return {
    id: product.id,
    type: product.type,
    name: product.name,
    image: product.image,
    description: product.description,
    isFavorite:
      product.type === "panc"
        ? favorites.some((favorite) => favorite.id === product.id)
        : saved.some((save) => save.id === product.id),
  }
}
