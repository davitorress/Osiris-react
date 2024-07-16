import { Redirect } from "expo-router"
import Toast from "react-native-toast-message"
import { useEffect, useRef, useState } from "react"
import { Modal, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { CameraView, useCameraPermissions } from "expo-camera"
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker"

import { useCurrentUser } from "@/modules/user/queries"
import { useAddPrediction, useGetUserPredictions } from "@/modules/prediction/queries"

import IonIcon from "@/components/basic/IonIcon"
import TextThemed from "@/components/themed/TextThemed"
import LoadingScreen from "@/components/basic/LoadingScreen"

export default function CameraScreen() {
  const camera = useRef<CameraView>(null)
  const [blockAnalysis, setBlockAnalysis] = useState(false)
  const [facing, setFacing] = useState<"front" | "back">("back")
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const addPrediction = useAddPrediction()
  const [permission, requestPermission] = useCameraPermissions()
  const { data: user, isLoading: isLoadingUser } = useCurrentUser()
  const { data: predictions, isLoading: isLoadingPredictions } = useGetUserPredictions()

  const handleBlockAnalysis = () => {
    Toast.show({
      type: "error",
      text1: "Limite de análises atingido!",
      text2: "Ative a sua assinatura para ter análises ilimitadas!",
    })
  }

  const handleFacingChange = () => {
    setFacing(facing === "back" ? "front" : "back")
  }

  const pickImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setShowSuccessModal(true)
      addPrediction.mutate({ image: result.assets[0] })
    }
  }

  const takePicture = async () => {
    if (!camera.current) {
      return
    }

    const photo = await camera.current.takePictureAsync({
      quality: 0.7,
    })

    if (photo) {
      setShowSuccessModal(true)
      addPrediction.mutate({ photo })
    }
  }

  useEffect(() => {
    if (showSuccessModal) {
      setTimeout(() => {
        setShowSuccessModal(false)
      }, 5000)
    }
  }, [showSuccessModal])

  useEffect(() => {
    if (predictions && predictions.length >= 3) {
      setBlockAnalysis(true)
    } else {
      setBlockAnalysis(false)
    }
  }, [predictions])

  if ((permission?.canAskAgain && !permission?.granted) || !permission) {
    requestPermission()
  }

  if (permission && !permission.granted) {
    requestPermission()

    Toast.show({
      type: "error",
      text1: "Permissão de câmera negada!",
      text2: "Você precisa permitir o acesso à câmera para usar esta funcionalidade.",
    })

    return <Redirect href="/(tabs)/" />
  }

  if (isLoadingUser || isLoadingPredictions || !user || !predictions) {
    return <LoadingScreen />
  }

  return (
    <SafeAreaView className="m-0 flex-1">
      <CameraView
        ref={camera}
        facing={facing}
        autofocus="on"
        mode="picture"
        className="flex-1 relative items-center"
      >
        <View
          className="w-[90%] h-[60%] rounded-3xl z-20 absolute top-[12%]"
          style={{
            backgroundColor: "rgba(255,255,255,0.3)",
          }}
        />

        <View className="w-[90%] rounded-lg z-20 absolute top-8 bg-white p-2">
          {user.signature.ativa ? (
            <View className="flex-row items-center justify-center">
              <IonIcon name="star" color="primary" size="huge" />

              <TextThemed color="primary" font="ubuntuBold" numberOfLines={100} classes="ml-2">
                Você possui análises ilimitadas!
              </TextThemed>
            </View>
          ) : (
            <View className="flex-row items-center justify-center">
              {predictions.length < 3 ? (
                <TextThemed color="tertiary" font="ubuntuBold" numberOfLines={100}>
                  Análises disponíveis: {3 - predictions.length}
                </TextThemed>
              ) : (
                <TextThemed color="error" font="ubuntuBold" numberOfLines={100}>
                  Você atingiu o limite de análises!
                </TextThemed>
              )}
            </View>
          )}
        </View>

        <View className="w-full flex-row items-center justify-around z-20 absolute bottom-24">
          <TouchableOpacity
            onPress={blockAnalysis && !user.signature.ativa ? handleBlockAnalysis : pickImage}
            className="items-center justify-center rounded-full bg-white w-14 h-14"
          >
            <IonIcon name="image" color="primary" size="veryHuge" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={blockAnalysis && !user.signature.ativa ? handleBlockAnalysis : takePicture}
            className="rounded-full p-0.5 border-2 border-green-medium w-20 h-20"
          >
            <View className="w-full h-full bg-white rounded-full" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleFacingChange}
            className="items-center justify-center rounded-full bg-white w-14 h-14"
          >
            <IonIcon name="camera-reverse" color="primary" size="veryHuge" />
          </TouchableOpacity>
        </View>
      </CameraView>

      <Modal
        visible={showSuccessModal}
        onDismiss={() => setShowSuccessModal(false)}
        animationType="fade"
        presentationStyle="overFullScreen"
        transparent
      >
        <View
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          className="w-full h-full items-center"
        >
          <View className="p-6 w-[90%] bg-white h-fit relative top-[30%] rounded">
            <TextThemed font="ubuntuBold" size="h3" numberOfLines={100}>
              A sua análise está em processamento!
            </TextThemed>
            <TextThemed
              size="h4"
              numberOfLines={100}
              font="ubuntuRegular"
              classes="mt-3 text-justify"
            >
              Você poderá visualizar o resultado na tela de perfil dentro da seção "Suas análises"
            </TextThemed>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
