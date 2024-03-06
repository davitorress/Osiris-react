import { z } from "zod"
import { TextInput, View } from "react-native"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

const schema = z.object({
  email: z.string().min(1, "O email é obrigatório!").email("Insira um email válido!"),
})

export default function LoginForm() {
  const { control, register } = useForm({
    resolver: zodResolver(schema),
  })

  return (
    <View className="w-full mt-8">
      {/* TODO: Implements React Hook Form */}
      {/* DOCS: https://react-hook-form.com/get-started#ReactNative */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="email@email.com"
          />
        )}
        {...register("email")}
      />
    </View>
  )
}
