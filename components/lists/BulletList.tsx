import { View } from "react-native"

import TextThemed from "@/components/themed/TextThemed"

export default function BulletList({ items }: { items: string[] }) {
  return (
    <View>
      {items.map((item, index) => (
        <View key={index} className="flex-row">
          <TextThemed size="caption" color="black">
            {"\u2022"}
          </TextThemed>

          <TextThemed
            size="caption"
            color="black"
            font="nunitoRegular"
            numberOfLines={100}
            classes="ml-1 text-justify"
          >
            {item}
          </TextThemed>
        </View>
      ))}
    </View>
  )
}
