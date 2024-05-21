import { useRef } from "react"
import { Redirect } from "expo-router"
import Toast from "react-native-toast-message"
import { TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { CameraView, useCameraPermissions } from "expo-camera"

export default function CameraScreen() {
  const camera = useRef<CameraView>(null)
  const [permission, requestPermission] = useCameraPermissions()

  const takePicture = async () => {
    if (!camera.current) {
      return
    }

    const photo = await camera.current.takePictureAsync({
      quality: 0.7,
    })
    console.log("Foto tirada!", photo)
  }

  if (!permission) {
    return null
  }

  if (permission?.canAskAgain && !permission?.granted) {
    requestPermission()
  }

  if (!permission?.granted) {
    Toast.show({
      type: "error",
      text1: "Permissão de câmera negada!",
      text2: "Você precisa permitir o acesso à câmera para usar esta funcionalidade.",
    })

    return <Redirect href="/(tabs)/" />
  }

  return (
    <SafeAreaView className="m-0 flex-1">
      <CameraView
        ref={camera}
        facing="back"
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
        <TouchableOpacity
          onPress={takePicture}
          className="rounded-full p-0.5 border border-green-medium w-14 h-14 z-20 absolute bottom-24"
        >
          <View className="rounded-full bg-white w-full h-full" />
        </TouchableOpacity>
      </CameraView>
    </SafeAreaView>
  )
}
