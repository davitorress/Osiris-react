import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { useLogin } from "@/modules/user/queries"
import { LoginData } from "@/components/forms/types"

import LoginForm from "@/components/forms/LoginForm"
import ImageWithPlaceholder from "@/components/basic/ImageWithPlaceholder"

export default function LoginScreen() {
  const login = useLogin()

  const handleSubmit = (data: LoginData) => {
    login.mutate(data)
  }

  return (
    <SafeAreaView className="m-0 pt-28 px-6 flex-1 items-center bg-white">
      <ImageWithPlaceholder
        alt="Osiris"
        className="w-20 h-20"
        source={require("../assets/images/osiris_logo.png")}
      />

      <View className="w-full mt-12 px-4">
        <LoginForm onSubmit={handleSubmit} />
      </View>
    </SafeAreaView>
  )
}
