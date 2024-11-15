import { Image } from "expo-image"
import { TouchableOpacity } from "react-native"

import useTranslationStore, { SUPPORTED_LOCALES } from "@/storage/translation"

interface LanguageFlagProps {
  locale: string
}

export default function LanguageFlag({ locale }: LanguageFlagProps) {
  const setLocale = useTranslationStore((state) => state.actions.setLocale)

  const handleChangeLocale = () => {
    const newLocale = locale === "en" ? "pt" : "en"
    setLocale(newLocale)
  }

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handleChangeLocale} className="w-fit">
      <Image
        alt={locale}
        source={SUPPORTED_LOCALES[locale].image}
        className="h-9 w-16 rounded-md object-cover"
      />
    </TouchableOpacity>
  )
}
