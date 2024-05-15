import { useRouter } from "expo-router"
import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import IonIcon from "@/components/basic/IonIcon"
import RecipeForm from "@/components/forms/RecipeForm"
import ButtonThemed from "@/components/themed/ButtonThemed"

export default function NewRecipesPage() {
  const router = useRouter()

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
              <IonIcon name="restaurant-outline" color="primary" size="massive" />
            </View>

            <View className="absolute bottom-0 right-0">
              <ButtonThemed shape="circle" onClick={undefined}>
                <IonIcon name="pencil-outline" color="white" size="veryHuge" />
              </ButtonThemed>
            </View>
          </View>

          <View className="w-full mt-8">
            <RecipeForm onSubmit={(data) => console.log(data)} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
