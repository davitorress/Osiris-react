import { useCallback, useState } from "react"
import { ScrollView, View } from "react-native"
import { ImagePickerAsset } from "expo-image-picker"
import { useFocusEffect, useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

import { EditUserData } from "@/components/forms/types"
import { useCurrentUser, useUpdateUser, useUpdateUserImage } from "@/modules/user/queries"

import IonIcon from "@/components/basic/IonIcon"
import EditUserForm from "@/components/forms/EditUserForm"
import ButtonThemed from "@/components/themed/ButtonThemed"
import ChangeImageModal from "@/components/basic/ChangeImageModal"
import ImageWithPlaceholder from "@/components/basic/ImageWithPlaceholder"

export default function EditUserScreen() {
  const router = useRouter()
  const { data: user } = useCurrentUser()

  const updateUser = useUpdateUser()
  const updateUserImage = useUpdateUserImage()

  const [editImage, setEditImage] = useState(false)
  const [image, setImage] = useState<ImagePickerAsset | null>(null)

  const handleUpdateUser = (data: EditUserData) => {
    if (!user?.id) return

    updateUser.mutate(
      { id: user.id, data },
      {
        onSuccess: () => {
          if (image) updateUserImage.mutate({ id: user.id, image })
        },
      }
    )
  }

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

  if (!user) {
    return null
  }

  return (
    <SafeAreaView className="m-o flex-1">
      <ScrollView>
        <View className="pt-6 px-6">
          <View className="w-full">
            <View className="w-fit flex-row absolute top-0 left-0">
              <ButtonThemed type="icon" shape="circle" onClick={() => router.push("/(tabs)/user")}>
                <IonIcon name="return-down-back" size="huge" color="white" />
              </ButtonThemed>
            </View>
          </View>

          <View className="relative self-center w-fit">
            <View className="items-center justify-center w-40 h-40 rounded-full bg-gray-light overflow-hidden">
              {image || user.image ? (
                <ImageWithPlaceholder
                  alt="nome"
                  source={image ? { uri: image.uri } : user.image}
                  className="w-40 h-40 rounded-full"
                />
              ) : (
                <IonIcon name="person-outline" color="primary" size="massive" />
              )}
            </View>

            <View className="absolute bottom-0 right-0">
              <ButtonThemed shape="circle" onClick={() => setEditImage(true)}>
                <IonIcon name="pencil-outline" color="white" size="veryHuge" />
              </ButtonThemed>
            </View>
          </View>

          <View className="w-full mt-8">
            <EditUserForm data={user} onSubmit={handleUpdateUser} />
          </View>

          <ChangeImageModal
            image={image?.uri}
            visible={editImage}
            iconImageName="person-outline"
            onClose={() => setEditImage(false)}
            onConfirm={(image) => setImage(image)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
