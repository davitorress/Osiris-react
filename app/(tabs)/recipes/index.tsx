import { useRouter } from "expo-router"
import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { useListRecipes } from "@/modules/recipe/queries"
import { convertToProductList } from "@/modules/product/hooks"

import IonIcon from "@/components/basic/IonIcon"
import TextThemed from "@/components/themed/TextThemed"
import ButtonThemed from "@/components/themed/ButtonThemed"
import ProductShowcase from "@/components/blocks/ProductShowcase"

export default function RecipesScreen() {
  const router = useRouter()
  const { data: recipes } = useListRecipes()

  const recipesList = recipes?.map(convertToProductList)

  return (
    <SafeAreaView className="m-0 flex-1">
      <ScrollView>
        <View className="p-6">
          <View className="w-full py-2 px-4 flex-row items-center justify-between border border-gray-medium rounded-full bg-white">
            <TextThemed size="body2" color="grayPrimary" font="nunitoSemiBold">
              Busque por receitas
            </TextThemed>

            <IonIcon name="search" size="semi" color="secondary" />
          </View>

          <View className="w-full mt-8">
            <ButtonThemed size="full" onClick={() => router.push("/(tabs)/recipes/new")}>
              <TextThemed size="body2" color="white" font="nunitoSemiBold" classes="mr-1.5">
                Postar uma receita
              </TextThemed>

              <IonIcon name="add-circle-outline" size="large" color="white" />
            </ButtonThemed>
          </View>

          {/* <View className="w-full mt-8">
            <ProductShowcase title="Itens encontrados" products={showcaseMock} />
          </View> */}

          {recipesList && recipesList.length > 0 && (
            <View className="w-full mt-8">
              <ProductShowcase title="Receitas" products={recipesList} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
