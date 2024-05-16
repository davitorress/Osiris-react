import { useMemo, useState } from "react"
import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { useListPancs } from "@/modules/panc/queries"
import { useListRecipes } from "@/modules/recipe/queries"

import SearchInput from "@/components/basic/SearchInput"
import ProductShowcase from "@/components/blocks/ProductShowcase"

export default function HomeScreen() {
  const [search, setSearch] = useState("")

  const { data: pancs, isFetched: isFetchedPancs } = useListPancs()
  const { data: recipes, isFetched: isFetchedRecipes } = useListRecipes()

  const pancsSliced = useMemo(() => (pancs ? pancs.slice(0, 5) : []), [pancs])
  const recipesSliced = useMemo(() => (recipes ? recipes.slice(0, 5) : []), [recipes])

  const searchProducts = useMemo(() => {
    if (!search) return []

    const pancsArray = pancs ? pancs : []
    const recipesArray = recipes ? recipes : []
    const products = [...pancsArray, ...recipesArray]

    return products
      .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [search, pancs, recipes])

  const isDataReady = isFetchedPancs && isFetchedRecipes && !!pancs && !!recipes

  if (!isDataReady) {
    return null
  }

  return (
    <SafeAreaView className="m-0 flex-1 bg-white">
      <ScrollView>
        <View className="pt-6 px-6">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Pesquise por PANCs ou receitas"
          />

          {searchProducts && searchProducts.length > 0 && (
            <View className="w-full mt-8">
              <ProductShowcase title="Itens encontrados" products={searchProducts} />
            </View>
          )}

          {pancsSliced && pancsSliced.length > 0 && (
            <View className="w-full mt-8">
              <ProductShowcase title="PANCs" products={pancsSliced} horizontal />
            </View>
          )}

          {recipesSliced && recipesSliced.length > 0 && (
            <View className="w-full mt-8">
              <ProductShowcase title="Receitas" products={recipesSliced} horizontal />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
