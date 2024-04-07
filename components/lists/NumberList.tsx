import { View } from "react-native"

import TextThemed from "@/components/themed/TextThemed"

export default function NumberList({ items }: { items: string[] }) {
  return (
    <View>
      {items.map((item, index) => (
        <View key={index} className="flex-row">
          <TextThemed size="caption" color="black">
            {index + 1}.
          </TextThemed>

          <TextThemed size="caption" color="black" font="nunitoRegular" classes="ml-1">
            {item}
          </TextThemed>
        </View>
      ))}
    </View>
  )
}
