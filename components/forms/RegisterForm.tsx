import { z } from "zod"
import React from "react"
import { useRouter } from "expo-router"
import { Pressable, View } from "react-native"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import Input from "@/components/basic/Input"
import TextThemed from "@/components/themed/TextThemed"
import ButtonThemed from "@/components/themed/ButtonThemed"

const registerSchema = z
  .object({
    name: z
      .string({ required_error: "O nome é obrigatório!" })
      .min(1, "O nome é obrigatório!")
      .transform((name) => name.trim()),
    email: z
      .string({ required_error: "O email é obrigatório!" })
      .min(1, "O email é obrigatório!")
      .email("Insira um email válido!"),
    password: z
      .string({ required_error: "A senha é obrigatória!" })
      .min(1, "A senha é obrigatória!")
      .min(3, "A senha deve ter no mínimo 3 caracteres!"),
    confirmPassword: z
      .string({ required_error: "A confirmação de senha é obrigatória!" })
      .min(1, "A confirmação de senha é obrigatória!")
      .min(3, "A confirmação de senha deve ter no mínimo 3 caracteres!"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não coincidem!",
    path: ["confirmPassword"],
  })

type RegisterData = z.infer<typeof registerSchema>

export default function RegisterForm({ onSubmit }: { onSubmit: (data: RegisterData) => void }) {
  const router = useRouter()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  })

  return (
    <View className="w-full">
      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoRegular" classes="mb-2">
          Nome completo:
        </TextThemed>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              font="nunitoSemiBold"
              placeholder="Digite o seu nome completo"
            />
          )}
          {...register("name")}
        />
        {errors.name && (
          <TextThemed color="alert" size="body2" font="ubuntuRegular" classes="mt-1">
            {errors.name.message}
          </TextThemed>
        )}
      </View>

      <View className="w-full mt-7">
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
        {errors.email && (
          <TextThemed color="alert" size="body2" font="ubuntuRegular" classes="mt-1">
            {errors.email.message}
          </TextThemed>
        )}
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
        {errors.password && (
          <TextThemed color="alert" size="body2" font="ubuntuRegular" classes="mt-1">
            {errors.password.message}
          </TextThemed>
        )}
      </View>

      <View className="w-full mt-7">
        <TextThemed color="primary" size="h4" font="nunitoSemiBold" classes="mb-2">
          Confirmar senha:
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
              placeholder="Digite novamente a sua senha"
            />
          )}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <TextThemed color="alert" size="body2" font="ubuntuRegular" classes="mt-1">
            {errors.confirmPassword.message}
          </TextThemed>
        )}
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
            Cadastrar
          </TextThemed>
        </ButtonThemed>
      </View>

      <View className="w-full mt-3">
        <Pressable className="flex-row" onPress={() => router.navigate("/login")}>
          <TextThemed color="primary" size="body2" font="nunitoRegular">
            Já possui uma conta?
          </TextThemed>
          <TextThemed color="alert" size="body2" font="nunitoBold" classes="underline ml-1">
            Entre aqui!
          </TextThemed>
        </Pressable>
      </View>
    </View>
  )
}
