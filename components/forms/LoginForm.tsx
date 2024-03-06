import { z } from "zod"
import { TextInput, View } from "react-native"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import TextThemed from "@/components/TextThemed"
import ButtonThemed from "@/components/ButtonThemed"

const loginSchema = z.object({
  email: z.string().min(1, "O email é obrigatório!").email("Insira um email válido!"),
  password: z
    .string()
    .min(1, "A senha é obrigatória!")
    .min(3, "A senha deve ter no mínimo 3 caracteres!"),
})

type LoginData = z.infer<typeof loginSchema>

export default function LoginForm() {
  const {
    control,
    register,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <View className="w-full">
      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoSemiBold" classes="mb-2">
          E-mail:
        </TextThemed>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              autoComplete="email"
              placeholder="email@email.com"
              className="w-full p-2 rounded-lg bg-gray-medium text-white placeholder:text-gray-dark"
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

      <View className="w-full mt-5">
        <TextThemed color="primary" size="h4" font="nunitoSemiBold" classes="mb-2">
          Senha:
        </TextThemed>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry
              placeholder="********"
              autoComplete="password"
              className="w-full p-2 rounded-lg bg-gray-medium text-white placeholder:text-gray-dark"
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

      <View className="w-full mt-5">
        <ButtonThemed type="button" color="primary" size="full" shape="rounded">
          <TextThemed color="white" size="h4" font="nunitoBold">
            Entrar
          </TextThemed>
        </ButtonThemed>
      </View>

      <View className="w-full mt-3">
        <TextThemed
          type="link"
          url="/register"
          color="primary"
          size="h4"
          font="nunitoRegular"
          classes="mt-2"
        >
          Não possui uma conta?{" "}
          <TextThemed color="primary" size="h4" font="nunitoBold" classes="underline">
            Crie aqui
          </TextThemed>
        </TextThemed>
      </View>
    </View>
  )
}
