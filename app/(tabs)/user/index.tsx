import { useCallback } from "react"
import { useRouter } from "expo-router"
import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import usePancStore from "@/storage/panc"
import useRecipeStore from "@/storage/recipe"
import { useCurrentUser } from "@/modules/user/queries"

import Sizes from "@/constants/Sizes"
import IonIcon from "@/components/basic/IonIcon"
import TextThemed from "@/components/themed/TextThemed"
import ButtonThemed from "@/components/themed/ButtonThemed"
import ProductShowcase from "@/components/blocks/ProductShowcase"
import ImageWithPlaceholder from "@/components/basic/ImageWithPlaceholder"

export default function UserScreen() {
  const router = useRouter()
  const { data: user } = useCurrentUser()

  const { favorites } = usePancStore()
  const { recipes, saved } = useRecipeStore()
  const myRecipes = recipes.filter((recipe) => recipe.author === user?.id)

  const editProfile = useCallback(() => {
    router.push("/(tabs)/user/edit")
  }, [router])

  const handleLogout = useCallback(() => {
    router.push("/")
  }, [router])

  return (
    <SafeAreaView className="m-0 flex-1">
      <ScrollView>
        <View className="p-6">
          <View className="relative self-center w-fit">
            <View className="items-center justify-center w-40 h-40 rounded-full bg-gray-light overflow-hidden">
              {user?.image ? (
                <ImageWithPlaceholder
                  alt="nome"
                  source={user.image}
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
              {user?.name}
            </TextThemed>

            <View className="mt-1 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <IonIcon name="mail-outline" color="primary" size="large" />

                <TextThemed size="body1" color="black" font="nunitoRegular" classes="ml-2">
                  {user?.email}
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

          {favorites.length > 0 && (
            <View className="w-full mt-8">
              <ProductShowcase title="PANCs favoritas" products={favorites} horizontal />
            </View>
          )}

          {saved.length > 0 && (
            <View className="w-full mt-8">
              <ProductShowcase title="Receitas salvas" products={saved} horizontal />
            </View>
          )}

          {myRecipes.length > 0 && (
            <View className="w-full mt-8">
              <ProductShowcase title="Suas receitas" products={myRecipes} horizontal />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
