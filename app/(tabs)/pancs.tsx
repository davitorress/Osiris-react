import { useFocusEffect } from "expo-router"
import { ScrollView, View } from "react-native"
import { useCallback, useMemo, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"

import { useListPancs } from "@/modules/panc/queries"

import SearchInput from "@/components/basic/SearchInput"
import LoadingScreen from "@/components/basic/LoadingScreen"
import ProductShowcase from "@/components/blocks/ProductShowcase"

export default function PancsScreen() {
  const { data: pancs, isLoading } = useListPancs()
  const [search, setSearch] = useState("")

  const searchPancs = useMemo(() => {
    if (!search || !pancs) return []

    return pancs
      .filter((panc) => panc.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [search, pancs])

  useFocusEffect(
    useCallback(() => {
      setSearch("")

      return () => {
        setSearch("")
      }
    }, [setSearch])
  )

  if (!pancs || isLoading) {
    return <LoadingScreen />
  }

  return (
    <SafeAreaView className="m-0 flex-1">
      <ScrollView>
        <View className="p-6">
          <SearchInput value={search} onChange={setSearch} placeholder="Pesquise por PANCs" />

          {searchPancs && searchPancs.length > 0 && (
            <View className="w-full mt-8">
              <ProductShowcase title="PANCs encontradas" products={searchPancs} />
            </View>
          )}

          {pancs.length > 0 && (
            <View className="w-full mt-8">
              <ProductShowcase title="PANCs" products={pancs} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
