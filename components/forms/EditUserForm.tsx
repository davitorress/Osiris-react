import { View } from "react-native"
import { useRouter } from "expo-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import { NormalizedUser } from "@/modules/user/types"
import { EditUserData, editUserSchema } from "./types"

import Sizes from "@/constants/Sizes"
import Input from "@/components/basic/Input"
import TextThemed from "@/components/themed/TextThemed"
import ButtonThemed from "@/components/themed/ButtonThemed"
import InputErrorMessage from "@/components/basic/InputErrorMessage"

interface EditUserFormProps {
  userData: NormalizedUser
  onSubmit: (data: EditUserData) => void
}

export default function EditUserForm({ userData, onSubmit }: EditUserFormProps) {
  const router = useRouter()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: userData.name,
      email: userData.email,
    },
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
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              font="nunitoSemiBold"
              placeholder="Digite o seu nome completo"
            />
          )}
          {...register("name")}
        />
        <InputErrorMessage message={errors.name?.message} />
      </View>

      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoSemiBold" classes="mb-2">
          Email:
        </TextThemed>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              font="nunitoSemiBold"
              placeholder="Digite o seu email"
            />
          )}
          {...register("email")}
        />
        <InputErrorMessage message={errors.email?.message} />
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
        <InputErrorMessage message={errors.newPassword?.message} />
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
