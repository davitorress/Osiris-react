import { twMerge } from "tailwind-merge"
import { PropsWithChildren } from "react"
import { TouchableOpacity } from "react-native"
import { VariantProps, tv } from "tailwind-variants"

const button = tv({
  base: "m-0 flex justify-center items-center gap-1.5 text-center",
  variants: {
    color: {
      alert: "bg-wine",

      primary: "bg-green-medium",
      secondary: "bg-green-light",
      tertiary: "bg-green-dark",

      grayPrimary: "bg-gray-medium",
      graySecondary: "bg-gray-light",
      grayTertiary: "bg-gray-dark",
    },
    size: {
      fit: "w-fit",
      full: "w-full",
    },
    shape: {
      rounded: "rounded-lg",
      circle: "rounded-full",
    },
    type: {
      icon: "p-1",
      button: "p-2",
    },
  },
})

type ButtonVariants = VariantProps<typeof button>

interface ButtonProps extends ButtonVariants {
  onClick?: () => void
  classes?: string
}

export default function ButtonThemed({
  children,
  onClick,
  classes,
  color = "primary",
  size = "fit",
  shape = "rounded",
  type = "button",
}: PropsWithChildren<ButtonProps>) {
  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.7}
      className={twMerge(button({ color, size, shape, type }), classes)}
    >
      {children}
    </TouchableOpacity>
  )
}
