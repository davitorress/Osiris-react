import { Fragment, useEffect } from "react"
import { Stack } from "expo-router"
import { useFonts } from "expo-font"
import { Ionicons } from "@expo/vector-icons"
import * as SplashScreen from "expo-splash-screen"
import { ThemeProvider } from "@react-navigation/native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message"

import Sizes from "@/constants/Sizes"
import Colors from "@/constants/Colors"
import OsirisTheme from "@/config/Theme"
import LoadingScreen from "@/components/basic/LoadingScreen"

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
import QueryClientProvider from "@/providers/queryClient"

import { LogBox } from "react-native"
export { ErrorBoundary } from "expo-router"

export const unstable_settings = {
  initialRouteName: "welcome",
}

SplashScreen.preventAutoHideAsync()
LogBox.ignoreAllLogs(true)

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
    return <LoadingScreen />
  }

  return (
    <Fragment>
      <RootLayoutNav />
      <Toast
        topOffset={60}
        config={{
          success: (props) => (
            <BaseToast
              {...props}
              text2NumberOfLines={2}
              style={{ borderLeftColor: Colors.light.green.light }}
              contentContainerStyle={{ paddingHorizontal: Sizes.small }}
              text1Style={{
                fontWeight: 700,
                fontSize: Sizes.medium,
                fontFamily: "Ubuntu_700Bold",
              }}
              text2Style={{
                fontSize: 14,
                fontWeight: 400,
                fontFamily: "Ubuntu_400Regular",
              }}
            />
          ),
          error: (props) => (
            <ErrorToast
              {...props}
              text2NumberOfLines={2}
              style={{ borderLeftColor: Colors.light.wine }}
              contentContainerStyle={{ paddingHorizontal: Sizes.small }}
              text1Style={{
                fontWeight: 700,
                fontSize: Sizes.medium,
                fontFamily: "Ubuntu_700Bold",
              }}
              text2Style={{
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "Ubuntu_400Regular",
              }}
            />
          ),
        }}
      />
    </Fragment>
  )
}

function RootLayoutNav() {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider>
        <ThemeProvider value={OsirisTheme}>
          <Stack>
            <Stack.Screen
              name="welcome"
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
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}
