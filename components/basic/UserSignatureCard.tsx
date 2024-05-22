import { View } from "react-native"

import Sizes from "@/constants/Sizes"
import IonIcon from "@/components/basic/IonIcon"
import TextThemed from "@/components/themed/TextThemed"
import ButtonThemed from "@/components/themed/ButtonThemed"
import { UserSignature } from "@/modules/user/types"

interface UserSignatureProps {
  signature: UserSignature
}

export default function UserSignatureCard({ signature }: UserSignatureProps) {
  return (
    <View className="py-5 px-6 rounded-lg bg-gray-light" style={{ gap: Sizes.medium }}>
      <TextThemed size="h3" font="nunitoSemiBold">
        Assinatura premium
      </TextThemed>

      <View className="flex-row items-center">
        <IonIcon name="star" color="primary" size="large" />

        <TextThemed color="primary" font="nunitoSemiBold" classes="ml-2">
          Número ilimitado de fotos
        </TextThemed>
      </View>

      <View className="flex-row items-center" style={{ gap: Sizes.micro }}>
        <TextThemed>Por apenas</TextThemed>
        <TextThemed color="tertiary" font="nunitoBold">
          R$29,99
        </TextThemed>
        <TextThemed>ao mês</TextThemed>
      </View>

      <ButtonThemed size="full">
        <TextThemed color="white" font="nunitoSemiBold">
          {signature.ativa ? "Assinatura ativa" : "Assinar agora"}
        </TextThemed>
      </ButtonThemed>

      <TextThemed size="caption" numberOfLines={100} classes="italic">
        Você será redirecionado para uma plataforma externa de pagamentos.
      </TextThemed>
    </View>
  )
}