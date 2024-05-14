import { create } from "zustand"

import { NormalizedPanc } from "@/modules/panc/types"

interface PancStoreProps {
  pancs: NormalizedPanc[]
  favorites: NormalizedPanc[]
}

interface PancActions {
  setPancs: (pancs: NormalizedPanc[]) => void
  setFavorites: (ids: string[]) => void
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
    setPancs: (pancs) => {
      if (pancs === get().pancs) return
      set({ pancs })
    },
    setFavorites: (ids) => {
      if (ids === get().favorites.map((favorite) => favorite.id)) return

      const favorites = get().pancs.filter((panc) => ids.includes(panc.id))
      set({ favorites })
    },
  },
}))

export default usePancStore
