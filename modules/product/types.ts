export type ProductType = "panc" | "recipe"

export interface Product {
  id: string
  name: string
  image: string
  type: ProductType
  description?: string
}

export interface NormalizedProduct {
  id: string
  name: string
  image: string
  type: ProductType
  isFavorite: boolean
  description?: string
}
