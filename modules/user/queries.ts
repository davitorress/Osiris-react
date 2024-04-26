import { useMutation, useQuery } from "@tanstack/react-query"

import { request } from "../shared/request"
import { LoginProps, RegisterProps } from "./types"

// TODO: error handling
const login = async ({ email, password }: LoginProps) => {
  const response = await request({
    url: "/login",
    method: "POST",
    body: { email, password },
  })

  return response
}

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.error(error)
    },
  })
}

// TODO: error handling
const register = async ({ name, email, password, confirmPassword }: RegisterProps) => {
  const response = await request({
    url: "/register",
    method: "POST",
    body: { name, email, password, confirmPassword },
  })

  return response
}

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log(data)
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
