import React from "react"
import { render, fireEvent, act } from "@testing-library/react-native"
import RegisterForm from "../../components/forms/RegisterForm"

test("submitting form with valid data should call onSubmit", async () => {
  const onSubmit = jest.fn()
  const { getByPlaceholderText } = render(<RegisterForm onSubmit={onSubmit} />)

  const nameValueTest = "John Doe"
  const emailValueTest = "john.doe@example.com"
  const passwordValueTest = "password123"

  const nameInput = getByPlaceholderText("Digite o seu nome completo")
  const emailInput = getByPlaceholderText("Digite o seu e-mail")
  const passwordInput = getByPlaceholderText("Digite a sua senha")
  const confirmPasswordInput = getByPlaceholderText("Digite novamente a sua senha")

  fireEvent.changeText(nameInput, nameValueTest)
  fireEvent.changeText(emailInput, emailValueTest)
  fireEvent.changeText(passwordInput, passwordValueTest)
  fireEvent.changeText(confirmPasswordInput, passwordValueTest)

  await act(async () => {
    await onSubmit({
      name: nameValueTest,
      email: emailValueTest,
      password: passwordValueTest,
      confirmPassword: passwordValueTest,
    })
  })

  expect(onSubmit).toHaveBeenCalledTimes(1)
  expect(onSubmit).toHaveBeenCalledWith({
    name: nameValueTest,
    email: emailValueTest,
    password: passwordValueTest,
    confirmPassword: passwordValueTest,
  })
})
