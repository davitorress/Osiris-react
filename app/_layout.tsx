import { useEffect } from "react"
import { Stack } from "expo-router"
import { useFonts } from "expo-font"
import { Ionicons } from "@expo/vector-icons"
import * as SplashScreen from "expo-splash-screen"
import { DefaultTheme, ThemeProvider } from "@react-navigation/native"

import {
  useFonts as useUbuntuFonts,
  Ubuntu_400Regular,
  Ubuntu_700Bold,
} from "@expo-google-fonts/ubuntu"
import {
  useFonts as useNunitoFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito"

export { ErrorBoundary } from "expo-router"

export const unstable_settings = {
  initialRouteName: "(tabs)",
}

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...Ionicons.font,
  })

  const [loadedUbuntu, errorUbuntu] = useUbuntuFonts({
    Ubuntu_400Regular,
    Ubuntu_700Bold,
  })

  const [loadedNunito, errorNunito] = useNunitoFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  })

  useEffect(() => {
    if (error) throw error
    if (errorUbuntu) throw errorUbuntu
    if (errorNunito) throw errorNunito
  }, [error, errorUbuntu, errorNunito])

  useEffect(() => {
    if (loaded && loadedUbuntu && loadedNunito) {
      SplashScreen.hideAsync()
    }
  }, [loaded, loadedUbuntu, loadedNunito])

  if (!loaded || !loadedUbuntu || !loadedNunito) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            navigationBarHidden: true,
            presentation: "fullScreenModal",
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
            navigationBarHidden: true,
            presentation: "fullScreenModal",
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerShown: false,
            navigationBarHidden: true,
            presentation: "fullScreenModal",
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  )
}
