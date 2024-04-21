import { useRouter } from "expo-router"
import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import IonIcon from "@/components/basic/IonIcon"
import EditUserForm from "@/components/forms/EditUserForm"
import ButtonThemed from "@/components/themed/ButtonThemed"
import ImageWithPlaceholder from "@/components/basic/ImageWithPlaceholder"

export default function EditUserScreen() {
  const router = useRouter()

  const image =
    "http://res.cloudinary.com/dvxkj7fwq/image/upload/v1699569417/34f93c4d-fc34-4a10-b908-82d67d61d358.png"

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
              {image ? (
                <ImageWithPlaceholder
                  alt="nome"
                  source={image}
                  className="w-40 h-40 rounded-full"
                />
              ) : (
                <IonIcon name="person-outline" color="primary" size="massive" />
              )}
            </View>

            <View className="absolute bottom-0 right-0">
              <ButtonThemed shape="circle" onClick={undefined}>
                <IonIcon name="pencil-outline" color="white" size="veryHuge" />
              </ButtonThemed>
            </View>
          </View>

          <View className="w-full mt-8">
            <EditUserForm onSubmit={() => {}} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
