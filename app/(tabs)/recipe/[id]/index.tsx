import { Image } from "expo-image"
import { useLocalSearchParams, useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, TouchableOpacity, View } from "react-native"

import useRecipeStore from "@/storage/recipe"
import {
  useAddRecipeToSaved,
  useGetRecipe,
  useRemoveRecipeFromSaved,
} from "@/modules/recipe/queries"

import Sizes from "@/constants/Sizes"
import IonIcon from "@/components/basic/IonIcon"
import BulletList from "@/components/lists/BulletList"
import NumberList from "@/components/lists/NumberList"
import TextThemed from "@/components/themed/TextThemed"
import ButtonThemed from "@/components/themed/ButtonThemed"
import ContentSection from "@/components/blocks/ContentSection"

export default function RecipePage() {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()

  if (!id) {
    router.back()
  }

  const { data: recipe } = useGetRecipe(id as string)
  const addToSaved = useAddRecipeToSaved()
  const removeFromSaved = useRemoveRecipeFromSaved()

  const {
    actions: { getIsSaved },
  } = useRecipeStore()

  const handleAddToSaved = () => {
    addToSaved.mutate(id as string)
  }

  const handleRemoveFromSaved = () => {
    removeFromSaved.mutate(id as string)
  }

  return (
    <SafeAreaView className="m-0 flex-1">
      <ScrollView>
        <View className="p-6">
          <View className="flex-row items-start">
            <ButtonThemed
              type="icon"
              size="fit"
              shape="circle"
              color="primary"
              onClick={() => router.back()}
            >
              <IonIcon name="return-down-back" size="huge" color="white" />
            </ButtonThemed>

            <TextThemed
              size="h2"
              color="black"
              font="nunitoBold"
              numberOfLines={100}
              classes="ml-4"
            >
              {recipe?.name}
            </TextThemed>
          </View>

          <View className="w-full mt-8 flex-row">
            <View>
              <Image className="w-32 h-[132px] rounded-md" source={recipe?.image} />

              {recipe?.id && (
                <TouchableOpacity
                  className="mt-2 flex-row items-center"
                  onPress={getIsSaved(recipe.id) ? handleRemoveFromSaved : handleAddToSaved}
                >
                  <TextThemed size="body2" color="primary" font="nunitoSemiBold" classes="mr-2">
                    {getIsSaved(recipe.id) ? "Salvo" : "Salvar"}
                  </TextThemed>

                  <IonIcon
                    name={getIsSaved(recipe.id) ? "bookmark" : "bookmark-outline"}
                    size="large"
                    color="primary"
                  />
                </TouchableOpacity>
              )}
            </View>

            <TextThemed
              size="caption"
              color="black"
              font="nunitoRegular"
              numberOfLines={8}
              classes="ml-4 pr-6 w-[65%] text-justify"
            >
              {recipe?.description}
            </TextThemed>
          </View>

          <View className="w-full mt-8">
            <View className="flex-row flex-wrap" style={{ gap: Sizes.tiny }}>
              {recipe?.pancs.map((panc, index) => (
                <View key={index} className="flex-row">
                  <IonIcon name="leaf" size="large" color="primary" />

                  <TextThemed size="body2" color="primary" font="nunitoSemiBold" classes="ml-1">
                    {panc}
                  </TextThemed>
                </View>
              ))}
            </View>
          </View>

          {recipe?.ingredients && (
            <View className="w-full mt-8">
              <ContentSection title="Ingredientes">
                <BulletList items={recipe.ingredients} />
              </ContentSection>
            </View>
          )}

          {recipe?.preparation && (
            <View className="w-full mt-8">
              <ContentSection title="Modo de Preparo">
                <NumberList items={recipe.preparation} />
              </ContentSection>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
