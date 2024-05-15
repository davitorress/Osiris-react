import { twMerge } from "tailwind-merge"
import { VariantProps, tv } from "tailwind-variants"
import { TextInput, TextInputProps } from "react-native"

import Colors from "@/constants/Colors"

const placeholderColors = {
  black: Colors.light.black,
  white: Colors.light.white,
  primary: Colors.light.gray.medium,
  secondary: Colors.light.gray.light,
  tertiary: Colors.light.gray.dark,
}

const input = tv({
  variants: {
    size: {
      full: "w-full",
    },
    background: {
      primary: "bg-gray-medium",
      secondary: "bg-gray-light",
      tertiary: "bg-gray-dark",
    },
    font: {
      nunitoRegular: "font-nunito",
      nunitoSemiBold: "font-nunito_semibold",
      nunitoBold: "font-nunito_bold",

      ubuntuRegular: "font-ubuntu",
      ubuntuBold: "font-ubuntu_bold",
    },
    textSize: {
      large: "text-xl placeholder:text-xl",
      medium: "text-lg placeholder:text-lg",
      small: "text-base placeholder:text-base",
    },
    textColor: {
      black: "text-black",
      white: "text-white",
      primary: "text-gray-medium",
      secondary: "text-gray-light",
      tertiary: "text-gray-dark",
    },
    padding: {
      none: "p-0",
      small: "p-1",
      medium: "p-2",
      large: "p-3",
    },
    shape: {
      small: "rounded-sm",
      medium: "rounded",
      large: "rounded-md",
      huge: "rounded-lg",
    },
  },
})

type InputVariants = VariantProps<typeof input>

interface InputProps
  extends InputVariants,
    Pick<TextInputProps, "multiline">,
    Pick<TextInputProps, "autoComplete">,
    Pick<TextInputProps, "numberOfLines"> {
  value: string
  classes?: string
  placeholder?: string
  secureTextEntry?: boolean
  placeholderColor?: keyof typeof placeholderColors
  onBlur?: () => void
  onChange?: (value: string) => void
}

export default function Input({
  classes,
  size = "full",
  shape = "medium",
  padding = "medium",
  textSize = "medium",
  textColor = "black",
  font = "nunitoRegular",
  background = "secondary",
  placeholderColor = "tertiary",

  value,
  onBlur,
  onChange,
  placeholder,
  multiline = false,
  autoComplete = "off",
  secureTextEntry = false,
  numberOfLines = undefined,
}: InputProps) {
  return (
    <TextInput
      value={value}
      onBlur={onBlur}
      multiline={multiline}
      textAlignVertical="top"
      onChangeText={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      numberOfLines={numberOfLines}
      secureTextEntry={secureTextEntry}
      placeholderTextColor={placeholderColors[placeholderColor]}
      className={twMerge(
        input({
          size,
          font,
          shape,
          padding,
          textSize,
          textColor,
          background,
        }),
        classes
      )}
    />
  )
}
