import { useFocusEffect } from "expo-router"
import { ScrollView, View } from "react-native"
import { useCallback, useMemo, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"

import { useListPancs } from "@/modules/panc/queries"
import useTranslationStore from "@/storage/translation"

import Sizes from "@/constants/Sizes"
import SearchInput from "@/components/basic/SearchInput"
import LoadingScreen from "@/components/basic/LoadingScreen"
import ProductShowcase from "@/components/blocks/ProductShowcase"
import LanguageFlag from "@/components/basic/LanguageFlag"

export default function PancsScreen() {
  const translate = useTranslationStore((state) => state.actions.translate)
  const locale = useTranslationStore((state) => state.locale)
  const { data: pancs, isLoading } = useListPancs()
  const [search, setSearch] = useState("")

  const filteredPancs = useMemo(
    () => (pancs ? pancs.filter((p) => p.locale === locale) : []),
    [pancs, locale]
  )

  const searchPancs = useMemo(() => {
    if (!search || !filteredPancs) return []

    return filteredPancs
      .filter((panc) => panc.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [search, filteredPancs])

  useFocusEffect(
    useCallback(() => {
      setSearch("")

      return () => {
        setSearch("")
      }
    }, [setSearch])
  )

  if (!filteredPancs || isLoading) {
    return <LoadingScreen />
  }

  return (
    <SafeAreaView className="m-0 pb-10 flex-1 bg-white">
      <ScrollView>
        <View className="p-6">
          <View
            style={{ gap: Sizes.small }}
            className="w-full flex-row items-center justify-between"
          >
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder={translate("form.placeholder.searchPancs")}
            />

            <LanguageFlag locale={locale} />
          </View>

          {searchPancs && searchPancs.length > 0 && (
            <View className="w-full mt-8">
              <ProductShowcase title={translate("general.pancsFound")} products={searchPancs} />
            </View>
          )}

          {filteredPancs.length > 0 && (
            <View className="w-full mt-8">
              <ProductShowcase title={translate("general.pancs")} products={filteredPancs} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
