import { Image, ImageProps } from "expo-image"

export default function ImageWithPlaceholder(props: Omit<ImageProps, "placeholder">) {
  return <Image transition={1000} {...props} />
}
