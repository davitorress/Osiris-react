import { View } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

import useTranslationStore from "@/storage/translation"

import TextThemed from "@/components/themed/TextThemed"
import ButtonThemed from "@/components/themed/ButtonThemed"
import ImageWithPlaceholder from "@/components/basic/ImageWithPlaceholder"

const WelcomeScreen = () => {
  const router = useRouter()
  const translate = useTranslationStore((state) => state.actions.translate)

  return (
    <SafeAreaView className="p-0 m-0 flex flex-1 justify-between items-center bg-green-medium">
      <ImageWithPlaceholder
        alt="Osiris"
        className="w-60 h-60 mt-28"
        source={require("../assets/images/osiris_logo_named_white.png")}
      />

      <View className="w-screen pt-10 pb-16 px-5 bg-white rounded-t-2xl">
        <TextThemed font="nunitoBold" color="primary" size="h3" classes="mb-6">
          {translate("general.welcome")}
        </TextThemed>

        <ButtonThemed
          color="primary"
          size="full"
          classes="mb-4"
          onClick={() => router.navigate("/login")}
        >
          <TextThemed color="white" font="nunitoSemiBold">
            {translate("actions.login")}
          </TextThemed>
        </ButtonThemed>

        <ButtonThemed
          color="graySecondary"
          size="full"
          onClick={() => router.navigate("/register")}
        >
          <TextThemed color="primary" font="nunitoSemiBold">
            {translate("actions.register")}
          </TextThemed>
        </ButtonThemed>
      </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen
