jest.mock("expo-localization", () => ({
  getLocales: jest.fn(() => [{ languageCode: "en" }]),
}))

import React from "react"
import { render } from "@testing-library/react-native"
import WelcomeScreen from "@/app/welcome"

test("renders welcome page text", () => {
  const { getByText } = render(<WelcomeScreen />)
  const welcomeText = getByText("Welcome to Osiris!")
  expect(welcomeText).toBeTruthy()
})
