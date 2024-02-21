import { StatusBar } from "expo-status-bar"
import { Platform, StyleSheet } from "react-native"

import EditScreenInfo from "@/components/EditScreenInfo"
import { Text, View } from "@/components/Themed"

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text>Default</Text>
      <Text className="font-nunito">Nunito Regular</Text>
      <Text className="font-nunito_bold">Nunito Bold</Text>
      <Text className="font-nunito_semibold">Nunito SemiBold</Text>
      <Text className="font-ubuntu">Ubuntu Regular</Text>
      <Text className="font-ubuntu_bold">Ubuntu Bold</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
})
