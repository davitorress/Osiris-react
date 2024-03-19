import React from "react"
import { render } from "@testing-library/react-native"
import WelcomeScreen from "../app/index"

test("renders welcome page text", () => {
  const { getByText } = render(<WelcomeScreen />)
  const welcomeText = getByText("Seja bem-vindo(a) ao Osiris!")
  expect(welcomeText).toBeTruthy()
})
