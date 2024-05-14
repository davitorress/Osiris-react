import { useQuery } from "@tanstack/react-query"

import useUserStore from "@/storage/user"
import usePancStore from "@/storage/panc"

import { request } from "../shared/request"
import { normalizePancs, normalizePanc } from "./normalizers"

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
