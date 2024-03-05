import FontAwesome from "@expo/vector-icons/FontAwesome"
import { DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"

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

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
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

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
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
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  )
}
