import { ActivityIndicator } from "react-native"

import Sizes from "@/constants/Sizes"
import Colors from "@/constants/Colors"

const colors = {
  white: Colors.light.white,
  black: Colors.light.black,
  alert: Colors.light.wine,

  primary: Colors.light.green.medium,
  secondary: Colors.light.green.light,
  tertiary: Colors.light.green.dark,

  grayPrimary: Colors.light.gray.medium,
  graySecondary: Colors.light.gray.light,
  grayTertiary: Colors.light.gray.dark,
} as const

interface LoadingSpinnerProps {
  color?: keyof typeof colors
  size?: keyof typeof Sizes | number
}

export default function LoadingSpinner({ size = "huge", color = "primary" }: LoadingSpinnerProps) {
  return (
    <ActivityIndicator color={colors[color]} size={typeof size === "number" ? size : Sizes[size]} />
  )
}
