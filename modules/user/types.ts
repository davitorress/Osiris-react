export interface LoginProps {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  idUsuario: string
}

export interface RegisterProps {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface UserSignature {
  ativa: boolean
  dataInicio?: any
  dataTermino?: any
}

export interface User {
  id: string
  nome: string
  email: string
  imagem: string
  assinatura: UserSignature
  pancsFavoritasId: string[]
  receitasSalvasId: string[]
}

export interface NormalizedUser {
  id: string
  name: string
  email: string
  image: string
  signature: UserSignature
  favoritePancsId: string[]
  savedRecipesId: string[]
}
