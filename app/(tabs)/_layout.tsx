import React from "react"
import { Tabs } from "expo-router"
import { StyleSheet } from "react-native"

import Colors from "@/constants/Colors"
import IonIcon from "@/components/basic/IonIcon"

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
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
            <IonIcon name={focused ? "home" : "home-outline"} size="large" color="tertiary" />
          ),
        }}
      />
      <Tabs.Screen
        name="pancs"
        options={{
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
          tabBarIcon: ({ focused }) => (
            <IonIcon name={focused ? "leaf" : "leaf-outline"} size="large" color="tertiary" />
          ),
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
              size="large"
              color="tertiary"
            />
          ),
        }}
      />
    </Tabs>
  )
}
