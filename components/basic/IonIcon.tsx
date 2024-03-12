import { Ionicons } from "@expo/vector-icons"

import Colors from "@/constants/Colors"

const sizes = {
  tiny: 12,
  small: 20,
  medium: 24,
  large: 30,
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
