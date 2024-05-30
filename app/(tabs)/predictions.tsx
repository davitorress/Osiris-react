import { useRouter } from "expo-router"
import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { useGetUserPredictions } from "@/modules/prediction/queries"

import IonIcon from "@/components/basic/IonIcon"
import TextThemed from "@/components/themed/TextThemed"
import ButtonThemed from "@/components/themed/ButtonThemed"
import LoadingScreen from "@/components/basic/LoadingScreen"
import PredictionCard from "@/components/basic/PredictionCard"

export default function PredictionsScreen() {
  const router = useRouter()
  const { data, isLoading } = useGetUserPredictions()

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <SafeAreaView className="m-0 flex-1">
      <ScrollView>
        <View className="p-6">
          <View className="flex-row items-start">
            <ButtonThemed
              type="icon"
              size="fit"
              shape="circle"
              color="primary"
              onClick={() => router.back()}
            >
              <IonIcon name="return-down-back" size="huge" color="white" />
            </ButtonThemed>

            <TextThemed
              size="h2"
              color="black"
              font="nunitoBold"
              numberOfLines={100}
              classes="ml-4"
            >
              Suas análises
            </TextThemed>
          </View>

          <View className="w-full mt-8">
            {data?.map((prediction, index) => (
              <View key={prediction.id} className={index !== 0 ? "mt-4" : ""}>
                <PredictionCard prediction={prediction} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
