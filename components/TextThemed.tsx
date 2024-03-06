import { Text } from "react-native"
import { Href, Link } from "expo-router"
import { twMerge } from "tailwind-merge"
import { PropsWithChildren } from "react"
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
      nunitoSemiBold: "font-nunito_semibold",
      nunitoBold: "font-nunito_bold",

      ubuntuRegular: "font-ubuntu",
      ubuntuBold: "font-ubuntu_bold",
    },
  },
})

type TextVariants = VariantProps<typeof text>

interface TextProps extends TextVariants {
  type?: "text" | "link"
  url?: Href<string>
  classes?: string
  onClick?: () => void
}

export default function TextThemed({
  url,
  onClick,
  classes,
  children,
  type = "text",
  size = "body1",
  color = "black",
  font = "nunitoRegular",
}: PropsWithChildren<TextProps>) {
  if (type === "link" && url) {
    return (
      <Link href={url} asChild>
        <Text className={twMerge(text({ color, size, font }), classes)}>{children}</Text>
      </Link>
    )
  }

  return (
    <Text onPress={onClick} className={twMerge(text({ color, size, font }), classes)}>
      {children}
    </Text>
  )
}
