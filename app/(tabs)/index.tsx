import { useFocusEffect } from "expo-router"
import { ScrollView, View } from "react-native"
import { useCallback, useMemo, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"

import { useListPancs } from "@/modules/panc/queries"
import { useListRecipes } from "@/modules/recipe/queries"
import useTranslationStore from "@/storage/translation"

import Sizes from "@/constants/Sizes"
import SearchInput from "@/components/basic/SearchInput"
import LanguageFlag from "@/components/basic/LanguageFlag"
import LoadingScreen from "@/components/basic/LoadingScreen"
import ProductShowcase from "@/components/blocks/ProductShowcase"

export default function HomeScreen() {
  const [search, setSearch] = useState("")
  const locale = useTranslationStore((state) => state.locale)
  const translate = useTranslationStore((state) => state.actions.translate)

  const { data: pancs, isFetched: isFetchedPancs } = useListPancs()
  const { data: recipes, isFetched: isFetchedRecipes } = useListRecipes()

  const pancsSliced = useMemo(
    () => (pancs ? pancs.filter((p) => p.locale === locale).slice(0, 5) : []),
    [pancs, locale]
  )
  const recipesSliced = useMemo(
    () => (recipes ? recipes.filter((r) => r.locale === locale).slice(0, 5) : []),
    [recipes, locale]
  )

  const searchProducts = useMemo(() => {
    if (!search) return []

    const pancsArray = pancs ? pancs : []
    const recipesArray = recipes ? recipes : []
    const products = [...pancsArray, ...recipesArray]

    return products
      .filter((p) => p.locale === locale)
      .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [search, pancs, recipes])

  const isDataReady = isFetchedPancs && isFetchedRecipes && !!pancs && !!recipes

  useFocusEffect(
    useCallback(() => {
      setSearch("")

      return () => {
        setSearch("")
      }
    }, [setSearch])
  )

  if (!isDataReady) {
    return <LoadingScreen />
  }

  return (
    <SafeAreaView className="m-0 flex-1 bg-white">
      <ScrollView>
        <View className="pt-6 px-6">
          <View
            style={{ gap: Sizes.small }}
            className="w-full flex-row items-center justify-between"
          >
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder={translate("form.placeholder.searchHome")}
            />

            <LanguageFlag locale={locale} />
          </View>

          {searchProducts && searchProducts.length > 0 && (
            <View className="w-full mt-8">
              <ProductShowcase title={translate("general.itemsFound")} products={searchProducts} />
            </View>
          )}

          {pancsSliced && pancsSliced.length > 0 && (
            <View className="w-full mt-8">
              <ProductShowcase
                title={translate("general.pancs")}
                products={pancsSliced}
                horizontal
              />
            </View>
          )}

          {recipesSliced && recipesSliced.length > 0 && (
            <View className="w-full mt-8">
              <ProductShowcase
                title={translate("general.recipes")}
                products={recipesSliced}
                horizontal
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
