import { useMemo } from "react"
import { Image } from "expo-image"
import { View } from "react-native"
import { twMerge } from "tailwind-merge"

import { NormalizedPrediction } from "@/modules/prediction/types"

import Sizes from "@/constants/Sizes"
import TextThemed from "@/components/themed/TextThemed"

interface PredictionCardProps {
  prediction: NormalizedPrediction
}

export default function PredictionCard({ prediction }: PredictionCardProps) {
  const formattedDate = useMemo(() => {
    const formatted = prediction.date.toLocaleString("pt-br", {
      dateStyle: "short",
      timeStyle: "short",
    })

    return formatted
  }, [prediction.date])

  const cardColor = useMemo(() => {
    if (prediction.accuracy >= 70) {
      return {
        border: "border-green-medium",
        text: "primary",
      }
    } else {
      return {
        border: "border-red-500",
        text: "error",
      }
    }
  }, [prediction])

  return (
    <View
      className={twMerge(
        cardColor.border,
        "w-full py-5 px-4 rounded-lg bg-gray-light flex-row border-2"
      )}
      style={{ gap: Sizes.semi }}
    >
      <Image source={prediction.image} className="w-24 h-24 rounded-lg" />

      <View>
        <TextThemed size="h4" font="nunitoSemiBold">
          {prediction.classification}
        </TextThemed>

        <TextThemed color={cardColor.text as any} font="ubuntuRegular">
          Resultado: {prediction.accuracy >= 70 ? "Provável" : "Improvável"}
        </TextThemed>

        <TextThemed>Data: {formattedDate}</TextThemed>

        <TextThemed>Status: {prediction.status}</TextThemed>
      </View>
    </View>
  )
}
