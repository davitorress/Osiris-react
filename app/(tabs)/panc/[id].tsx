import { Image } from "expo-image"
import { useLocalSearchParams, useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, TouchableOpacity, View } from "react-native"

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

  const cultivo = [
    "Clima e solo: O caruru é uma planta de clima quente e tropical, que se adapta bem a temperaturas entre 20°C e 30°C. Ela prefere sol pleno, mas também pode tolerar alguma sombra. Quanto ao solo, o caruru se desenvolve melhor em solos férteis, bem drenados e ricos em matéria orgânica.",
    "Plantio: O caruru pode ser propagado por meio de sementes. O plantio pode ser feito diretamente no solo ou em recipientes, como vasos ou canteiros. As sementes devem ser enterradas a uma profundidade de cerca de 1 cm. O espaçamento recomendado entre as plantas é de cerca de 20 a 30 centímetros.",
    "Rega: O caruru precisa de regas regulares para se desenvolver adequadamente. Mantenha o solo úmido, mas evite o encharcamento, pois isso pode causar problemas como o apodrecimento das raízes. ",
    "Adubação: O caruru responde bem à adição de matéria orgânica no solo. Antes do plantio, você pode incorporar composto orgânico ou adubo bem decomposto ao solo para fornecer nutrientes essenciais às plantas. Além disso, é recomendado fazer adubações periódicas durante o crescimento, seguindo as instruções específicas do fertilizante utilizado. ",
    "Manutenção: O caruru é uma planta de crescimento rápido e pode se tornar invasiva se não for controlada. Recomenda-se fazer podas regulares para controlar seu crescimento e evitar que ela se espalhe muito.",
    "Colheita: As folhas jovens e tenras do caruru podem ser colhidas quando a planta atingir cerca de 20 centímetros de altura. Você pode cortar as folhas com uma tesoura, deixando uma parte da planta para que ela continue a crescer e produzir novas folhas. As folhas colhidas podem ser utilizadas em diversas receitas culinárias.",
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
              <IonIcon name="return-down-back" size="large" color="white" />
            </ButtonThemed>

            <TextThemed
              size="h2"
              color="black"
              font="nunitoBold"
              numberOfLines={100}
              classes="ml-4"
            >
              Caruru
            </TextThemed>
          </View>

          <View className="w-full mt-8 flex-row">
            <View>
              <Image
                className="w-32 h-[132px] rounded-md"
                source="http://res.cloudinary.com/dvxkj7fwq/image/upload/v1699569036/441c93a7-e5e0-453f-830f-6f62e58e877a.jpg"
              />

              <TouchableOpacity className="mt-2 flex-row items-center">
                <TextThemed size="body2" color="primary" font="nunitoSemiBold" classes="mr-2">
                  Favoritar
                </TextThemed>

                <IonIcon name="heart-outline" size="medium" color="primary" />
              </TouchableOpacity>
            </View>

            <TextThemed
              size="caption"
              color="black"
              font="nunitoRegular"
              numberOfLines={7}
              classes="ml-4 w-[65%]"
            >
              O caruru é uma planta rica em cálcio, magnésio e manganês, minerais essenciais para a
              formação e manutenção da saúde dos ossos e dentes, ajudando a prevenir osteoporose,
              quedas e fraturas.
            </TextThemed>
          </View>

          <View className="w-full mt-8">
            <ContentSection title="Benefícios">
              <TextThemed size="caption" color="black" font="nunitoRegular" numberOfLines={100}>
                O caruru é uma planta rica em cálcio, magnésio e manganês, minerais essenciais para
                a formação e manutenção da saúde dos ossos e dentes, ajudando a prevenir
                osteoporose, quedas e fraturas.
              </TextThemed>
            </ContentSection>
          </View>

          <View className="w-full mt-8">
            <ContentSection title="Modo de Cultivo">
              {cultivo.map((item, index) => (
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
