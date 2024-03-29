import { twMerge } from "tailwind-merge"
import { VariantProps, tv } from "tailwind-variants"
import { TextInput, TextInputProps } from "react-native"

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
    placeholderColor: {
      black: "placeholder:text-black",
      white: "placeholder:text-white",
      primary: "placeholder:text-gray-medium",
      secondary: "placeholder:text-gray-light",
      tertiary: "placeholder:text-gray-dark",
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

interface InputProps extends InputVariants, Pick<TextInputProps, "autoComplete"> {
  value: string
  classes?: string
  placeholder?: string
  secureTextEntry?: boolean
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
  autoComplete = "off",
  secureTextEntry = false,
}: InputProps) {
  return (
    <TextInput
      value={value}
      onBlur={onBlur}
      onChangeText={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      secureTextEntry={secureTextEntry}
      className={twMerge(
        input({
          size,
          font,
          shape,
          padding,
          textSize,
          textColor,
          background,
          placeholderColor,
        }),
        classes
      )}
    />
  )
}
