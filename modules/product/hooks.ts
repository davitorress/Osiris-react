import usePancStore from "@/storage/panc"
import { NormalizedProduct, Product } from "./types"

export const convertToProductCarousel = (product: Product): NormalizedProduct => {
  const { favorites } = usePancStore()

  return {
    id: product.id,
    type: product.type,
    name: product.name,
    image: product.image,
    isFavorite:
      product.type === "panc" ? favorites.some((favorite) => favorite.id === product.id) : false,
  }
}

export const convertToProductList = (product: Product): NormalizedProduct => {
  const { favorites } = usePancStore()

  return {
    id: product.id,
    type: product.type,
    name: product.name,
    image: product.image,
    isFavorite:
      product.type === "panc" ? favorites.some((favorite) => favorite.id === product.id) : false,
  }
}
