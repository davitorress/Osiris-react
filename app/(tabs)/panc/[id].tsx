import { Image } from "expo-image"
import { useLocalSearchParams, useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, TouchableOpacity, View } from "react-native"

import usePancStore from "@/storage/panc"
import { useGetPanc } from "@/modules/panc/queries"

import IonIcon from "@/components/basic/IonIcon"
import TextThemed from "@/components/themed/TextThemed"
import ButtonThemed from "@/components/themed/ButtonThemed"
import ContentSection from "@/components/blocks/ContentSection"

export default function PancPage() {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()

  if (!id) {
    router.back()
  }

  const { data: panc } = useGetPanc(id as string)
  const {
    actions: { getIsFavorite },
  } = usePancStore()

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
              {panc?.name}
            </TextThemed>
          </View>

          <View className="w-full mt-8 flex-row">
            <View>
              <Image className="w-32 h-[132px] rounded-md" source={panc?.image} />

              {panc?.id && (
                <TouchableOpacity className="mt-2 flex-row items-center">
                  <TextThemed size="body2" color="primary" font="nunitoSemiBold" classes="mr-2">
                    {getIsFavorite(panc.id) ? "Favorito" : "Favoritar"}
                  </TextThemed>

                  <IonIcon
                    name={getIsFavorite(panc.id) ? "heart" : "heart-outline"}
                    size="large"
                    color="primary"
                  />
                </TouchableOpacity>
              )}
            </View>

            <TextThemed
              size="caption"
              color="black"
              font="nunitoRegular"
              numberOfLines={7}
              classes="ml-4 pr-6 w-[65%]"
            >
              {panc?.description}
            </TextThemed>
          </View>

          <View className="w-full mt-8">
            <ContentSection title="Benefícios">
              <TextThemed size="caption" color="black" font="nunitoRegular" numberOfLines={100}>
                {panc?.benefits}
              </TextThemed>
            </ContentSection>
          </View>

          <View className="w-full mt-8">
            <ContentSection title="Modo de Cultivo">
              {panc?.cultivation.map((item, index) => (
                <TextThemed
                  key={index}
                  size="caption"
                  color="black"
                  font="nunitoRegular"
                  numberOfLines={100}
                >
                  {item}
                </TextThemed>
              ))}
            </ContentSection>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
