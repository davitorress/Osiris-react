import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import IonIcon from "@/components/basic/IonIcon"
import TextThemed from "@/components/themed/TextThemed"
import ButtonThemed from "@/components/themed/ButtonThemed"
import ProductShowcase from "@/components/blocks/ProductShowcase"

const showcaseMock: Array<{
  id: string
  name: string
  image: string
  description?: string | undefined
  type: "panc" | "recipe"
}> = [
  {
    id: "1",
    type: "recipe",
    name: "Salada Refrescante de Hibisco",
    description:
      "Uma salada leve e refrescante que combina flores frescas de hibisco com alface, tomates-cereja e pepino. Regada com um molho especial de azeite, limão e mel, esta salada é uma explosão de sabores e cores. Ideal como acompanhamento ou prato principal para uma refeição leve.",
    image:
      "http://res.cloudinary.com/dvxkj7fwq/image/upload/v1699571051/2fd13bc1-3e3f-4ed3-96e6-535935a06e67.jpg",
  },
  {
    id: "2",
    type: "recipe",
    name: "Omelete de Ora-pro-nóbis",
    description:
      "Uma omelete nutritiva preparada com folhas de ora-pro-nobis, ovos, queijo ralado, tomate e cebola. As folhas são refogadas até ficarem macias, adicionadas aos ovos batidos e cozidas até obter uma omelete dourada. Uma opção saborosa e rica em nutrientes para qualquer refeição.",
    image:
      "http://res.cloudinary.com/dvxkj7fwq/image/upload/v1699571227/830a3569-6020-4d1e-8898-749574bbfdb9.jpg",
  },
  {
    id: "3",
    type: "recipe",
    name: "Lasanha Vegetariana com Hibisco",
    description:
      "Uma versão única de lasanha vegetariana, onde as flores de hibisco cozidas são combinadas com camadas de massa para lasanha, abobrinha, berinjela e queijo mussarela. Regada com molho de tomate, polvilhada com orégano e decorada com manjericão fresco, esta lasanha é assada até ficar dourada e borbulhante. Uma experiência culinária inesquecível.",
    image:
      "http://res.cloudinary.com/dvxkj7fwq/image/upload/v1699571455/00510928-029a-479f-98df-2c7cb396b75f.jpg",
  },
]

export default function RecipesScreen() {
  return (
    <SafeAreaView className="m-0 flex-1">
      <ScrollView>
        <View className="pt-6 px-6">
          <View className="w-full py-2 px-4 flex-row items-center justify-between border border-gray-medium rounded-full bg-white">
            <TextThemed size="body2" color="grayPrimary" font="nunitoSemiBold">
              Busque por receitas
            </TextThemed>

            <IonIcon name="search" size="small" color="secondary" />
          </View>

          <View className="w-full mt-8">
            <ButtonThemed type="button" size="full" color="primary" shape="rounded">
              <TextThemed size="body2" color="white" font="nunitoSemiBold" classes="mr-1.5">
                Postar uma receita
              </TextThemed>

              <IonIcon name="add-circle-outline" size="medium" color="white" />
            </ButtonThemed>
          </View>

          <View className="w-full mt-8">
            <ProductShowcase title="Itens encontrados" products={showcaseMock} />
          </View>

          <View className="w-full mt-8">
            <ProductShowcase title="Receitas" products={showcaseMock} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
