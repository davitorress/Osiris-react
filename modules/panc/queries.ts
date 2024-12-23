import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import useUserStore from "@/storage/user"
import usePancStore from "@/storage/panc"
import useTranslationStore from "@/storage/translation"

import { request } from "../shared/request"
import { normalizePancs, normalizePanc } from "./normalizers"
import { updateUserPancs, useCurrentUser } from "../user/queries"

export const useGetPanc = (id: string) => {
  const token = useUserStore((state) => state.token)
  const translate = useTranslationStore((state) => state.actions.translate)

  const query = async () => {
    const response = await request({
      url: `/pancs/${id}`,
      token,
    })

    return normalizePanc(response, translate)
  }

  return useQuery({
    queryKey: ["panc", id],
    queryFn: query,
    enabled: !!token,
  })
}

export const useListPancs = () => {
  const token = useUserStore((state) => state.token)
  const setPancs = usePancStore((state) => state.actions.setPancs)
  const translate = useTranslationStore((state) => state.actions.translate)

  const query = async () => {
    const response = await request({
      url: "/pancs",
      token,
    })

    const pancs = normalizePancs(response, translate)
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
  const { data: user } = useCurrentUser()
  const token = useUserStore((state) => state.token)
  const setFavorites = usePancStore((state) => state.actions.setFavorites)
  const getIsFavorite = usePancStore((state) => state.actions.getIsFavorite)
  const translate = useTranslationStore((state) => state.actions.translate)

  const mutation = async (id: string) => {
    if (user && token && !getIsFavorite(id)) {
      return updateUserPancs(user.id, token, [...user.favoritePancsId, id], translate)
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
  const { data: user } = useCurrentUser()
  const token = useUserStore((state) => state.token)
  const setFavorites = usePancStore((state) => state.actions.setFavorites)
  const getIsFavorite = usePancStore((state) => state.actions.getIsFavorite)
  const translate = useTranslationStore((state) => state.actions.translate)

  const mutation = async (id: string) => {
    if (user && token && getIsFavorite(id)) {
      return updateUserPancs(
        user.id,
        token,
        user.favoritePancsId.filter((pancId) => pancId !== id),
        translate
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
