import React from "react"
import { render, fireEvent, act } from "@testing-library/react-native"
import RegisterForm from "../../components/forms/RegisterForm"

test("submitting form with valid data should call onSubmit", async () => {
  const onSubmit = jest.fn()
  const { getByPlaceholderText } = render(<RegisterForm onSubmit={onSubmit} />)

  const nameInput = getByPlaceholderText("Digite o seu nome completo")
  const emailInput = getByPlaceholderText("Digite o seu e-mail")
  const passwordInput = getByPlaceholderText("Digite a sua senha")
  const confirmPasswordInput = getByPlaceholderText("Digite novamente a sua senha")

  fireEvent.changeText(nameInput, "John Doe")
  fireEvent.changeText(emailInput, "john.doe@example.com")
  fireEvent.changeText(passwordInput, "password123")
  fireEvent.changeText(confirmPasswordInput, "password123")

  await act(async () => {
    await onSubmit({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      confirmPassword: "password123",
    })
  })

  expect(onSubmit).toHaveBeenCalledTimes(1)
  expect(onSubmit).toHaveBeenCalledWith({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    confirmPassword: "password123",
  })
})
