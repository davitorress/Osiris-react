import { useCallback, useState } from "react"
import { ScrollView, View } from "react-native"
import { ImagePickerAsset } from "expo-image-picker"
import { SafeAreaView } from "react-native-safe-area-context"
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router"

import { RecipeData } from "@/components/forms/types"
import {
  useDeleteRecipe,
  useGetRecipe,
  useUpdateRecipe,
  useUpdateRecipeImage,
} from "@/modules/recipe/queries"

import IonIcon from "@/components/basic/IonIcon"
import RecipeForm from "@/components/forms/RecipeForm"
import ButtonThemed from "@/components/themed/ButtonThemed"
import LoadingScreen from "@/components/basic/LoadingScreen"
import ChangeImageModal from "@/components/basic/ChangeImageModal"
import ImageWithPlaceholder from "@/components/basic/ImageWithPlaceholder"

export default function EditRecipeScreen() {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()

  if (!id) {
    router.back()
  }

  const deleteRecipe = useDeleteRecipe()
  const updateRecipe = useUpdateRecipe()
  const updateRecipeImage = useUpdateRecipeImage()
  const { data: recipe, isLoading } = useGetRecipe(id as string)

  const [editImage, setEditImage] = useState(false)
  const [image, setImage] = useState<ImagePickerAsset | null>(null)

  const handleUpdateRecipe = (data: RecipeData) => {
    if (!id || !recipe) {
      return
    }

    const recipeData = {
      ...data,
      id: id as string,
      author: recipe.author,
    }

    updateRecipe.mutate(recipeData, {
      onSuccess: () => {
        if (image) {
          updateRecipeImage.mutateAsync(
            { id, image },
            {
              onSuccess: () => router.push(`/(tabs)/recipe/${id}/`),
            }
          )
        }
        router.push(`/(tabs)/recipe/${id}/`)
      },
    })
  }

  const handleCancel = useCallback(() => {
    deleteRecipe.mutate(id as string, {
      onSuccess: () => {
        router.push("/(tabs)/recipes/")
      },
    })
  }, [id])

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

  if (!recipe && !isLoading) {
    router.back()
  }

  if (!recipe || isLoading) {
    return <LoadingScreen />
  }

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
              {image || recipe.image ? (
                <ImageWithPlaceholder
                  alt="nome"
                  source={image ? { uri: image.uri } : recipe.image}
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
            <RecipeForm data={recipe} onSubmit={handleUpdateRecipe} onCancel={handleCancel} />
          </View>

          <ChangeImageModal
            visible={editImage}
            image={image?.uri ?? recipe.image}
            iconImageName="restaurant-outline"
            onClose={() => setEditImage(false)}
            onConfirm={(image) => setImage(image)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
