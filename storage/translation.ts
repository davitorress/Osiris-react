import { I18n } from "i18n-js"
import { create } from "zustand"
import { getLocales } from "expo-localization"

import pt from "@/i18n/pt.json"
import en from "@/i18n/en.json"

import enImg from "../assets/flags/en.png"
import ptImg from "../assets/flags/pt.png"

export const DEFAULT_LOCALE = "en"
export const DEVICE_LOCALE = getLocales()[0].languageCode ?? undefined

const i18n = new I18n(
  {
    pt: pt,
    en: en,
  },
  {
    enableFallback: true,
    locale: DEVICE_LOCALE,
    defaultLocale: DEFAULT_LOCALE,
  }
)

export type TranslateFunction = typeof i18n.t

export type LocalesName = "pt" | "en"

interface SupportedLocales {
  flag: string
  image: string
  currency: string
}

export const SUPPORTED_LOCALES: Record<LocalesName, SupportedLocales> = {
  pt: {
    flag: "pt-br",
    currency: "BRL",
    image: ptImg,
  },
  en: {
    flag: "en-us",
    currency: "USD",
    image: enImg,
  },
}

interface TranslationStoreProps {
  locale: string
}

interface TranslationActions {
  translate: TranslateFunction
  setLocale: (locale: string) => void
}

type TranslationStore = TranslationStoreProps & {
  actions: TranslationActions
}

const initialState: TranslationStoreProps = {
  locale: DEVICE_LOCALE ?? DEFAULT_LOCALE,
}

const useTranslationStore = create<TranslationStore>((set, get) => ({
  ...initialState,
  actions: {
    translate: (key, options) => i18n.t(key, options),
    setLocale: (locale) => {
      if (locale === get().locale) return
      i18n.locale = locale
      set({ locale })
    },
  },
}))

export default useTranslationStore
