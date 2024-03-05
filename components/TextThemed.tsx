import { PropsWithChildren } from "react"
import { Text } from "react-native"
import { twMerge } from "tailwind-merge"
import { VariantProps, tv } from "tailwind-variants"

const text = tv({
  variants: {
    color: {
      alert: "text-wine",
      black: "text-black",
      white: "text-white",
      primary: "text-green-medium",
      secondary: "text-green-light",
      tertiary: "text-green-dark",
    },
    size: {
      h1: "text-4xl",
      h2: "text-3xl",
      h3: "text-2xl",
      h4: "text-xl",
      body1: "text-lg",
      body2: "text-base",
      caption: "text-sm",
    },
    font: {
      nunitoRegular: "font-nunito",
      nunitoSemiBold: "font-nunito_semiBold",
      nunitoBold: "font-nunito_bold",

      ubuntuRegular: "font-ubuntu",
      ubuntuBold: "font-ubuntu_bold",
    },
  },
})

type TextVariants = VariantProps<typeof text>

interface TextProps extends TextVariants {
  classes?: string
}

export default function TextThemed({
  children,
  classes,
  size = "body1",
  color = "black",
  font = "nunitoRegular",
}: PropsWithChildren<TextProps>) {
  return <Text className={twMerge(text({ color, size, font }), classes)}>{children}</Text>
}
