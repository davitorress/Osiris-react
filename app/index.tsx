import { View } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

import ImageWithPlaceholder from "@/components/ImageWithPlaceholder"
import ButtonThemed from "@/components/ButtonThemed"
import TextThemed from "@/components/TextThemed"

const WelcomeScreen = () => {
  const router = useRouter()

  return (
    <SafeAreaView className="p-0 m-0 flex flex-1 justify-between items-center bg-green-medium">
      <ImageWithPlaceholder
        alt="Osiris"
        className="w-60 h-60 mt-28"
        source={require("../assets/images/osiris_logo_named_white.png")}
      />

      <View className="w-screen pt-10 pb-16 px-5 bg-white rounded-t-2xl rounded-r-2xl">
        <TextThemed font="nunitoBold" color="primary" size="h3" classes="mb-6">
          Seja bem-vindo(a) ao Osiris!
        </TextThemed>

        <ButtonThemed
          color="primary"
          size="full"
          classes="mb-4"
          onClick={() => router.navigate("/login")}
        >
          <TextThemed color="white" font="nunitoSemiBold">
            Realizar login
          </TextThemed>
        </ButtonThemed>

        <ButtonThemed
          color="graySecondary"
          size="full"
          onClick={() => router.navigate("/register")}
        >
          <TextThemed color="primary" font="nunitoSemiBold">
            Criar uma conta
          </TextThemed>
        </ButtonThemed>
      </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen
