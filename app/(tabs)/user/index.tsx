import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

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

export default function UserScreen() {
  const image =
    "http://res.cloudinary.com/dvxkj7fwq/image/upload/v1699569417/34f93c4d-fc34-4a10-b908-82d67d61d358.png"

  return (
    <SafeAreaView className="m-0 flex-1">
      <ScrollView>
        <View className="pt-6 px-6">
          {/* Profile info */}
          <View className="justify-center">
            <View className="items-center justify-center size-48 rounded-full bg-gray-light overflow-hidden">
              {image ? (
                <ImageWithPlaceholder alt="nome" className="size-48 rounded-full" source={image} />
              ) : (
                <IonIcon name="person-outline" color="primary" size="massive" />
              )}
            </View>
          </View>

          <View className="w-full mt-8">
            <TextThemed size="h1" color="black" font="nunitoRegular">
              João da Silva
            </TextThemed>

            <View className="mt-4 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <IonIcon name="mail-outline" color="primary" size="medium" />

                <TextThemed size="body2" color="black" font="nunitoRegular" classes="ml-2">
                  joao@gmail.com
                </TextThemed>
              </View>

              <ButtonThemed>
                <TextThemed size="body2" color="white" font="nunitoSemiBold" classes="mr-2">
                  Sair
                </TextThemed>

                <IonIcon name="exit-outline" color="white" size="medium" />
              </ButtonThemed>
            </View>
          </View>

          {/* Subscription */}

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
