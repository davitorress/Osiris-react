import { StyleSheet } from "react-native"
import { Tabs, Redirect } from "expo-router"

import useUserStore from "@/storage/user"

import Sizes from "@/constants/Sizes"
import Colors from "@/constants/Colors"
import IonIcon from "@/components/basic/IonIcon"

const styles = StyleSheet.create({
  tabBar: {
    bottom: 0,
    position: "absolute",
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderTopLeftRadius: Sizes.semi,
    borderTopRightRadius: Sizes.semi,
    borderColor: Colors.light.green.dark,
    borderTopColor: Colors.light.green.dark,
    borderLeftColor: Colors.light.green.dark,
    borderRightColor: Colors.light.green.dark,
  },
})

export default function TabLayout() {
  const userId = useUserStore((state) => state.id)
  const userToken = useUserStore((state) => state.token)

  if (!userId && !userToken) {
    return <Redirect href="/welcome" />
  }

  return (
    <Tabs
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <IonIcon name={focused ? "home" : "home-outline"} size="huge" color="tertiary" />
          ),
        }}
      />

      <Tabs.Screen
        name="pancs"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <IonIcon name={focused ? "leaf" : "leaf-outline"} size="huge" color="tertiary" />
          ),
        }}
      />
      <Tabs.Screen
        name="panc/[id]"
        options={{
          href: null,
          tabBarIcon: undefined,
          tabBarShowLabel: false,
        }}
      />

      <Tabs.Screen
        name="camera"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <IonIcon name={focused ? "camera" : "camera-outline"} size="huge" color="tertiary" />
          ),
          tabBarStyle: {
            ...styles.tabBar,
            position: "absolute",
          },
        }}
      />

      <Tabs.Screen
        name="recipes/index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <IonIcon
              name={focused ? "restaurant" : "restaurant-outline"}
              size="huge"
              color="tertiary"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="recipes/new"
        options={{
          href: null,
          tabBarIcon: undefined,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="recipe/[id]/index"
        options={{
          href: null,
          tabBarIcon: undefined,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="recipe/[id]/edit"
        options={{
          href: null,
          tabBarIcon: undefined,
          tabBarShowLabel: false,
        }}
      />

      <Tabs.Screen
        name="user/index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <IonIcon name={focused ? "person" : "person-outline"} size="huge" color="tertiary" />
          ),
        }}
      />
      <Tabs.Screen
        name="user/edit"
        options={{
          href: null,
          tabBarIcon: undefined,
          tabBarShowLabel: false,
        }}
      />

      <Tabs.Screen
        name="predictions"
        options={{
          href: null,
          tabBarIcon: undefined,
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  )
}
