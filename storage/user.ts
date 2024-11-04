import { create } from "zustand"

interface UserStoreProps {
  id?: string
  token?: string
}

interface UserActions {
  clearUser: () => void
  setId: (id?: string) => void
  setToken: (token?: string) => void
}

type UserStore = UserStoreProps & {
  actions: UserActions
}

const initialState: UserStoreProps = {
  id: undefined,
  token: undefined,
}

const useUserStore = create<UserStore>((set, get) => ({
  ...initialState,
  actions: {
    clearUser: () => {
      if (get().id === undefined && get().token === undefined) return
      set(initialState)
    },

    setId: (id) => {
      if (id === get().id) return
      set({ id })
    },
    setToken: (token) => {
      if (token === get().token) return
      set({ token })
    },
  },
}))

export default useUserStore
