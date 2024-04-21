import { z } from "zod"
import { View } from "react-native"
import { useRouter } from "expo-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import Sizes from "@/constants/Sizes"
import Input from "@/components/basic/Input"
import TextThemed from "@/components/themed/TextThemed"
import ButtonThemed from "@/components/themed/ButtonThemed"

const editUserSchema = z.object({
  name: z
    .string()
    .transform((name) => name.trim())
    .optional(),
  email: z.string().email("Insira um email válido!").optional(),
  newPassword: z
    .string()
    .min(3, "A senha deve ter no mínimo 3 caracteres!")
    .transform((password) => password.trim())
    .optional(),
})

type EditUserData = z.infer<typeof editUserSchema>

interface EditUserFormProps {
  onSubmit: (data: EditUserData) => void
}

export default function EditUserForm({ onSubmit }: EditUserFormProps) {
  const router = useRouter()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserData>({
    resolver: zodResolver(editUserSchema),
  })

  return (
    <View className="w-full" style={{ gap: Sizes.veryHuge }}>
      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoSemiBold" classes="mb-2">
          Nome completo:
        </TextThemed>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              value={value ?? ""}
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

      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoSemiBold" classes="mb-2">
          Email:
        </TextThemed>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              value={value ?? ""}
              onChange={onChange}
              font="nunitoSemiBold"
              placeholder="Digite o seu email"
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

      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoSemiBold" classes="mb-2">
          Nova senha:
        </TextThemed>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              value={value ?? ""}
              onChange={onChange}
              font="nunitoSemiBold"
              placeholder="Digite caso deseje alterar"
              secureTextEntry
            />
          )}
          {...register("newPassword")}
        />
        {errors.newPassword && (
          <TextThemed color="alert" size="body2" font="ubuntuRegular" classes="mt-1">
            {errors.newPassword.message}
          </TextThemed>
        )}
      </View>

      <View className="w-full flex-row justify-between">
        <ButtonThemed color="alert" onClick={() => router.push("/(tabs)/user")} classes="w-[45%]">
          <TextThemed color="white" size="h4" font="nunitoBold">
            Cancelar
          </TextThemed>
        </ButtonThemed>

        <ButtonThemed color="secondary" onClick={handleSubmit(onSubmit)} classes="w-[45%]">
          <TextThemed color="white" size="h4" font="nunitoBold">
            Salvar
          </TextThemed>
        </ButtonThemed>
      </View>
    </View>
  )
}
