import { create } from "zustand"

import { NormalizedPanc } from "@/modules/panc/types"

interface PancStoreProps {
  pancs: NormalizedPanc[]
  favorites: NormalizedPanc[]
}

interface PancActions {
  clearPancs: () => void
  setPancs: (pancs: NormalizedPanc[]) => void
  setFavorites: (ids: string[]) => void

  getIsFavorite: (id: string) => boolean
}

type PancStore = PancStoreProps & {
  actions: PancActions
}

const initialState: PancStoreProps = {
  pancs: [],
  favorites: [],
}

const usePancStore = create<PancStore>((set, get) => ({
  ...initialState,
  actions: {
    clearPancs: () => {
      if (get().pancs.length === 0 && get().favorites.length === 0) return
      set(initialState)
    },

    setPancs: (pancs) => {
      if (pancs === get().pancs) return
      set({ pancs })
    },
    setFavorites: (ids) => {
      if (ids === get().favorites.map((favorite) => favorite.id)) return

      const favorites = get().pancs.filter((panc) => ids.includes(panc.id))
      set({ favorites })
    },

    getIsFavorite: (id) => get().favorites.some((favorite) => favorite.id === id),
  },
}))

export default usePancStore
