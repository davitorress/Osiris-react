import { ScrollView, View } from "react-native"

import { NormalizedProduct, Product } from "@/modules/product/types"

import usePancStore from "@/storage/panc"
import useRecipeStore from "@/storage/recipe"

import TextThemed from "@/components/themed/TextThemed"
import ProductCard from "@/components/basic/ProductCard"

interface ProductShowcaseProps {
  title: string
  products: Product[]
  horizontal?: boolean
}

export default function ProductShowcase({
  title,
  products,
  horizontal = false,
}: ProductShowcaseProps) {
  const { saved } = useRecipeStore()
  const { favorites } = usePancStore()

  const normalizedProducts = products.map(
    (product) =>
      ({
        id: product.id,
        type: product.type,
        name: product.name,
        image: product.image,
        description: horizontal ? undefined : product.description,
        isFavorite:
          product.type === "panc"
            ? favorites.some((favorite) => favorite.id === product.id)
            : saved.some((save) => save.id === product.id),
      }) as NormalizedProduct
  )

  return (
    <View className="w-full">
      <TextThemed size="h3" font="nunitoSemiBold" classes="mb-5">
        {title}
      </TextThemed>

      <ScrollView className="w-full" horizontal={horizontal}>
        {normalizedProducts.map(({ id, name, image, isFavorite, description, type }, index) => (
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
