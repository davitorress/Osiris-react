import { LocalesName } from "@/storage/translation"

export interface CreateRecipe {
  name: string
  author: string
  pancs: string[]
  description: string
  ingredients: string[]
  preparation: string[]
  locale: string
}

export interface EditRecipe extends CreateRecipe {
  id: string
}

export interface Recipe {
  id: string
  nome: string
  imagem: string
  descricao: string
  usuarioId: string
  pancs: string[]
  preparo: string[]
  ingredientes: string[]
  locale: LocalesName
}

export interface NormalizedRecipe {
  type: "recipe"
  id: string
  name: string
  image: string
  author: string
  description: string
  pancs: string[]
  preparation: string[]
  ingredients: string[]
  locale: LocalesName
}
