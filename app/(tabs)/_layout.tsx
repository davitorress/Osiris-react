import React from "react"
import { Tabs } from "expo-router"
import { StyleSheet } from "react-native"

import Sizes from "@/constants/Sizes"
import Colors from "@/constants/Colors"
import IonIcon from "@/components/basic/IonIcon"

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderTopLeftRadius: Sizes.semi,
    borderTopRightRadius: Sizes.semi,
    borderTopColor: Colors.light.green.dark,
    borderLeftColor: Colors.light.green.dark,
    borderRightColor: Colors.light.green.dark,
  },
})

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
          tabBarIcon: ({ focused }) => (
            <IonIcon name={focused ? "home" : "home-outline"} size="huge" color="tertiary" />
          ),
        }}
      />

      <Tabs.Screen
        name="pancs"
        options={{
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
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
          tabBarStyle: styles.tabBar,
        }}
      />

      <Tabs.Screen
        name="recipes"
        options={{
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
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
        name="recipe/[id]"
        options={{
          href: null,
          tabBarIcon: undefined,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      />

      <Tabs.Screen
        name="user/index"
        options={{
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
          tabBarIcon: ({ focused }) => (
            <IonIcon name={focused ? "person" : "person-outline"} size="huge" color="tertiary" />
          ),
        }}
      />
    </Tabs>
  )
}
