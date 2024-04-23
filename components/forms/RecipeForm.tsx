import { z } from "zod"
import { View } from "react-native"
import { useRouter } from "expo-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useWatch } from "react-hook-form"

import Sizes from "@/constants/Sizes"
import Input from "@/components/basic/Input"
import IonIcon from "@/components/basic/IonIcon"
import TextThemed from "@/components/themed/TextThemed"
import ButtonThemed from "@/components/themed/ButtonThemed"
import InputErrorMessage from "@/components/basic/InputErrorMessage"

const recipeSchema = z
  .object({
    id: z.string().optional(),
    name: z
      .string({ required_error: "O nome da receita é obrigatório!" })
      .min(1, "O nome da receita é obrigatório!")
      .transform((name) => name.trim()),
    description: z
      .string({ required_error: "A descrição da receita é obrigatória!" })
      .min(1, "A descrição da receita é obrigatória!")
      .max(120, "A descrição da receita deve ter no máximo 120 caracteres!")
      .transform((description) => description.trim()),
    pancs: z.array(z.string()).min(1, "A receita deve ter pelo menos uma panc!"),
    ingredients: z.array(z.string()).min(1, "A receita deve ter pelo menos um ingrediente!"),
    prepair: z.array(z.string()).min(1, "A receita deve ter pelo menos um modo de preparo!"),
  })
  .refine(({ ingredients }) => ingredients.length === 1 && ingredients[0]?.length, {
    message: "A receita deve ter pelo menos um ingrediente!",
    path: ["ingredients"],
  })
  .refine(({ ingredients }) => ingredients.every((i) => (i?.length ?? 0) > 0), {
    message: "Os ingredientes não podem ser vazios!",
    path: ["ingredients"],
  })
  .refine(({ prepair }) => prepair.length === 1 && prepair[0]?.length, {
    message: "O modo de preparo deve ter pelo menos um passo!",
    path: ["prepair"],
  })
  .refine(({ prepair }) => prepair.every((p) => (p?.length ?? 0) > 0), {
    message: "Os modos de preparo não podem ser vazios!",
    path: ["prepair"],
  })
  .transform(({ ingredients, prepair, ...rest }) => {
    return {
      ...rest,
      ingredients: ingredients.filter((i) => (i?.length ?? 0) > 0),
      prepair: prepair.filter((p) => (p?.length ?? 0) > 0),
    }
  })

type RecipeData = z.infer<typeof recipeSchema>

interface RecipeFormProps {
  data?: RecipeData
  onSubmit: (data: RecipeData) => void
}

export default function RecipeForm({ data, onSubmit }: RecipeFormProps) {
  const router = useRouter()

  const {
    control,
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeData>({
    defaultValues: data,
    resolver: zodResolver(recipeSchema),
  })

  const pancs = useWatch({ control, name: "pancs", defaultValue: ["Hibisco"] })

  const addNewPanc = () => {
    pancs.push("Hibisco")
  }
  const removePanc = () => {
    pancs.pop()
  }

  return (
    <View className="w-full" style={{ gap: Sizes.veryHuge }}>
      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoRegular" classes="mb-2">
          Nome da receita:
        </TextThemed>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              font="nunitoSemiBold"
              placeholder="Digite o nome da receita"
            />
          )}
          {...register("name")}
        />
        <InputErrorMessage message={errors.name?.message} />
      </View>

      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoRegular" classes="mb-2">
          Descrição curta:
        </TextThemed>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              font="nunitoSemiBold"
              placeholder="Digite a descrição da receita"
              multiline
            />
          )}
          {...register("description")}
        />
        <TextThemed size="body2" color="tertiary" font="nunitoSemiBold" classes="mt-1 text-right">
          {getValues("description")?.length ?? 0}/120 caracteres
        </TextThemed>
        <InputErrorMessage message={errors.description?.message} />
      </View>

      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoRegular" classes="mb-2">
          PANCs:
        </TextThemed>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              {/* TODO: Select input */}
              {value.map((panc, index) => (
                <Input
                  {...register(`pancs.${index}`)}
                  key={`panc-${index}`}
                  value={panc}
                  onBlur={onBlur}
                  onChange={onChange}
                  font="nunitoSemiBold"
                />
              ))}
            </>
          )}
          {...register("pancs")}
        />
        <InputErrorMessage message={errors.pancs?.message} />

        <View className="w-full flex-row justify-end">
          <ButtonThemed size="fit" color="alert" onClick={removePanc}>
            <IonIcon name="remove-circle-outline" size="large" color="white" />
          </ButtonThemed>

          <ButtonThemed size="fit" color="secondary" onClick={addNewPanc}>
            <IonIcon name="add-circle-outline" size="large" color="white" />
          </ButtonThemed>
        </View>
      </View>

      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoRegular" classes="mb-2">
          Ingredientes:
        </TextThemed>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              {/* TODO: Select input */}
              {value.map((ingredient, index) => (
                <Input
                  {...register(`ingredients.${index}`)}
                  key={`ingredient-${index}`}
                  onBlur={onBlur}
                  onChange={onChange}
                  font="nunitoSemiBold"
                  value={ingredient ?? ""}
                  placeholder="Exemplo: 1 colher de sal"
                />
              ))}
            </>
          )}
          {...register("ingredients")}
        />
        <InputErrorMessage message={errors.ingredients?.message} />

        <View className="w-full flex-row justify-end">
          <ButtonThemed size="fit" color="alert" onClick={undefined}>
            <IonIcon name="remove-circle-outline" size="large" color="white" />
          </ButtonThemed>

          <ButtonThemed size="fit" color="secondary" onClick={undefined}>
            <IonIcon name="add-circle-outline" size="large" color="white" />
          </ButtonThemed>
        </View>
      </View>

      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoRegular" classes="mb-2">
          Modo de preparo:
        </TextThemed>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              {value.map((prepair, index) => (
                <View key={`prepair-${index}`} className="w-full" style={{ gap: Sizes.micro }}>
                  <TextThemed color="primary" font="nunitoSemiBold">
                    {index + 1}° Passo
                  </TextThemed>
                  <Input
                    {...register(`prepair.${index}`)}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={prepair ?? ""}
                    font="nunitoSemiBold"
                    placeholder="Exemplo: Misture todos os ingredientes secos"
                  />
                </View>
              ))}
            </>
          )}
          {...register("prepair")}
        />
        <InputErrorMessage message={errors.prepair?.message} />

        <View className="w-full flex-row justify-end">
          <ButtonThemed size="fit" color="alert" onClick={undefined}>
            <IonIcon name="remove-circle-outline" size="large" color="white" />
          </ButtonThemed>

          <ButtonThemed size="fit" color="secondary" onClick={undefined}>
            <IonIcon name="add-circle-outline" size="large" color="white" />
          </ButtonThemed>
        </View>
      </View>

      <View className="w-full flex-row justify-between">
        <ButtonThemed color="alert" onClick={() => router.push("/(tabs)/user")} classes="w-[45%]">
          <TextThemed color="white" size="h4" font="nunitoBold">
            {data ? "Excluir" : "Cancelar"}
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
