import { SafeAreaView } from "react-native-safe-area-context"

import TextThemed from "@/components/themed/TextThemed"

export default function HomeScreen() {
  return (
    <SafeAreaView className="m-0 flex-1 bg-white">
      <TextThemed color="primary" size="h1" font="nunitoBold" classes="text-center">
        Home
      </TextThemed>
    </SafeAreaView>
  )
}
