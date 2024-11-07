import { ScrollView, View } from "react-native"
import { useCallback, useMemo, useState } from "react"
import { useFocusEffect, useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

import { useListRecipes } from "@/modules/recipe/queries"
import useTranslationStore from "@/storage/translation"

import Sizes from "@/constants/Sizes"
import IonIcon from "@/components/basic/IonIcon"
import TextThemed from "@/components/themed/TextThemed"
import SearchInput from "@/components/basic/SearchInput"
import ButtonThemed from "@/components/themed/ButtonThemed"
import LoadingScreen from "@/components/basic/LoadingScreen"
import ProductShowcase from "@/components/blocks/ProductShowcase"
import LanguageFlag from "@/components/basic/LanguageFlag"

export default function RecipesScreen() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const { data: recipes, isLoading } = useListRecipes()
  const locale = useTranslationStore((state) => state.locale)
  const translate = useTranslationStore((state) => state.actions.translate)

  const searchRecipes = useMemo(() => {
    if (!search || !recipes) return []

    return recipes
      .filter((recipe) => recipe.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [search, recipes])

  useFocusEffect(
    useCallback(() => {
      setSearch("")

      return () => {
        setSearch("")
      }
    }, [setSearch])
  )

  if (!recipes || isLoading) {
    return <LoadingScreen />
  }

  return (
    <SafeAreaView className="m-0 flex-1">
      <ScrollView>
        <View className="p-6">
          <View
            style={{ gap: Sizes.small }}
            className="w-full flex-row items-center justify-between"
          >
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder={translate("form.placeholder.searchRecipes")}
            />

            <LanguageFlag locale={locale} />
          </View>

          <View className="w-full mt-8">
            <ButtonThemed size="full" onClick={() => router.push("/(tabs)/recipes/new")}>
              <TextThemed size="body2" color="white" font="nunitoSemiBold" classes="mr-1.5">
                {translate("actions.postRecipe")}
              </TextThemed>

              <IonIcon name="add-circle-outline" size="large" color="white" />
            </ButtonThemed>
          </View>

          {searchRecipes && searchRecipes.length > 0 && (
            <View className="w-full mt-8">
              <ProductShowcase title={translate("general.recipesFound")} products={searchRecipes} />
            </View>
          )}

          {recipes.length > 0 && (
            <View className="w-full mt-8">
              <ProductShowcase title={translate("general.recipes")} products={recipes} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
