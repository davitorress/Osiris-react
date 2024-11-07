import { Href, useRouter } from "expo-router"
import { GestureResponderEvent, TouchableOpacity, View } from "react-native"

import IonIcon from "@/components/basic/IonIcon"
import TextThemed from "@/components/themed/TextThemed"
import ImageWithPlaceholder from "@/components/basic/ImageWithPlaceholder"

interface ProductCardProps {
  id: string
  name: string
  image: {
    uri: string
    sizeClass: string
  }
  description?: string
  isFavorite?: boolean
  type?: "panc" | "recipe"
  mode?: "simple" | "detailed"
  toggleFavorite?: (event: GestureResponderEvent) => void
}

export default function ProductCard({
  id,
  name,
  description,
  type = "panc",
  toggleFavorite,
  mode = "simple",
  isFavorite = false,
  image: { uri: imgUrl, sizeClass: imgClasses },
}: ProductCardProps) {
  const router = useRouter()
  const iconName = type === "panc" ? "heart" : "bookmark"

  return (
    <TouchableOpacity onPress={() => router.push(`/(tabs)/${type}/${id}/` as Href)}>
      {mode === "simple" ? (
        <View className="w-32">
          <ImageWithPlaceholder alt={name} className={imgClasses} source={imgUrl} />

          <TextThemed
            size="body1"
            color="tertiary"
            font="nunitoBold"
            classes="mt-3"
            numberOfLines={10}
          >
            {name}
          </TextThemed>
        </View>
      ) : (
        <View className="w-[75vw] flex-row">
          <ImageWithPlaceholder alt={name} className={imgClasses} source={imgUrl} />

          <View className="w-full ml-3">
            <View className="w-2/3 flex-row justify-between items-center">
              <TextThemed
                size="body1"
                color="tertiary"
                font="nunitoBold"
                classes="mr-3"
                numberOfLines={2}
              >
                {name}
              </TextThemed>

              {toggleFavorite && (
                <TouchableOpacity onPress={toggleFavorite} className="w-8 h-8">
                  <IonIcon size="huge" name={isFavorite ? iconName : `${iconName}-outline`} />
                </TouchableOpacity>
              )}
            </View>

            {description && (
              <TextThemed size="caption" classes="mt-2 w-8/12 text-justify" numberOfLines={3}>
                {description}
              </TextThemed>
            )}
          </View>
        </View>
      )}
    </TouchableOpacity>
  )
}
