import useTranslationStore from "@/storage/translation"
import TextThemed from "@/components/themed/TextThemed"

interface InputErrorMessageProps {
  message: string | undefined
}

export default function InputErrorMessage({ message }: InputErrorMessageProps) {
  const translate = useTranslationStore((state) => state.actions.translate)

  return message ? (
    <TextThemed color="alert" size="body2" font="ubuntuRegular" classes="mt-1">
      {translate(message)}
    </TextThemed>
  ) : null
}
