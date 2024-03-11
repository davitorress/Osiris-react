import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import ImageWithPlaceholder from "@/components/ImageWithPlaceholder"
import RegisterForm from "@/components/forms/RegisterForm"

export default function RegisterScreen() {
  return (
    <SafeAreaView className="m-0 flex-1 bg-white">
      <ScrollView>
        <View className="pt-28 pb-12 px-6 items-center">
          <ImageWithPlaceholder
            alt="Osiris"
            className="w-20 h-20"
            source={require("../assets/images/osiris_logo.png")}
          />

          <View className="w-full mt-12 px-4">
            <RegisterForm />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
