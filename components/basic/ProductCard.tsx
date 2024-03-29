import { View } from "react-native"

import IonIcon from "@/components/basic/IonIcon"
import TextThemed from "@/components/themed/TextThemed"
import ImageWithPlaceholder from "@/components/basic/ImageWithPlaceholder"

interface ProductCardProps {
  name: string
  image: {
    uri: string
    sizeClass: string
  }
  description?: string
  isFavorite?: boolean
  toggleFavorite?: () => void
  type?: "panc" | "recipe"
  mode?: "simple" | "detailed"
}

export default function ProductCard({
  name,
  description,
  type = "panc",
  toggleFavorite,
  mode = "simple",
  isFavorite = false,
  image: { uri: imgUrl, sizeClass: imgClasses },
}: ProductCardProps) {
  const iconName = type === "panc" ? "heart" : "bookmark"

  return (
    <>
      {mode === "simple" ? (
        <View>
          <ImageWithPlaceholder alt={name} className={imgClasses} source={imgUrl} />

          <TextThemed size="body1" color="tertiary" font="nunitoBold" classes="mt-3">
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
                <IonIcon
                  size="large"
                  onPress={toggleFavorite}
                  name={isFavorite ? iconName : `${iconName}-outline`}
                />
              )}
            </View>

            {description && (
              <TextThemed size="caption" classes="mt-2 w-8/12" numberOfLines={3}>
                {description}
              </TextThemed>
            )}
          </View>
        </View>
      )}
    </>
  )
}
