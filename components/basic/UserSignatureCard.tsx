import { View } from "react-native"
import { useCallback, useMemo } from "react"

import useTranslationStore, { SUPPORTED_LOCALES } from "@/storage/translation"

import Sizes from "@/constants/Sizes"
import IonIcon from "@/components/basic/IonIcon"
import TextThemed from "@/components/themed/TextThemed"
import ButtonThemed from "@/components/themed/ButtonThemed"

import { UserSignature } from "@/modules/user/types"
import { useActivateSignature } from "@/modules/user/queries"

interface UserSignatureProps {
  signature: UserSignature
}

export default function UserSignatureCard({ signature }: UserSignatureProps) {
  const activateSignature = useActivateSignature()
  const locale = useTranslationStore((state) => state.locale)
  const translate = useTranslationStore((state) => state.actions.translate)

  const signaturePrice = useMemo(() => {
    const defaultPrice = 29.99

    return defaultPrice.toLocaleString(SUPPORTED_LOCALES[locale].flag, {
      style: "currency",
      currency: SUPPORTED_LOCALES[locale].currency,
    })
  }, [locale])

  const handleActivateSignature = useCallback(() => {
    activateSignature.mutate()
  }, [activateSignature])

  return (
    <View className="py-5 px-6 rounded-lg bg-gray-light" style={{ gap: Sizes.medium }}>
      <TextThemed size="h3" font="nunitoSemiBold">
        {translate("general.premiumSignature")}
      </TextThemed>

      <View className="flex-row items-center">
        <IonIcon name="star" color="primary" size="large" />

        <TextThemed color="primary" font="nunitoSemiBold" classes="ml-2">
          {translate("general.unlimitedPhotos")}
        </TextThemed>
      </View>

      {!signature.ativa && (
        <View className="flex-row items-center" style={{ gap: Sizes.micro }}>
          <TextThemed>{translate("general.signaturePrice1")}</TextThemed>
          <TextThemed color="tertiary" font="nunitoBold">
            {signaturePrice}
          </TextThemed>
          <TextThemed>{translate("general.signaturePrice2")}</TextThemed>
        </View>
      )}

      {signature.ativa ? (
        <ButtonThemed size="full" color="grayPrimary">
          <TextThemed color="primary" font="nunitoSemiBold" classes="mr-2">
            {translate("general.signatureActive")}
          </TextThemed>

          <IonIcon name="checkmark-circle-outline" size="semi" />
        </ButtonThemed>
      ) : (
        <ButtonThemed size="full" onClick={handleActivateSignature}>
          <TextThemed color="white" font="nunitoSemiBold">
            {translate("actions.activateSignature")}
          </TextThemed>
        </ButtonThemed>
      )}

      {!signature.ativa && (
        <TextThemed size="caption" numberOfLines={100} classes="italic">
          {translate("general.paymentRedirect")}
        </TextThemed>
      )}
    </View>
  )
}
