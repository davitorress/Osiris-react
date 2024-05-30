import { useCallback, useState } from "react"
import Toast from "react-native-toast-message"
import { ScrollView, View } from "react-native"
import { ImagePickerAsset } from "expo-image-picker"
import { useFocusEffect, useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

import useUserStore from "@/storage/user"
import { RecipeData } from "@/components/forms/types"
import { useCreateRecipe, useDeleteRecipe, useUpdateRecipeImage } from "@/modules/recipe/queries"

import IonIcon from "@/components/basic/IonIcon"
import RecipeForm from "@/components/forms/RecipeForm"
import ButtonThemed from "@/components/themed/ButtonThemed"
import ChangeImageModal from "@/components/basic/ChangeImageModal"
import ImageWithPlaceholder from "@/components/basic/ImageWithPlaceholder"

export default function NewRecipesPage() {
  const { id } = useUserStore()
  const deleteRecipe = useDeleteRecipe()
  const createRecipe = useCreateRecipe()
  const updateRecipeImage = useUpdateRecipeImage()

  const router = useRouter()
  const [editImage, setEditImage] = useState(false)
  const [image, setImage] = useState<ImagePickerAsset | null>(null)

  const handleCreateRecipe = (data: RecipeData) => {
    if (!id || !image) {
      Toast.show({
        type: "error",
        text1: "Erro ao criar a receita!",
        text2: "Por favor, preencha todos os campos e adicione uma imagem.",
      })
      return
    }

    const recipeData = {
      ...data,
      author: id as string,
    }

    createRecipe.mutate(recipeData, {
      onSuccess: (recipe) => {
        updateRecipeImage.mutateAsync(
          { id: recipe.id, image },
          {
            onSuccess: () => router.push("/(tabs)/recipes"),
            onError: () => {
              deleteRecipe.mutate(id)
            },
          }
        )
      },
    })
  }

  const handleCancel = useCallback(() => {
    router.push("/(tabs)/recipes")
  }, [])

  useFocusEffect(
    useCallback(() => {
      setImage(null)
      setEditImage(false)

      return () => {
        setImage(null)
        setEditImage(false)
      }
    }, [setImage, setEditImage])
  )

  return (
    <SafeAreaView className="m-0 flex-1">
      <ScrollView>
        <View className="p-6">
          <View className="w-full">
            <View className="w-fit flex-row absolute top-0 left-0">
              <ButtonThemed type="icon" shape="circle" onClick={() => router.back()}>
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
            <RecipeForm onSubmit={handleCreateRecipe} onCancel={handleCancel} />
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
