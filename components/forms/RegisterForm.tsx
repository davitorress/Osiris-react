import { useCallback } from "react"
import { Pressable, View } from "react-native"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useFocusEffect, useRouter } from "expo-router"

import { RegisterData, registerSchema } from "./types"
import useTranslationStore from "@/storage/translation"

import Input from "@/components/basic/Input"
import TextThemed from "@/components/themed/TextThemed"
import ButtonThemed from "@/components/themed/ButtonThemed"
import InputErrorMessage from "@/components/basic/InputErrorMessage"

interface RegisterFormProps {
  onSubmit: (data: RegisterData) => void
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const router = useRouter()
  const translate = useTranslationStore((state) => state.actions.translate)

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  })

  useFocusEffect(
    useCallback(() => {
      reset({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      })

      return () =>
        reset({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        })
    }, [reset])
  )

  return (
    <View className="w-full">
      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoRegular" classes="mb-2">
          {translate("form.name")}
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

      <View className="w-full mt-7">
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
        <TextThemed color="primary" size="h4" font="nunitoSemiBold" classes="mb-2">
          {translate("form.confirmPassword")}
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
              placeholder={translate("form.placeholder.confirmPassword")}
            />
          )}
          {...register("confirmPassword")}
        />
        <InputErrorMessage message={errors.confirmPassword?.message} />
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
            {translate("actions.register")}
          </TextThemed>
        </ButtonThemed>
      </View>

      <View className="w-full mt-3">
        <Pressable className="flex-row" onPress={() => router.push("/login")}>
          <TextThemed color="primary" size="body2" font="nunitoRegular">
            {translate("general.registered")}
          </TextThemed>
          <TextThemed color="alert" size="body2" font="nunitoBold" classes="underline ml-1">
            {translate("actions.signIn")}
          </TextThemed>
        </Pressable>
      </View>
    </View>
  )
}
