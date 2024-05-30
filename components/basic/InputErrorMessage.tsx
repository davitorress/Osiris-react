import TextThemed from "@/components/themed/TextThemed"

interface InputErrorMessageProps {
  message: string | undefined
}

export default function InputErrorMessage({ message }: InputErrorMessageProps) {
  return message ? (
    <TextThemed color="alert" size="body2" font="ubuntuRegular" classes="mt-1">
      {message}
    </TextThemed>
  ) : null
}
