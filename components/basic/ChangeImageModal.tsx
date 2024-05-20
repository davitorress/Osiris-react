import { useState } from "react"
import { Modal, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { ImagePickerAsset, launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker"

import IonIcon from "@/components/basic/IonIcon"
import TextThemed from "@/components/themed/TextThemed"
import ButtonThemed from "@/components/themed/ButtonThemed"
import ImageWithPlaceholder from "@/components/basic/ImageWithPlaceholder"

interface ChangeImageModalProps {
  image?: string
  visible: boolean
  onClose: () => void
  onConfirm: (image: ImagePickerAsset) => void
  iconImageName: React.ComponentProps<typeof Ionicons>["name"]
}

export default function ChangeImageModal({
  image,
  visible,
  onClose,
  onConfirm,
  iconImageName,
}: ChangeImageModalProps) {
  const [imageAsset, setImageAsset] = useState<ImagePickerAsset | null>(null)

  const pickImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    })

    if (!result.canceled) {
      setImageAsset(result.assets[0])
    }
  }

  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      animationType="fade"
      presentationStyle="overFullScreen"
      transparent
    >
      <View
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        className="w-full h-full items-center"
      >
        <View className="p-6 w-[90%] h-fit bg-white relative top-[30%] rounded">
          <View className="relative self-center w-fit">
            <View className="items-center justify-center w-40 h-40 rounded-full bg-gray-light overflow-hidden">
              {image || imageAsset ? (
                <ImageWithPlaceholder
                  alt="nome"
                  source={image ? image : { uri: imageAsset?.uri }}
                  className="w-40 h-40 rounded-full"
                />
              ) : (
                <IonIcon name={iconImageName} color="primary" size="massive" />
              )}
            </View>

            <View className="absolute bottom-0 right-0">
              <ButtonThemed shape="circle" onClick={pickImage}>
                <IonIcon name="pencil-outline" color="white" size="veryHuge" />
              </ButtonThemed>
            </View>
          </View>

          <View className="w-full mt-6 flex-row justify-between">
            <ButtonThemed
              color="secondary"
              onClick={() => {
                if (imageAsset) onConfirm(imageAsset)
                onClose()
              }}
              classes="w-[45%]"
            >
              <TextThemed color="white" size="h4" font="nunitoBold">
                Salvar
              </TextThemed>
            </ButtonThemed>

            <ButtonThemed color="alert" onClick={onClose} classes="w-[45%]">
              <TextThemed color="white" size="h4" font="nunitoBold">
                Cancelar
              </TextThemed>
            </ButtonThemed>
          </View>
        </View>
      </View>
    </Modal>
  )
}
