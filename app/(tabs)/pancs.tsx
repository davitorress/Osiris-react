import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { useListPancs } from "@/modules/panc/queries"
import { convertToProductList } from "@/modules/product/hooks"

import IonIcon from "@/components/basic/IonIcon"
import TextThemed from "@/components/themed/TextThemed"
import ProductShowcase from "@/components/blocks/ProductShowcase"

export default function PancsScreen() {
  const { data: pancs } = useListPancs()

  const pancsList = pancs?.map(convertToProductList)

  return (
    <SafeAreaView className="m-0 flex-1">
      <ScrollView>
        <View className="p-6">
          <View className="w-full py-2 px-4 flex-row items-center justify-between border border-gray-medium rounded-full bg-white">
            <TextThemed size="body2" color="grayPrimary" font="nunitoSemiBold">
              Busque por pancs
            </TextThemed>

            <IonIcon name="search" size="semi" color="secondary" />
          </View>

          {/* <View className="w-full mt-8">
            <ProductShowcase title="Itens encontrados" products={showcaseMock} />
          </View> */}

          {pancsList && pancsList.length > 0 && (
            <View className="w-full mt-8">
              <ProductShowcase title="PANCs" products={pancsList} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
