import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import LoginForm from "@/components/forms/LoginForm"
import ImageWithPlaceholder from "@/components/basic/ImageWithPlaceholder"

export default function LoginScreen() {
  return (
    <SafeAreaView className="m-0 pt-28 px-6 flex-1 items-center bg-white">
      <ImageWithPlaceholder
        alt="Osiris"
        className="w-20 h-20"
        source={require("../assets/images/osiris_logo.png")}
      />

      <View className="w-full mt-12 px-4">
        <LoginForm />
      </View>
    </SafeAreaView>
  )
}
