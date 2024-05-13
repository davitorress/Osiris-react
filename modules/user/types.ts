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
  dataInicio: any
  dataTermino: any
}

export interface User {
  id: string
  nome: string
  email: string
  imagem: string
  perfil?: string
  assinatura?: UserSignature
  pancsFavoritasId: string[]
  receitasSalvasId: string[]
}
