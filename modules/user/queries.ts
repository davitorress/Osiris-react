import { useRouter } from "expo-router"
import { useMutation, useQuery } from "@tanstack/react-query"

import { request } from "../shared/request"
import { LoginProps, RegisterProps } from "./types"
import { normalizeLogin, normalizeRegister } from "./normalizers"

// TODO: error handling
const login = async ({ email, password }: LoginProps) => {
  const response = await request({
    url: "/login",
    method: "POST",
    body: { email, senha: password },
  })

  return normalizeLogin(response)
}

export const useLogin = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data)
      router.navigate("/(tabs)/")
      // TODO: save token in storage (localStorage/cookie and context)
    },
    onError: (error) => {
      console.error(error)
      // TODO: show snackbar with error message
    },
  })
}

// TODO: error handling
const register = async ({ name, email, password }: RegisterProps) => {
  const response = await request({
    url: "/usuarios",
    method: "POST",
    body: { nome: name, email, senha: password },
  })

  return normalizeRegister(response)
}

export const useRegister = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      router.navigate("/login")
    },
    onError: (error) => {
      console.error(error)
    },
  })
}

// TODO: get ID from token
export const useCurrentUser = (id: string) => {
  const query = async () => {
    const response = await request({
      url: `/user/${id}`,
      // TODO: send auth token
    })

    return response
  }

  return useQuery({
    queryKey: ["user", id],
    queryFn: query,
    enabled: !!id, // TODO: enable query by token
  })
}
