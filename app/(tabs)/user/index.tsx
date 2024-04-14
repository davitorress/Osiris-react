import { useCallback } from "react"
import { useRouter } from "expo-router"
import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import Sizes from "@/constants/Sizes"
import IonIcon from "@/components/basic/IonIcon"
import TextThemed from "@/components/themed/TextThemed"
import ButtonThemed from "@/components/themed/ButtonThemed"
import ProductShowcase from "@/components/blocks/ProductShowcase"
import ImageWithPlaceholder from "@/components/basic/ImageWithPlaceholder"

const carouselMock: Array<{
  id: string
  name: string
  image: string
  description?: string | undefined
  type: "panc" | "recipe"
}> = [
  {
    id: "1",
    type: "panc",
    name: "Inhame",
    image:
      "http://res.cloudinary.com/dvxkj7fwq/image/upload/v1699569417/34f93c4d-fc34-4a10-b908-82d67d61d358.png",
  },
  {
    id: "2",
    type: "panc",
    name: "Hibisco",
    image:
      "http://res.cloudinary.com/dvxkj7fwq/image/upload/v1699569732/daf554f5-c4fb-49df-86f5-d81c768f5125.png",
  },
  {
    id: "3",
    type: "panc",
    name: "Ora-pro-nóbis",
    image:
      "http://res.cloudinary.com/dvxkj7fwq/image/upload/v1699569464/35944483-fd41-445d-8434-98a77c2f751a.jpg",
  },
]

const image =
  "http://res.cloudinary.com/dvxkj7fwq/image/upload/v1699569417/34f93c4d-fc34-4a10-b908-82d67d61d358.png"

export default function UserScreen() {
  const router = useRouter()

  const editProfile = useCallback(() => {
    router.push("/(tabs)/user/edit")
  }, [router])

  const handleLogout = useCallback(() => {
    router.push("/")
  }, [router])

  return (
    <SafeAreaView className="m-0 flex-1">
      <ScrollView>
        <View className="pt-6 px-6">
          <View className="relative self-center w-fit">
            <View className="items-center justify-center w-40 h-40 rounded-full bg-gray-light overflow-hidden">
              {image ? (
                <ImageWithPlaceholder
                  alt="nome"
                  source={image}
                  className="w-40 h-40 rounded-full"
                />
              ) : (
                <IonIcon name="person-outline" color="primary" size="massive" />
              )}
            </View>

            <View className="absolute bottom-0 right-0">
              <ButtonThemed shape="circle" onClick={editProfile}>
                <IonIcon name="pencil-outline" color="white" size="veryHuge" />
              </ButtonThemed>
            </View>
          </View>

          <View className="w-full mt-8">
            <TextThemed size="h1" color="black" font="nunitoBold">
              João da Silva
            </TextThemed>

            <View className="mt-1 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <IonIcon name="mail-outline" color="primary" size="large" />

                <TextThemed size="body1" color="black" font="nunitoRegular" classes="ml-2">
                  joao@gmail.com
                </TextThemed>
              </View>

              <ButtonThemed onClick={handleLogout}>
                <TextThemed size="body1" color="white" font="nunitoSemiBold" classes="mr-2">
                  Sair
                </TextThemed>

                <IonIcon name="exit-outline" color="white" size="large" />
              </ButtonThemed>
            </View>
          </View>

          <View className="w-full mt-8">
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
                  Assinar agora
                </TextThemed>
              </ButtonThemed>

              <TextThemed size="caption" numberOfLines={100} classes="italic">
                Você será redirecionado para uma plataforma externa de pagamentos.
              </TextThemed>
            </View>
          </View>

          <View className="w-full mt-8">
            <ProductShowcase title="PANCs favoritas" products={carouselMock} horizontal />
          </View>

          <View className="w-full mt-8">
            <ProductShowcase title="Receitas salvas" products={carouselMock} horizontal />
          </View>

          <View className="w-full mt-8">
            <ProductShowcase title="Suas receitas" products={carouselMock} horizontal />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
