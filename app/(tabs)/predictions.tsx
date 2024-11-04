import { useRouter } from "expo-router"
import { useCallback, useMemo, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, TouchableOpacity, View } from "react-native"

import { useGetUserPredictions } from "@/modules/prediction/queries"

import mergeSort from "@/utils/mergeSort"

import IonIcon from "@/components/basic/IonIcon"
import TextThemed from "@/components/themed/TextThemed"
import ButtonThemed from "@/components/themed/ButtonThemed"
import LoadingScreen from "@/components/basic/LoadingScreen"
import PredictionCard from "@/components/basic/PredictionCard"

export default function PredictionsScreen() {
  const router = useRouter()
  const { data, isLoading } = useGetUserPredictions()
  const [ascendingDate, setAscendingDate] = useState<boolean>(false)

  const sortedData = useMemo(() => {
    if (!data) {
      return []
    }

    return mergeSort(data, "date", ascendingDate)
  }, [data, ascendingDate])

  const handleSortByDate = useCallback(() => {
    setAscendingDate(!ascendingDate)
  }, [ascendingDate])

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

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleSortByDate}
            className="w-full mt-8 flex-row items-center justify-start py-2 px-4 bg-gray-100 rounded-lg"
          >
            <TextThemed size="body1" color="black" font="nunitoSemiBold" classes="mr-2">
              Ordenar por: Data ({ascendingDate ? "crescente" : "decrescente"})
            </TextThemed>

            <IonIcon
              name={ascendingDate ? "trending-up-outline" : "trending-down-outline"}
              size="medium"
              color="black"
            />
          </TouchableOpacity>

          <View className="w-full mt-8">
            {sortedData?.map((prediction, index) => (
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
