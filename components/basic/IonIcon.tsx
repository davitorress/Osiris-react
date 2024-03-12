import { Ionicons } from "@expo/vector-icons"

import Colors from "@/constants/Colors"

const sizes = {
  micro: 12,
  tiny: 16,
  small: 18,
  medium: 20,
  large: 24,
  huge: 28,
}

const colors = {
  alert: Colors.light.wine,
  black: Colors.light.black,
  white: Colors.light.white,

  primary: Colors.light.green.medium,
  secondary: Colors.light.green.light,
  tertiary: Colors.light.green.dark,

  grayPrimary: Colors.light.gray.medium,
  graySecondary: Colors.light.gray.light,
  grayTertiary: Colors.light.gray.dark,
}

interface IonIconProps {
  name: React.ComponentProps<typeof Ionicons>["name"]
  size?: keyof typeof sizes
  color?: keyof typeof colors
}

export default function IonIcon({ name, size = "medium", color = "primary" }: IonIconProps) {
  return <Ionicons name={name} size={sizes[size]} color={colors[color]} />
}
