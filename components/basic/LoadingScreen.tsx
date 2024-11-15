import { SafeAreaView } from "react-native-safe-area-context"

import LoadingSpinner from "@/components/basic/LoadingSpinner"

export default function LoadingScreen() {
  return (
    <SafeAreaView className="flex-1 m-0 pb-10 items-center justify-center bg-white">
      <LoadingSpinner size={48} color="primary" />
    </SafeAreaView>
  )
}
