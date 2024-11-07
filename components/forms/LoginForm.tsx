import { useCallback } from "react"
import { Pressable, View } from "react-native"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useFocusEffect, useRouter } from "expo-router"

import { LoginData, loginSchema } from "./types"
import useTranslationStore from "@/storage/translation"

import Input from "@/components/basic/Input"
import TextThemed from "@/components/themed/TextThemed"
import ButtonThemed from "@/components/themed/ButtonThemed"
import InputErrorMessage from "@/components/basic/InputErrorMessage"

interface LoginFormProps {
  onSubmit: (data: LoginData) => void
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const router = useRouter()
  const translate = useTranslationStore((state) => state.actions.translate)

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })

  useFocusEffect(
    useCallback(() => {
      reset({
        email: "",
        password: "",
      })

      return () =>
        reset({
          email: "",
          password: "",
        })
    }, [reset])
  )

  return (
    <View className="w-full">
      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoRegular" classes="mb-2">
          {translate("form.email")}
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
              placeholder={translate("form.placeholder.email")}
            />
          )}
          {...register("email")}
        />
        <InputErrorMessage message={errors.email?.message} />
      </View>

      <View className="w-full mt-7">
        <TextThemed color="primary" size="h4" font="nunitoSemiBold" classes="mb-2">
          {translate("form.password")}
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
              placeholder={translate("form.placeholder.password")}
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
            {translate("actions.login")}
          </TextThemed>
        </ButtonThemed>
      </View>

      <View className="w-full mt-3">
        <Pressable className="flex-row" onPress={() => router.push("/register")}>
          <TextThemed color="primary" size="body2" font="nunitoRegular">
            {translate("general.unregistered")}
          </TextThemed>
          <TextThemed color="alert" size="body2" font="nunitoBold" classes="underline ml-1">
            {translate("actions.signUp")}
          </TextThemed>
        </Pressable>
      </View>
    </View>
  )
}
