import { View } from "react-native"
import { useCallback } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useFocusEffect, useRouter } from "expo-router"

import { NormalizedUser } from "@/modules/user/types"
import { EditUserData, editUserSchema } from "./types"
import useTranslationStore from "@/storage/translation"

import Sizes from "@/constants/Sizes"
import Input from "@/components/basic/Input"
import TextThemed from "@/components/themed/TextThemed"
import ButtonThemed from "@/components/themed/ButtonThemed"
import InputErrorMessage from "@/components/basic/InputErrorMessage"

interface EditUserFormProps {
  data: NormalizedUser
  onSubmit: (data: EditUserData) => void
}

export default function EditUserForm({ data, onSubmit }: EditUserFormProps) {
  const router = useRouter()
  const translate = useTranslationStore((state) => state.actions.translate)

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
    },
  })

  useFocusEffect(
    useCallback(() => {
      reset({
        name: data.name,
        email: data.email,
        newPassword: "",
      })

      return () =>
        reset({
          name: data.name,
          email: data.email,
          newPassword: "",
        })
    }, [data, reset])
  )

  return (
    <View className="w-full" style={{ gap: Sizes.veryHuge }}>
      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoSemiBold" classes="mb-2">
          {translate("form.name")}:
        </TextThemed>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              font="nunitoSemiBold"
              placeholder={translate("form.placeholder.name")}
            />
          )}
          {...register("name")}
        />
        <InputErrorMessage message={errors.name?.message} />
      </View>

      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoSemiBold" classes="mb-2">
          {translate("form.email")}:
        </TextThemed>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              font="nunitoSemiBold"
              placeholder={translate("form.placeholder.email")}
            />
          )}
          {...register("email")}
        />
        <InputErrorMessage message={errors.email?.message} />
      </View>

      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoSemiBold" classes="mb-2">
          {translate("form.newPassword")}:
        </TextThemed>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              value={value ?? ""}
              onChange={onChange}
              font="nunitoSemiBold"
              placeholder={translate("form.placeholder.newPassword")}
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
            {translate("actions.cancel")}
          </TextThemed>
        </ButtonThemed>

        <ButtonThemed color="secondary" onClick={handleSubmit(onSubmit)} classes="w-[45%]">
          <TextThemed color="white" size="h4" font="nunitoBold">
            {translate("actions.save")}
          </TextThemed>
        </ButtonThemed>
      </View>
    </View>
  )
}
