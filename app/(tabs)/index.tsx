import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { useListPancs } from "@/modules/panc/queries"
import { convertToProductCarousel } from "@/modules/product/hooks"

import IonIcon from "@/components/basic/IonIcon"
import TextThemed from "@/components/themed/TextThemed"
import ProductShowcase from "@/components/blocks/ProductShowcase"

export default function HomeScreen() {
  const { data: pancs } = useListPancs()

  const carouselPancs = pancs?.map((panc) => convertToProductCarousel(panc))

  return (
    <SafeAreaView className="m-0 flex-1 bg-white">
      <ScrollView>
        <View className="pt-6 px-6">
          <View className="w-full py-2 px-4 flex-row items-center justify-between border border-gray-medium rounded-full bg-white">
            <TextThemed size="body2" color="grayPrimary" font="nunitoSemiBold">
              Busque por plantas ou receitas
            </TextThemed>

            <IonIcon name="search" size="semi" color="secondary" />
          </View>

          {/* <View className="w-full mt-8">
            <ProductShowcase title="Itens encontrados" products={pancs} />
          </View> */}

          {carouselPancs && carouselPancs.length > 0 && (
            <View className="w-full mt-8">
              <ProductShowcase title="PANCs" products={carouselPancs} horizontal />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
