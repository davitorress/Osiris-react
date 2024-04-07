import { View } from "react-native"
import { PropsWithChildren } from "react"

import TextThemed from "@/components/themed/TextThemed"

interface ContentSectionProps {
  title: string
}

export default function ContentSection({
  title,
  children,
}: PropsWithChildren<ContentSectionProps>) {
  return (
    <View className="w-full">
      <TextThemed size="h4" color="black" font="nunitoBold" classes="mb-3">
        {title}
      </TextThemed>

      {children}
    </View>
  )
}
