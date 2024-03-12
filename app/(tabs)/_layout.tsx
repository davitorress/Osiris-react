import React from "react"
import { Tabs } from "expo-router"

import IonIcon from "@/components/basic/IonIcon"

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
          tabBarIcon: ({ focused }) => (
            <IonIcon name={focused ? "home" : "home-outline"} size="large" color="tertiary" />
          ),
        }}
      />
    </Tabs>
  )
}
