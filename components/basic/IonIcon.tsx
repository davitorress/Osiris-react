import { Ionicons } from "@expo/vector-icons"

import Sizes from "@/constants/Sizes"
import Colors from "@/constants/Colors"

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
  onPress?: React.ComponentProps<typeof Ionicons>["onPress"]
  classes?: string
  size?: keyof typeof Sizes
  color?: keyof typeof colors
}

export default function IonIcon({
  name,
  onPress,
  classes,
  size = "medium",
  color = "primary",
}: IonIconProps) {
  return (
    <Ionicons
      name={name}
      size={Sizes[size]}
      color={colors[color]}
      onPress={onPress}
      className={classes}
    />
  )
}
