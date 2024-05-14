export interface Panc {
  id: string
  nome: string
  imagem: string
  descricao: string
  beneficios: string
  cultivo: string[]
}

export interface NormalizedPanc {
  type: "panc"
  id: string
  name: string
  image: string
  benefits: string
  description: string
  cultivation: string[]
}
