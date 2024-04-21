import { Image } from "expo-image"
import { useLocalSearchParams, useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, TouchableOpacity, View } from "react-native"

import Sizes from "@/constants/Sizes"
import IonIcon from "@/components/basic/IonIcon"
import BulletList from "@/components/lists/BulletList"
import NumberList from "@/components/lists/NumberList"
import TextThemed from "@/components/themed/TextThemed"
import ButtonThemed from "@/components/themed/ButtonThemed"
import ContentSection from "@/components/blocks/ContentSection"

export default function RecipePage() {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()

  if (!id) {
    router.back()
  }

  const pancs = ["Hibisco", "Ora-pro-nóbis", "Caruru", "Taioba"]

  const ingredientes = [
    "Flores de hibisco frescas",
    "Folhas de alface",
    "Tomates-cereja",
    "Pepino",
    "Molho de azeite, limão e mel",
    "Sal e pimenta a gosto",
  ]

  const preparo = [
    "Lave bem as flores de hibisco e as folhas de alface.",
    "Corte os tomates-cereja ao meio e o pepino em rodelas.",
    "Em uma tigela, misture as flores de hibisco, as folhas de alface, os tomates e o pepino.",
    "Prepare o molho misturando azeite, limão, mel, sal e pimenta.",
    "Regue a salada com o molho e misture bem.",
    "Sirva a salada como acompanhamento ou prato principal.",
    "Aproveite essa opção leve e colorida!",
  ]

  return (
    <SafeAreaView className="m-0 flex-1">
      <ScrollView>
        <View className="pt-6 px-6">
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
              Salada Refrescante de Hibisco
            </TextThemed>
          </View>

          <View className="w-full mt-8 flex-row">
            <View>
              <Image
                className="w-32 h-[132px] rounded-md"
                source="http://res.cloudinary.com/dvxkj7fwq/image/upload/v1699571051/2fd13bc1-3e3f-4ed3-96e6-535935a06e67.jpg"
              />

              <TouchableOpacity className="mt-2 flex-row items-center">
                <TextThemed size="body2" color="primary" font="nunitoSemiBold" classes="mr-2">
                  Salvar
                </TextThemed>

                <IonIcon name="bookmark-outline" size="large" color="primary" />
              </TouchableOpacity>
            </View>

            <TextThemed
              size="caption"
              color="black"
              font="nunitoRegular"
              numberOfLines={7}
              classes="ml-4 w-[65%]"
            >
              Uma salada leve e refrescante que combina flores frescas de hibisco com alface,
              tomates-cereja e pepino. Regada com um molho especial de azeite, limão e mel, esta
              salada é uma explosão de sabores e cores. Ideal como acompanhamento ou prato principal
              para uma refeição leve.
            </TextThemed>
          </View>

          <View className="w-full mt-8">
            <View className="flex-row flex-wrap" style={{ gap: Sizes.tiny }}>
              {pancs.map((panc, index) => (
                <View key={index} className="flex-row">
                  <IonIcon name="leaf" size="large" color="primary" />

                  <TextThemed size="body2" color="primary" font="nunitoSemiBold" classes="ml-1">
                    {panc}
                  </TextThemed>
                </View>
              ))}
            </View>
          </View>

          <View className="w-full mt-8">
            <ContentSection title="Ingredientes">
              <BulletList items={ingredientes} />
            </ContentSection>
          </View>

          <View className="w-full mt-8">
            <ContentSection title="Modo de Preparo">
              <NumberList items={preparo} />
            </ContentSection>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
