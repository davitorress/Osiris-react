import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import useUserStore from "@/storage/user"
import usePancStore from "@/storage/panc"

import { request } from "../shared/request"
import { normalizePancs, normalizePanc } from "./normalizers"
import { updateUserPancs, useCurrentUser } from "../user/queries"

export const useGetPanc = (id: string) => {
  const { token } = useUserStore()

  const query = async () => {
    const response = await request({
      url: `/pancs/${id}`,
      token,
    })

    return normalizePanc(response)
  }

  return useQuery({
    queryKey: ["panc", id],
    queryFn: query,
    enabled: !!token,
  })
}

export const useListPancs = () => {
  const { token } = useUserStore()
  const {
    actions: { setPancs },
  } = usePancStore()

  const query = async () => {
    const response = await request({
      url: "/pancs",
      token,
    })

    const pancs = normalizePancs(response)
    setPancs(pancs)

    return pancs
  }

  return useQuery({
    queryKey: ["pancs"],
    queryFn: query,
    enabled: !!token,
  })
}

export const useAddPancToFavorites = () => {
  const queryClient = useQueryClient()
  const {
    actions: { getIsFavorite, setFavorites },
  } = usePancStore()
  const { token } = useUserStore()
  const { data: user } = useCurrentUser()

  const mutation = async (id: string) => {
    if (user && token && !getIsFavorite(id)) {
      return updateUserPancs(user.id, token, [...user.favoritePancsId, id])
    }
    return
  }

  return useMutation({
    mutationFn: mutation,
    onSuccess: (data) => {
      if (data) {
        setFavorites(data.favoritePancsId)
        void queryClient.invalidateQueries({ queryKey: ["currentUser"] })
      }
    },
    onError: (error) => {
      console.error(error)
    },
  })
}

export const useRemovePancFromFavorites = () => {
  const queryClient = useQueryClient()
  const {
    actions: { getIsFavorite, setFavorites },
  } = usePancStore()
  const { token } = useUserStore()
  const { data: user } = useCurrentUser()

  const mutation = async (id: string) => {
    if (user && token && getIsFavorite(id)) {
      return updateUserPancs(
        user.id,
        token,
        user.favoritePancsId.filter((pancId) => pancId !== id)
      )
    }
    return
  }

  return useMutation({
    mutationFn: mutation,
    onSuccess: (data) => {
      if (data) {
        setFavorites(data.favoritePancsId)
        void queryClient.invalidateQueries({ queryKey: ["currentUser"] })
      }
    },
    onError: (error) => {
      console.error(error)
    },
  })
}
