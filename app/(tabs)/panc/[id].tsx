import { Image } from "expo-image"
import { useLocalSearchParams, useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, TouchableOpacity, View } from "react-native"

import usePancStore from "@/storage/panc"
import useTranslationStore from "@/storage/translation"
import {
  useAddPancToFavorites,
  useGetPanc,
  useRemovePancFromFavorites,
} from "@/modules/panc/queries"

import IonIcon from "@/components/basic/IonIcon"
import BulletList from "@/components/lists/BulletList"
import TextThemed from "@/components/themed/TextThemed"
import ButtonThemed from "@/components/themed/ButtonThemed"
import LoadingScreen from "@/components/basic/LoadingScreen"
import ContentSection from "@/components/blocks/ContentSection"

export default function PancPage() {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()

  if (!id) {
    router.back()
  }

  const addToFavorites = useAddPancToFavorites()
  const removeFromFavorites = useRemovePancFromFavorites()
  const { data: panc, isLoading } = useGetPanc(id as string)
  const translate = useTranslationStore((state) => state.actions.translate)
  const getIsFavorite = usePancStore((state) => state.actions.getIsFavorite)

  const handleAddToFavorites = () => {
    addToFavorites.mutate(id as string)
  }

  const handleRemoveFromFavorites = () => {
    removeFromFavorites.mutate(id as string)
  }

  if (!panc && !isLoading) {
    router.back()
  }

  if (isLoading || !panc) {
    return <LoadingScreen />
  }

  return (
    <SafeAreaView className="m-0 pb-10 flex-1 bg-white">
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
              {panc.name}
            </TextThemed>
          </View>

          <View className="w-full mt-8 flex-row">
            <View>
              <Image className="w-32 h-[132px] rounded-md" source={panc.image} />

              <TouchableOpacity
                className="mt-2 flex-row items-center"
                onPress={getIsFavorite(panc.id) ? handleRemoveFromFavorites : handleAddToFavorites}
              >
                <TextThemed size="body2" color="primary" font="nunitoSemiBold" classes="mr-2">
                  {getIsFavorite(panc.id) ? "Favorito" : "Favoritar"}
                </TextThemed>

                <IonIcon
                  name={getIsFavorite(panc.id) ? "heart" : "heart-outline"}
                  size="large"
                  color="primary"
                />
              </TouchableOpacity>
            </View>

            <TextThemed
              size="caption"
              color="black"
              font="nunitoRegular"
              numberOfLines={8}
              classes="ml-4 pr-6 w-[65%] text-justify"
            >
              {panc.description}
            </TextThemed>
          </View>

          <View className="w-full mt-8">
            <ContentSection title={translate("general.benefits")}>
              <TextThemed
                size="caption"
                color="black"
                font="nunitoRegular"
                numberOfLines={100}
                classes="text-justify"
              >
                {panc.benefits}
              </TextThemed>
            </ContentSection>
          </View>

          <View className="w-full mt-8">
            <ContentSection title={translate("general.cultivations")}>
              <BulletList items={panc.cultivation} />
            </ContentSection>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
