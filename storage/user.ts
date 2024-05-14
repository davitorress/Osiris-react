import { create } from "zustand"

import { User } from "@/modules/user/types"

interface UserStoreProps {
  id?: string
  user?: User
  token?: string
}

interface UserActions {
  setId: (id?: string) => void
  setUser: (user?: User) => void
  setToken: (token?: string) => void
}

type UserStore = UserStoreProps & {
  actions: UserActions
}

const initialState: UserStoreProps = {
  id: undefined,
  user: undefined,
  token: undefined,
}

const useUserStore = create<UserStore>((set, get) => ({
  ...initialState,
  actions: {
    setId: (id) => {
      if (id === get().id) return
      set({ id })
    },
    setToken: (token) => {
      if (token === get().token) return
      set({ token })
    },
    setUser: (user) => {
      if (user === get().user) return
      set({ user })
    },
  },
}))

export default useUserStore
