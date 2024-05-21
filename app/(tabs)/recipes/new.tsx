import { useState } from "react"
import { useRouter } from "expo-router"
import { ScrollView, View } from "react-native"
import { ImagePickerAsset } from "expo-image-picker"
import { SafeAreaView } from "react-native-safe-area-context"

import useUserStore from "@/storage/user"
import { RecipeData } from "@/components/forms/types"
import { useCreateRecipe, useUpdateRecipeImage } from "@/modules/recipe/queries"

import IonIcon from "@/components/basic/IonIcon"
import RecipeForm from "@/components/forms/RecipeForm"
import ButtonThemed from "@/components/themed/ButtonThemed"
import ChangeImageModal from "@/components/basic/ChangeImageModal"
import ImageWithPlaceholder from "@/components/basic/ImageWithPlaceholder"

export default function NewRecipesPage() {
  const { id } = useUserStore()
  const createRecipe = useCreateRecipe()
  const updateRecipeImage = useUpdateRecipeImage()

  const router = useRouter()
  const [editImage, setEditImage] = useState(false)
  const [image, setImage] = useState<ImagePickerAsset | null>(null)

  const handleCreateRecipe = (data: RecipeData) => {
    if (!id || !image) {
      console.error("Defina uma imagem antes de criar uma receita!")
      return
    }

    const recipeData = {
      ...data,
      author: id as string,
    }

    createRecipe.mutate(recipeData, {
      onSuccess: (recipe) => {
        console.log("Receita criada com sucesso!", recipe.id)
        updateRecipeImage.mutateAsync(
          { id: recipe.id, image },
          {
            onSuccess: () => router.push("/(tabs)/recipes"),
          }
        )
      },
    })
  }

  return (
    <SafeAreaView className="m-0 flex-1">
      <ScrollView>
        <View className="p-6">
          <View className="w-full">
            <View className="w-fit flex-row absolute top-0 left-0">
              <ButtonThemed
                type="icon"
                shape="circle"
                onClick={() => router.push("/(tabs)/recipes")}
              >
                <IonIcon name="return-down-back" size="huge" color="white" />
              </ButtonThemed>
            </View>
          </View>

          <View className="relative self-center w-fit">
            <View className="items-center justify-center w-40 h-40 rounded-full bg-gray-light overflow-hidden">
              {image ? (
                <ImageWithPlaceholder
                  alt="nome"
                  source={{ uri: image.uri }}
                  className="w-40 h-40 rounded-full"
                />
              ) : (
                <IonIcon name="restaurant-outline" color="primary" size="massive" />
              )}
            </View>

            <View className="absolute bottom-0 right-0">
              <ButtonThemed shape="circle" onClick={() => setEditImage(true)}>
                <IonIcon name="pencil-outline" color="white" size="veryHuge" />
              </ButtonThemed>
            </View>
          </View>

          <View className="w-full mt-8">
            <RecipeForm onSubmit={handleCreateRecipe} />
          </View>

          <ChangeImageModal
            image={image?.uri}
            visible={editImage}
            iconImageName="restaurant-outline"
            onClose={() => setEditImage(false)}
            onConfirm={(image) => setImage(image)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
