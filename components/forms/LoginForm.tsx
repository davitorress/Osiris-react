import { z } from "zod"
import React from "react"
import { useRouter } from "expo-router"
import { Pressable, View } from "react-native"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import Input from "@/components/basic/Input"
import TextThemed from "@/components/themed/TextThemed"
import ButtonThemed from "@/components/themed/ButtonThemed"
import InputErrorMessage from "@/components/basic/InputErrorMessage"

const loginSchema = z.object({
  email: z
    .string({ required_error: "O email é obrigatório!" })
    .min(1, "O email é obrigatório!")
    .email("Insira um email válido!")
    .transform((email) => email.trim()),
  password: z
    .string({ required_error: "A senha é obrigatória!" })
    .min(1, "A senha é obrigatória!")
    .min(3, "A senha deve ter no mínimo 3 caracteres!")
    .transform((password) => password.trim()),
})

type LoginData = z.infer<typeof loginSchema>

const LoginForm = React.forwardRef(() => {
  const router = useRouter()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginData) => {
    console.log(data)
    router.navigate("/(tabs)/")
  }

  return (
    <View className="w-full">
      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoRegular" classes="mb-2">
          E-mail:
        </TextThemed>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              autoComplete="email"
              font="nunitoSemiBold"
              placeholder="Digite o seu e-mail"
            />
          )}
          {...register("email")}
        />
        <InputErrorMessage message={errors.email?.message} />
      </View>

      <View className="w-full mt-7">
        <TextThemed color="primary" size="h4" font="nunitoSemiBold" classes="mb-2">
          Senha:
        </TextThemed>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              secureTextEntry
              font="nunitoSemiBold"
              autoComplete="password"
              placeholder="Digite a sua senha"
            />
          )}
          {...register("password")}
        />
        <InputErrorMessage message={errors.password?.message} />
      </View>

      <View className="w-full mt-7">
        <ButtonThemed
          type="button"
          color="primary"
          size="full"
          shape="rounded"
          onClick={handleSubmit(onSubmit)}
        >
          <TextThemed color="white" size="h4" font="nunitoBold">
            Entrar
          </TextThemed>
        </ButtonThemed>
      </View>

      <View className="w-full mt-3">
        <Pressable className="flex-row" onPress={() => router.navigate("/register")}>
          <TextThemed color="primary" size="body2" font="nunitoRegular">
            Não possui uma conta?
          </TextThemed>
          <TextThemed color="alert" size="body2" font="nunitoBold" classes="underline ml-1">
            Crie aqui!
          </TextThemed>
        </Pressable>
      </View>
    </View>
  )
})

export default LoginForm
