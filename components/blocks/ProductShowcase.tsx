import { ScrollView, View } from "react-native"

import { NormalizedProduct } from "@/modules/product/types"

import TextThemed from "@/components/themed/TextThemed"
import ProductCard from "@/components/basic/ProductCard"

interface ProductShowcaseProps {
  title: string
  horizontal?: boolean
  products: NormalizedProduct[]
}

export default function ProductShowcase({
  title,
  products,
  horizontal = false,
}: ProductShowcaseProps) {
  return (
    <View className="w-full">
      <TextThemed size="h3" font="nunitoSemiBold" classes="mb-5">
        {title}
      </TextThemed>

      <ScrollView className="w-full" horizontal={horizontal}>
        {products.map(({ id, name, image, isFavorite, description, type }, index) => (
          <View key={id} className={index === 0 ? "" : horizontal ? "ml-5" : "mt-5"}>
            <ProductCard
              id={id}
              name={name}
              type={type}
              isFavorite={isFavorite}
              description={description}
              toggleFavorite={() => {}}
              mode={description ? "detailed" : "simple"}
              image={{ uri: image, sizeClass: "w-32 h-32 rounded-md" }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
